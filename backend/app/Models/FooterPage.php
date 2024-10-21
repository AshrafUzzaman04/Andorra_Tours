<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class FooterPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'page_name',
        'page_slug',
        'page_title',
        'title_for',
        'content',
        'status',
    ];

    public function category()
    {
        return $this->belongsTo(PageCategory::class, 'category');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->page_slug = Str::slug($model->page_name);
        });

        static::updating(function ($model) {
            $model->page_slug = Str::slug($model->page_name);
        });
    }
}
