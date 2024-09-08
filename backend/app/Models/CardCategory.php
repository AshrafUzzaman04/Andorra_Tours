<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CardCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        "top_title",
        "top_sub_title",
        "tag",
        "image",
        "title", 
        "sub_title",
        "link",
        "status"
    ];
}
