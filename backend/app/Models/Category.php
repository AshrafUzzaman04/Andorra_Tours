<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        "category_name",
        "slug",
        "link",
        "status",
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->slug = Str::slug($model->category_name);
        });

        static::updating(function ($model) {
            $model->slug = Str::slug($model->category_name);
        });
    }

    public function sub()
    {
        return $this->hasMany(SubCategory::class, "categorie_id")->where("status", "Active");
    }

    public function categoryDesc(): HasOne
    {
        return $this->hasOne(CategoryDetail::class, "category_id");
    }
}