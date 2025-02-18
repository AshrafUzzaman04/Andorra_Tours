<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class Hotel extends Model
{
    use HasFactory;
    protected $fillable = [
        "categorie_id",
        "parent_slug",
        "photo",
        "photo_one",
        "photo_two",
        "photo_three",
        "review",
        "total_review",
        "title",
        "slug",
        "location",
        "map_location",
        "button_text_map",
        "tag",
        "hotel_link",
        "button_text_link",
        "description",
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

    public function categorie()
    {
        return $this->belongsTo(CardCategory::class, 'categorie_id');
    }
}