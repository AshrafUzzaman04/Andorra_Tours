<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfferBanner extends Model
{
    use HasFactory;
    protected $fillable = [
        "banner_title",
        "banner_title_color",
        "button_text",
        "button_color",
        "button_text_color",
        "button_link",
        "banner_image",
        "status",
    ];
}
