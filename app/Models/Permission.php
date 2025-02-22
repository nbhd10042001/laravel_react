<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Permission extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'name', 'role_id',
    ];

    // public function users(): HasMany
    // {
    //     return $this->hasMany(User::class);
    // }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }
}
