<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    use HasFactory;
    protected $fillable = [
        "provider_for",
        "name",
        "logo",
        "status"
    ];

    public function Webcams()
    {
        return $this->hasMany(Webcam::class, 'provider_id', )->where('status', 'Active');
    }

    public function Resorts()
    {
        return $this->hasMany(Resort::class, 'provider_id', )->where('status', 'Active');
    }
}
