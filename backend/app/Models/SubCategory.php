<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SubCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        "categorie_id", 
        "sub_category_name",
        "slug",
        "link",
        "status",
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->slug = Str::slug($model->sub_category_name);
        });

        static::updating(function ($model) {
            $model->slug = Str::slug($model->sub_category_name); 
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class, "categorie_id");
    }
}
