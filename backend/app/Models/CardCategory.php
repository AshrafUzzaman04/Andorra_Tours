<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class CardCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        "top_title",
        "top_sub_title",
        "tag",
        "tag_title",
        "tag_slug",
        "image",
        "title",
        "slug",
        "sub_title",
        "link",
        "status"
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->slug = Str::slug($model->title);
            $model->tag_slug = Str::slug($model->tag_title);
        });

        static::updating(function ($model) {
            $model->slug = Str::slug($model->title);
            $model->tag_slug = Str::slug($model->tag_title);
        });
    }

    public function hotels()
    {
        return $this->hasMany(Hotel::class, 'categorie_id');
    }
    
    public function paginatedHotels($perPage = 10)
    {
        return $this->hotels()->paginate($perPage);
    }
}
