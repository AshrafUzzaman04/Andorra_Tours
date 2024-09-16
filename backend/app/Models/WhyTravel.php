<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WhyTravel extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'background_color',
        'description',
        'logo',
        'status'
    ];
}
