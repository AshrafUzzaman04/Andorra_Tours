<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VeranoDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        "verano_id",
        "for",
        "pricing",
        // "duration",
        // "duration_title",
        // "group_size",
        // "group_size_title",
        // "tour_type",
        // "tour_type_title",
        // "language",
        // "language_title",
        "details",
        "form_title",
        "times",
        "service_title",
        "services",
        "add_extra_title",
        "add_extra",
        // "question_title",
        // "answers",
        "status"
    ];

    public function verano()
    {
        return $this->belongsTo(Verano::class);
    }

    public function inverano()
    {
        return $this->belongsTo(Inverano::class, 'verano_id');
    }
}
