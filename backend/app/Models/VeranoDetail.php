<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VeranoDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        "verano_id",
        "inverano_id",
        "for",
        "pricing",
        "details",
        "form_title",
        "times",
        "service_title",
        "services",
        "add_extra_title",
        "add_extra",
        "status"
    ];

    public function verano()
    {
        return $this->belongsTo(Verano::class);
    }

    public function inverano()
    {
        return $this->belongsTo(Inverano::class, 'inverano_id');
    }
}
