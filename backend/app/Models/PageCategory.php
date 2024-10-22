<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_name',
        'status'
    ];

    public function pages()
    {
        return $this->hasMany(FooterPage::class, "category")->where("status","Active");
    }
}
