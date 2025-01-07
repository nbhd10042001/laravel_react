<?php

namespace App\Http\Controllers;

use App\Http\Resources\CarResource;
use App\Models\Car;
use App\Http\Requests\StoreCarRequest;
use App\Http\Requests\UpdateCarRequest;
use App\Models\CarFeatures;
use App\Models\CarImage;
use App\Models\City;
use App\Models\Maker;
use App\Models\Model;
use Arr;
use File;
use Illuminate\Http\Request;
use Storage;
use Str;

class CarController extends Controller
{
    private $keysToRemove = [
        'images',
        'features',
        'maker',
        'model',
        'city',
        'state'
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return CarResource::collection(
            Car::
                with(['primaryImage', 'maker', 'model'])
                ->orderBy('created_at', 'desc')
                ->paginate(12)
        );
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
        // $path = '/images/car/car_image_seed/';
        // $files = Storage::disk('public')->allFiles($path);
        
        // return response(['files' => ($files[mt_rand(0, count($files))])], 400);

        $data = $request->validated();

        $images = $data['images'];
        $features = $data['features'];

        $dataFeatures = [];
        foreach ($features as $feature) {
            $dataFeatures[$feature] = 1;
        }

        $maker_id = Maker::where("name", $data['maker'])->first()->id;
        $model_id = Model::where("name", $data['model'])->first()->id;
        $city_id = City::where("name", $data['city'])->first()->id;
        $dataCar = Arr::except($data, $this->keysToRemove);
        $dataCar['maker_id'] = $maker_id;
        $dataCar['model_id'] = $model_id;
        $dataCar['city_id'] = $city_id;

        // create new record car table in database
        $car = Car::create($dataCar);

        // features table...
        $dataFeatures['car_id'] = $car->id;
        CarFeatures::create($dataFeatures);

        // images table...
        // check if image was given and save on local file system
        if (isset($images)) {
            foreach($images as $key => $image){
                $relativePath = $this->saveImage($image); // get path image that was handle
                CarImage::create([
                    'car_id' => $car->id,
                    'image_path' => $relativePath,
                    'position' => $key
                ]);
            }
        }
        
        return response("", 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Car $car)
    {
        return new CarResource($car);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Car $car)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarRequest $request, Car $car)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car)
    {
        //
    }

    // other function
    public function newCars(Request $request)
    {
        return CarResource::collection(
            Car::
                with(['primaryImage', 'maker', 'model'])
                ->orderBy('created_at', 'desc')
                ->take(3)->get()
        );
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
