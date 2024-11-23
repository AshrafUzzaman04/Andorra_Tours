<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id",
        "order_id",
        "products",
        "status"
    ];

    public function customer()
    {
        return $this->belongsTo(User::class);
    }
}
