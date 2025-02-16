<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    // public $timestamps = false;
    protected $fillable = [
        'user_id',
        'car_id',
        'payment',
        'order_id',
        'amount',
        'price',
        'total_price',
        'phone',
        'state',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class, 'car_id');

    }
}
