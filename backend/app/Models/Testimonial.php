<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id",
        "review_title",
        "review_text",
        "client_photo",
        "client_name",
        "client_address",
        "reviews",
        "status"
    ];
}
