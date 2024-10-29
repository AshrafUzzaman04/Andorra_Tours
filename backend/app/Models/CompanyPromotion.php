<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyPromotion extends Model
{
    use HasFactory;

    protected $fillable = [
        "content_for",
        "title",
        "sub_title",
        "pricing_cards",
        "description",
        "company_benifits",
        "image",
        "status"
    ];
}
