<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Verano extends Model
{
    use HasFactory;
    protected $fillable = [
        "label",
        "reviews",
        "total_reviews",
        "reviews_link",
        "title",
        "price",
        "photo",
        "booking_link",
        "status"
    ];
}
