<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class Verano extends Model
{
    use HasFactory;
    protected $fillable = [
        "label",
        "reviews",
        "total_reviews",
        "type",
        "reviews_link",
        "title",
        "price",
        "photo",
        "booking_link",
        "slug",
        "status",
        "meta_title",
        "meta_description",
        "meta_tags",
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->slug = Str::slug($model->title);
        });

        static::updating(function ($model) {
            $model->slug = Str::slug($model->title);
        });
    }

    public function details()
    {
        return $this->hasOne(VeranoDetail::class)->where('for', '=', 'verano');
    }
}