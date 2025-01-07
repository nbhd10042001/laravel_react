<?php

namespace App\Http\Controllers;

use App\Enums\QuestionTypeEnum;
use App\Http\Requests\StoreSurveyAnswerRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionAnswer;
use Illuminate\Auth\Access\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Enum;


class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    // method get
    public function index(Request $request)
    {
        $user = $request->user();

        return SurveyResource::collection(
            Survey::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->paginate(6)
        );

        // return SurveyResource::collection(
        //     Survey::orderBy('created_at', 'desc')
        //         ->paginate(6)
        // );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

    // method create
    public function store(StoreSurveyRequest $request)
    {
        // Gate::authorize('store');
        // authorize in StoreSurveyRequest
        $data = $request->validated();
        $this->checkQuestionHaveTitle($data);

        // check if image was given and save on local file system
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']); // get path image that was handle
            $data['image'] = $relativePath; // save path image in $data
        }

        // create new record survey table in database
        $survey = Survey::create($data);
        // Create new questions
        foreach ($data['questions'] as $question) {
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);
        }

        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     */
    // method get item with {id}
    // Bạn không cần thực hiện Survey::find($id) một cách thủ công.
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();
        // Gate::authorize('is-admin');
        Gate::authorize('show', $survey);

        if ($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action');
        }
        return new SurveyResource($survey);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();
        $this->checkQuestionHaveTitle($data);

        // Check if image was given and save on local file system
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
            // If there is an old image, delete it
            if ($survey->image) {
                $absolutePath = public_path($survey->image);
                File::delete($absolutePath);
            }
        }
        // Update survey in the database
        $survey->update($data);

        // Get ids as plain array of existing questions
        // get value from colunm id and convert to array
        $existingIds = $survey->questions()->pluck('id')->toArray(); // [id1, id2, id3,...]

        // Get ids as plain array of new questions
        // get value from key id of data['questions'] and convert to array
        $newIds = Arr::pluck($data['questions'], 'id'); // [id4, id5, id6,...]

        // Find questions to delete
        // arr1 = [1, 2, 3, 4]
        // arr2 = [2, 3, 5]
        // result = [1, 4] -> need to delete [1, 4]
        $toDelete = array_diff($existingIds, $newIds);

        //Find questions to add
        // result = [5] -> need to add [5]
        $toAdd = array_diff($newIds, $existingIds);

        // Delete questions by $toDelete array
        SurveyQuestion::destroy($toDelete);

        // Create new questions
        foreach ($data['questions'] as $question) {
            if (in_array($question['id'], $toAdd)) {
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }

        // Update existing questions
        $questionMap = collect($data['questions'])->keyBy('id');
        foreach ($survey->questions as $question) {
            if (isset($questionMap[$question->id])) {
                $this->updateQuestion($question, $questionMap[$question->id]);
            }
        }

        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action.');
        }
        $survey->delete();
        // If there is an old image, delete it
        if ($survey->image) {
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }

        return response('', 204);
    }

    // other method
    public function getBySlug(Survey $survey)
    {
        if (!$survey) {
            return response('Survey not found', 422);
        }
        if (!$survey->status) {
            return response('Survey not active', 404);
        }
        $currentDate = new \DateTime();
        $expireDate = new \DateTime($survey->expire_date);
        if ($currentDate > $expireDate) {
            return response("Survey is out date", 404);
        }

        return new SurveyResource($survey);
    }

    public function storeAnswer(StoreSurveyAnswerRequest $request, Survey $survey)
    {
        $validated = $request->validated();
        // remove items null in $validated['answers']
        // $validated['answers'] = array_filter($validated['answers']);

        foreach ($validated['answers'] as $key => $answer) {
            // if answer require but value null, then response error
            if ($answer['is_require'] && !$answer['value']) {
                return response()->json([
                    'errors' => [
                        'id' => $answer['ques_id'],
                        'message' => "This question is required to be answered.",
                    ],
                ], 422);
            }
            // remove answer if not require and value null
            if(!$answer['is_require'] && !$answer['value']) {
                unset($validated['answers'][$key]);
            }
        }

        $surveyAnswer = SurveyAnswer::create([
            'survey_id' => $survey->id,
            'start_date' => date('Y-m-d H:i:s'),
            'end_date' => date('Y-m-d H:i:s'),
        ]);

        foreach ($validated['answers'] as $key => $answer) {
            $questionId = $answer['ques_id'];
            $question = SurveyQuestion::where(['id' => $questionId, 'survey_id' => $survey->id])->get();
            if (!$question) {
                return response("Invalid question ID: \"$questionId\"", 400);
            }

            $data = [
                'survey_question_id' => $questionId,
                'survey_answer_id' => $surveyAnswer->id,
                'answer' => is_array($answer['value']) ? json_encode($answer['value']) : $answer['value']
            ];

            $questionAnswer = SurveyQuestionAnswer::create($data);
        }

        return response("", 201);
    }

    public function seedSurveys(Request $request)
    {
        $user = $request->user();

        // delete fake surveys
        Survey::where('user_id', $user->id)
            ->each(function ($survey, $key) {
                if (str_contains($survey->title, '[FakeData]')) {
                    $survey->delete();
                }
            });

        // seed surveys fake with current user_id send this request
        Survey::factory()->count(10)
            ->state(['user_id' => $user->id])
            ->create();

        return response('', 204);
    }

    private function checkQuestionHaveTitle($data)
    {
        foreach ($data['questions'] as $key => $question) {
            if (!$question['question']) {
                return response()->json([
                    'errors' => [
                        'id' => $key,
                        'message' => "Title Question is required",
                    ],
                ], 422);
            }
        }
    }

    private function saveImage($image)
    {
        // Check if image is valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1);
            // Get file extension
            $type = strtolower($type[1]); // jpg, png, gif

            // Check if file is an image
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/survey/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir); // path dir
        $relativePath = $dir . $file; // path image file
        // if the folder images not exist, then create new folder images
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }

    private function createQuestion($data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }
        $validator = Validator::make($data, [
            'question' => 'required|string',
            'type' => [
                'required',
                new Enum(QuestionTypeEnum::class)
            ],
            'description' => 'nullable|string',
            'is_require' => 'nullable|boolean',
            'data' => 'present',
            'survey_id' => 'exists:App\Models\Survey,id'
        ]);

        return SurveyQuestion::create($validator->validated());
    }

    private function updateQuestion(SurveyQuestion $question, $data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }
        $validator = Validator::make($data, [
            'id' => 'exists:App\Models\SurveyQuestion,id',
            'question' => 'required|string',
            'type' => ['required', new Enum(QuestionTypeEnum::class)],
            'description' => 'nullable|string',
            'is_require' => 'nullable|boolean',
            'data' => 'present',
        ]);

        return $question->update($validator->validated());
    }
}
