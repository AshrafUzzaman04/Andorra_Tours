<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceNewsletter extends Model
{
    protected $guarded = [];


    public function getService(): BelongsTo
    {
        return $this->belongsTo(Service::class, "service_id", "id");
    }
}
