<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Webcam extends Model
{
    use HasFactory;
    protected $fillable = [
        "provider_id",
        "cameras",
        "status"
    ];

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}
