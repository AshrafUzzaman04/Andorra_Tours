<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class Resort extends Model
{
    use HasFactory;
    protected $fillable = [
        "provider_id",
        "photo",
        "name",
        "slug",
        "country",
        "height",
        "alpine_skiing",
        "ski_lifts",
        "clues",
        "details_title",
        "description",
        "status"
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->slug = Str::slug($model->name);
        });

        static::updating(function ($model) {
            $model->slug = Str::slug($model->name);
        });
    }

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}
