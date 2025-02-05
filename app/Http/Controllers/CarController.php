<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterCarRequest;
use App\Http\Resources\CarResource;
use App\Models\Car;
use App\Http\Requests\StoreCarRequest;
use App\Http\Requests\UpdateCarRequest;
use App\Models\CarFeatures;
use App\Models\CarImage;
use App\Models\City;
use App\Models\Maker;
use App\Models\Model;
use App\Models\State;
use App\Models\User;
use Arr;
use File;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Http\Request;
use Storage;
use Str;

class CarController extends Controller
{
    private $keysToRemove = [
        'images',
        'image_locals',
        'features',
        'maker',
        'model',
        'city',
        'state'
    ];

    private $allFeatures = [
        "abs" => 0,
        "air_conditioning" => 0,
        "power_windows" => 0,
        "power_door_locks" => 0,
        "cruise_control" => 0,
        "bluetooth_connectivity" => 0,
        "remote_start" => 0,
        "gps_navigation" => 0,
        "heater_seats" => 0,
        "climate_control" => 0,
        "rear_parking_sensors" => 0,
        "leather_seats" => 0,
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $cars = CarResource::collection(
            Car::
                with(['primaryImage', 'maker', 'model'])
                ->orderBy('created_at', 'desc')
                ->paginate(12)
        );

        return $cars;
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
    public function store(StoreCarRequest $request)
    {
        $data = $request->validated();

        $images = $data['images'];
        $features = $data['features'];

        $dataFeatures = [];
        foreach ($features as $feature) {
            $dataFeatures[$feature] = 1;
        }

        $maker = Maker::where("name", $data['maker'])->first();
        $model = Model::where("name", $data['model'])->first();
        $state = State::where("name", $data['state'])->first();
        $city = City::where("name", $data['city'])->first();
        // remove unnecessary components
        $dataCar = Arr::except($data, $this->keysToRemove);
        // add new items
        $dataCar['maker_id'] = $maker->id;
        $dataCar['model_id'] = $model->id;
        $dataCar['state_id'] = $state->id;
        $dataCar['city_id'] = $city->id;
        // update slug
        $dataCar['slug'] = $data['year'] . ' - ' . $maker->name . ' ' . $model->name;

        // create new record car table in database
        $car = Car::create($dataCar);

        // features table...
        $dataFeatures['car_id'] = $car->id;
        CarFeatures::create($dataFeatures);

        // images table...
        // check if image was given and save on local file system
        if (isset($images)) {
            foreach ($images as $key => $image) {
                $relativePath = $this->saveImage($image); // get path image that was handle
                CarImage::create([
                    'car_id' => $car->id,
                    'image_path' => $relativePath,
                    'position' => $key
                ]);
            }
        }

        return response("success", 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Car $car)
    {
        return new CarResource($car);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarRequest $request, Car $car)
    {
        if ($request->user_id != $car->user_id) {
            return response(['error' => "Bad request! Not found user id."], 400);
        }

        // return response(['data' => $request->validated()], 400);

        $data = $request->validated();

        $images = $data['images'];
        $image_locals = $data['image_locals'];
        $features = $data['features'];

        $dataFeatures = $this->allFeatures;
        foreach ($features as $feature) {
            $dataFeatures[$feature] = 1;
        }

        $maker = Maker::where("name", $data['maker'])->first();
        $model = Model::where("name", $data['model'])->first();
        $state = State::where("name", $data['state'])->first();
        $city = City::where("name", $data['city'])->first();
        // remove unnecessary components
        $dataCar = Arr::except($data, $this->keysToRemove);
        // add new items
        $dataCar['maker_id'] = $maker->id;
        $dataCar['model_id'] = $model->id;
        $dataCar['state_id'] = $state->id;
        $dataCar['city_id'] = $city->id;
        // update slug
        $dataCar['slug'] = $data['year'] . ' - ' . $maker->name . ' ' . $model->name;

        // features table...
        CarFeatures::where('car_id', $car->id)->update($dataFeatures);

        // Update car in the database
        $car->update($dataCar);

        // // // images handle --------------------------------------------------------
        if (isset($images)) {
            // // delete files image in local storage
            foreach ($car->images as $key => $image) {
                // if image in db not contains in $image_locals, delete it. Else, keep it
                if (isset($image_locals)) {
                    if (!in_array($image->image_path, $image_locals)) {
                        $absolutePath = public_path($image->image_path);
                        if (File::exists($absolutePath)) {
                            File::delete($absolutePath);
                        }
                    }
                }
            }

            // // delete all record images of car
            CarImage::where('car_id', $car->id)->delete();

            // kiểm tra url trong image_urls nếu có url nào khớp với các image trong image_locals
            // thì ta phải loại url đó ra
            if (isset($image_locals)) {
                foreach ($images as $key => $url) {
                    foreach ($image_locals as $key2 => $image_s) {
                        if (str_contains($url, $image_s)) {
                            unset($images[$key]);
                        }
                    }
                }
            }

            // keep images not change in local and add new record in database
            $count = 0;
            if (isset($image_locals)) {
                foreach ($image_locals as $key => $image_s) {
                    $count = $key;
                    CarImage::create([
                        'car_id' => $car->id,
                        'image_path' => $image_s,
                        'position' => $key
                    ]);
                }
            }

            // upload new image in local and add new record image in database
            foreach ($images as $key => $image) {
                $count += 1;
                $relativePath = $this->saveImage($image); // get path image that was handle and storage
                CarImage::create([
                    'car_id' => $car->id,
                    'image_path' => $relativePath,
                    'position' => $count,
                ]);
            }
        }

        return response("success", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $car->user_id) {
            return abort(403, 'Unauthorized action.');
        }
        $car->delete();

        // // If there is an old image, delete it
        // if ($car->image) {
        //     $absolutePath = public_path($car->image);
        //     File::delete($absolutePath);
        // }

        return response('', 204);
    }

    // other function -------------------------------//
    public function filterCars(Request $request)
    {
        // return response(['user' => $request->user()], 400);

        $userId = $request->user()->id ?? null;

        $data = $request->query();
        $maker = $data['maker'] ?? 'all';
        $model = $data['model'] ?? 'all';
        $state = $data['state'] ?? 'all';
        $city = $data['city'] ?? 'all';
        $car_type = $data['car_type'] ?? [];
        $fuel_type = $data['fuel_type'] ?? [];
        $sort = $data['sort'];

        // id filter
        $maker_id = null;
        $model_id = null;
        $state_id = null;
        $city_id = null;

        if ($maker != 'all') {
            $maker_id = Maker::where('name', $maker)->first()->id;
        }
        if ($model != 'all') {
            $model_id = Model::where('name', $model)->first()->id;
        }
        if ($state != 'all') {
            $state_id = State::where('name', $state)->first()->id;
        }
        if ($city != 'all') {
            $city_id = City::where('name', $city)->first()->id;
        }

        $query = Car::query();
        $query->where(function ($query) use ($userId, $maker_id, $model_id, $state_id, $city_id, $car_type, $fuel_type) {
            // if has userId, then filter car by id user
            if ($userId != null) {
                $query->where('user_id', $userId);
            }

            // Filter cars by request parameters
            if ($maker_id != null) {
                $query->where('maker_id', $maker_id);
            }
            if ($model_id != null) {
                $query->where('model_id', $model_id);
            }
            if ($city_id != null) {
                $query->where('city_id', $city_id);
            }
            if ($state_id != null) {
                $query->where('state_id', $state_id);
            }
            if (count($car_type) > 0) {
                $query->whereIn('car_type', $car_type);
            }
            if (count($fuel_type) > 0) {
                $query->whereIn('fuel_type', $fuel_type);
            }
        });

        if ($sort === 'oldest') {
            $query->orderBy('created_at', "asc");
        }
        if ($sort === 'newest') {
            $query->orderBy('created_at', 'desc');
        }
        if ($sort === 'price_up') {
            $query->orderBy('price', 'asc');
        }
        if ($sort === 'price_down') {
            $query->orderBy('price', 'desc');
        }

        $cars = $query->with(['primaryImage', 'maker', 'model'])
            ->paginate(12)
            ->withQueryString(); // keep query string each url page

        return CarResource::collection($cars);
    }

    public function searchCar(Request $request)
    {
        $data = $request->query();
        $query = Car::query();

        // if string search is empty, then return all cars.
        if (is_null($data['string'])) {
            if (!is_null($data['user_id'])) {
                $query->where('user_id', $data['user_id']);
            }
            return CarResource::collection(
                $query->with(['primaryImage', 'maker', 'model'])
                    ->orderBy('created_at', 'desc')
                    ->paginate(12)
            );
        }

        $query->where('slug', 'LIKE', '%' . $data['string'] . '%');
        if (!is_null($data['user_id'])) {
            $query->where('user_id', $data['user_id']);
        }

        $cars = $query->with(['primaryImage', 'maker', 'model'])
            ->orderBy('created_at', 'desc')
            ->paginate(12)
            ->withQueryString(); // keep query string each url page

        return CarResource::collection($cars);
    }

    public function userCars(Request $request)
    {
        // return response(['user' => $request->user()], 400);

        $user_id = User::where('user_name', $request->user()->user_name)->first()->id;
        if (!$user_id) {
            return response("User not found", 400);
        }

        return CarResource::collection(
            Car::where('user_id', $user_id)
                ->with(['primaryImage', 'maker', 'model'])
                ->orderBy('created_at', 'desc')
                ->paginate(12)
        );
    }

    public function newCars(Request $request)
    {
        return CarResource::collection(
            Car::
                with(['primaryImage', 'maker', 'model'])
                ->orderBy('created_at', 'desc')
                ->take(10)->get()
        );
    }

    public function seedCars(Request $request)
    {
        $user = $request->user();
        if ($user == null) {
            return response('Not found user', 400);
        }

        $path = '/images/car/car_image_seed/';
        $files = Storage::disk('public')->allFiles($path);
        Car::factory()
            ->count(5)
            ->state(['user_id' => $user->id])
            ->has(
                CarImage::factory()
                    ->count(5)
                    ->sequence(fn(Sequence $sequence) => [
                        'image_path' => $files[mt_rand(0, count($files) - 1)],
                        'position' => $sequence->index % 5 + 1
                    ])
                ,
                'images'
            )
            ->has(CarFeatures::factory(), 'features')
            ->create();
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

        $dir = 'images/car/user_car/';
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
}
