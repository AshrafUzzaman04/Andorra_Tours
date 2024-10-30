<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resort extends Model
{
    use HasFactory;
    protected $fillable = [
        "provider_id",
        "photo",
        "name",
        "country",
        "height",
        "alpine_skiing",
        "ski_lifts",
        "clues",
        "details_title",
        "description",
        "status"
    ];

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}
