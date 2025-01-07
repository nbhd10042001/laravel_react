<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use URL;

class CarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // // this function if/else handle image have path url on internet, not path image in public folder
        // if(str_contains($this->description, '[Fake]')){
        //     $imgPrimary = $this->primaryImage->image_path;
        // }
        // // update url each image if data car was not fake
        // else{
        //     $imgPrimary = $this->primaryImage->image_path ? URL::to($this->primaryImage->image_path) : null;
        //     $this->images->each(function ($image){
        //         $image->image_path = URL::to($image->image_path);
        //     });
        // }

        // add current_url_host in front of image path
        $this->primaryImage->image_path = URL::to($this->primaryImage->image_path);
        $this->images->each(function ($image) {
            $image->image_path = URL::to($image->image_path);
        });

        return [
            'id' => $this->id,
            'year' => $this->year,
            'address' => $this->address,
            'phone' => $this->phone,
            'owner' => $this->owner,
            'vin' => $this->vin,
            'mileage' => $this->mileage,
            'price' => $this->price,
            'img_url' => $this->primaryImage->image_path,
            'img_urls' => $this->images,
            'car_type' => $this->car_type,
            'fuel_type' => $this->fuel_type,
            'model' => $this->model->name,
            'maker' => $this->maker->name,
            'img_maker' => $this->maker->image ? URL::to($this->maker->image) : null,
            'city' => $this->city->name,
            'state' => $this->city->state->name,
            'published_at' => $this->published_at,
            'description' => $this->description,
            'features' => $this->features,
        ];
    }
}
