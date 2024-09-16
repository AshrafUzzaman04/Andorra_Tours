<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    use HasFactory;
    protected $fillable = [
        "banner_color",
        "button_text",
        "button_text_color",
        "button_link",
        "title",
        "description",
        "image_one",
        "image_two",
        "image_three",
        "image_four",
        "image_five",
        "status"
    ];
}
