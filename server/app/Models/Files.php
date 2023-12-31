<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Files extends Model
{
    use HasFactory;

    public function folders()
    {
        return $this->belongsToMany(Folder::class)
            ->withTimestamps();
    }
}
