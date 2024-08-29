<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        "category_name",
        "link",
        "status",
    ];

    public function sub()
    {
        return $this->hasMany(SubCategory::class, "categorie_id")->where("status", "Active");
    }
}
