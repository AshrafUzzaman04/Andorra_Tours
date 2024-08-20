<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Header extends Model
{
    use HasFactory;
    protected $fillable = [
        "dark_logo",
        "light_logo",
        "show_language",
        "show_currency",
        "show_light_dark",
        "show_signin_button",
        "status",
    ];
}
