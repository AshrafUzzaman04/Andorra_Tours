<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        "categorie_id", 
        "sub_category_name",
        "link",
        "status",
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, "categorie_id");
    }
}
