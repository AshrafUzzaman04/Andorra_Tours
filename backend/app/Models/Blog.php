<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id",
        "tag",
        "photo",
        "images",
        "date",
        "title",
        "slug",
        "user_photo",
        "user_name",
        "button_text",
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
            $model->user_id = Auth::user()->id;
            $model->slug = Str::slug($model->title);
        });
        static::updating(function ($model) {
            //$model->user_id = Auth::user()->id;
            $model->slug = Str::slug($model->title);
        });
    }
}
