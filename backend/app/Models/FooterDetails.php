<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FooterDetails extends Model
{
    use HasFactory;
    protected $fillable = [
        'location',
        'schedule',
        'email',
        'help_number',
        'copyright',
        'contact_title',
        'status'
    ];
}
