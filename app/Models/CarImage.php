<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarImage extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'image_path', 'position', 'car_id'
    ];

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }
}
