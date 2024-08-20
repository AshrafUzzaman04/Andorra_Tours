<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
    use HasFactory;
    protected $fillable = [
        "title",
        "title_color",
        "button_text",
        "button_color",
        "button_text_color",
        "button_link",
        "slider_image",
        "thumnail_image",
        "description",
        "description_text_color",
        "status"
    ];
}
