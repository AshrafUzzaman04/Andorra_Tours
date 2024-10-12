<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Advertisement extends Model
{
    use HasFactory;
    protected $fillable = [
        "banner_color",
        "button_text",
        "button_text_color",
        "button_link",
        "title",
        "slug",
        "company_logo",
        "description",
        "image_one",
        "image_two",
        "image_three",
        "image_four",
        "image_five",
        "status"
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model): void {
            $model->slug = Str::slug($model->title);
        });

        static::updating(function ($model) {
            $model->slug = Str::slug($model->title); 
        });
    }
}
