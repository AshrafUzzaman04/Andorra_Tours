<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SectionHeading extends Model
{
    use HasFactory;
    protected $fillable = [
        "heading_for",
        "heading",
        "sub_heading",
        "status"
    ];
}
