<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class Service extends Model
{
    use HasFactory;
    protected $fillable = [
        "slug",
        "service_name",
        "service_image",
        "total_services",
        "service_link",
        "status"
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->slug = Str::slug($model->service_name);
        });

        static::updating(function ($model) {
            $model->slug = Str::slug($model->service_name); 
        });
    }

    public function form()
    {
        return $this->hasOne(FormBuilder::class, "service_id");
    }
}
