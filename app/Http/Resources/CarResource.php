<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
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
            'city' => $this->city->name,
            'state' => $this->city->state->name,
            'published_at' => $this->published_at,
            'description' => $this->description,
            'features' => $this->features,
        ];
    }
}
