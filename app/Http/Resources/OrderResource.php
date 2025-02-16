<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use URL;

class OrderResource extends JsonResource
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
            'user_id' => $this->user_id,
            'phone' => $this->phone,
            'order_id' => $this->order_id ?? 'Cash',
            'car_id' => $this->car_id,
            'payment' => $this->payment,
            'price' => $this->price,
            'amount' => $this->amount,
            'total_price' => $this->total_price,
            'state' => $this->state,
            'created_at' => date('d-m-Y', strtotime($this->created_at)),
            'image' => $this->car->primaryImage ? URL::to($this->car->primaryImage->image_path) : '',
            'slug' => $this->car->slug,
            'address' => $this->car->address,
            'user_name' => $this->owner->name,
            'user_email' => $this->owner->email,
        ];
    }
}
