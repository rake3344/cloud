<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Share extends Model
{
    use HasFactory;

    public function files()
    {
        return $this->belongsTo(Files::class, 'file_id');
    }

    public function shareUser()
    {
        return $this->belongsTo(User::class, 'share_user_id');
    }

    public function receivedUser()
    {
        return $this->belongsTo(User::class, 'received_user_id');
    }
}
