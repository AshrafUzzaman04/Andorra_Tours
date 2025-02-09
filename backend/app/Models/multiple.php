<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Multiple extends Model
{
    use HasFactory;

    protected $fillable = [
        "verano_id",
        "inverano_id",
        "product_for",
        "title",
        "slug",
        "photos",
        "description",
        "pricing",
        "form_title",
        "service_title",
        "services",
        "extra_service_title",
        "extra_services",
        "status"
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->slug = Str::slug($model->title);
        });

        static::updating(function ($model) {
            $model->slug = Str::slug($model->title);
        });
    }

    public function verano()
    {
        return $this->belongsTo(Verano::class, 'verano_id');
    }

    public function inverano()
    {
        return $this->belongsTo(Inverano::class, 'inverano_id');
    }
}
