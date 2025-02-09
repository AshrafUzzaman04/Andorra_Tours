<?php

namespace App\Models;

use App\Helpers\OrderIdGenerator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id",
        "order_id",
        "quantity",
        "price",
        "products",
        "status",
        "order_note",
        "coupon_id",
        "discounted_price",
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->order_id = OrderIdGenerator::generateUniqueOrderId();
        });

        // static::updating(function ($model) {
        //     $model->slug = Str::slug($model->title);
        // });
    }
    public function customer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}