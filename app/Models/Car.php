<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Car extends EloquentModel
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'maker_id',
        'model_id',
        'slug',
        'year',
        'price',
        'vin',
        'mileage',
        'car_type',
        'fuel_type',
        'user_id',
        'city_id',
        'state_id',
        'address',
        'phone',
        'description',
        'published_at',
        'publish',
    ];

    // // every column fill except user_id
    // protected $guarded = ['user_id'];

    public function maker(): BelongsTo
    {
        return $this->belongsTo(Maker::class, 'maker_id');
    }

    public function model(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Model::class, 'model_id');
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class, 'city_id');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function features(): HasOne
    {
        return $this->hasOne(CarFeatures::class, 'car_id');
    }

    public function primaryImage(): HasOne
    {
        return $this->hasOne(CarImage::class, 'car_id')
                    ->oldestOfMany('position');
    }

    public function images(): HasMany
    {
        return $this->hasMany(CarImage::class, "car_id");
    }


    public function favouredUsers(): BelongsToMany
    {
        return $this->belongsToMany( User::class,
                                     'favourite_cars', 
                                     'car_id', 
                                     'user_id');
    }

    public function getCreatedDate()
    {
        return (new Carbon($this->created_at))->format('Y-m-d');
    }
}
