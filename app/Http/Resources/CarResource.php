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
        $noImages = [
            0 => ['image_path' => null],
            1 => ['image_path' => null],
            2 => ['image_path' => null],
            3 => ['image_path' => null],
        ];
        $img_locals = [];

        // add current url host in front of image path //---------------
        if ($this->primaryImage) {
            $this->primaryImage->image_path = URL::to($this->primaryImage->image_path);
        }
        if ($this->images) {
            foreach($this->images as $key => $image){
                $img_locals [$key] = $image->image_path;
            }
            
            $this->images->each(function ($image) {
                $image->image_path = URL::to($image->image_path);
            });
        }

        return [
            'id' => $this->id,
            'year' => $this->year,
            'address' => $this->address,
            'phone' => $this->phone,
            'owner' => $this->owner,
            'vin' => $this->vin,
            'mileage' => $this->mileage,
            'price' => $this->price,
            'img_url' => $this->primaryImage->image_path ?? URL::to('/images/none/noimage.png'),
            'img_urls' => count($this->images) > 0 ? $this->images : $noImages,
            'img_locals' => count($this->images) > 0 ? $img_locals : null,
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
            'publish' => $this->publish,
        ];
    }
}
