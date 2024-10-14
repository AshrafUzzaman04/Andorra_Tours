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
        "tag",
        "hotel_link",
        "description",
        "status",
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
