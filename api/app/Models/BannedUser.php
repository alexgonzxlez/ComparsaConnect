<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BannedUser extends Model
{
    protected $table = 'banedusers';

    use HasFactory;

    protected $fillable = [
        'user_id',
        'reason',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}