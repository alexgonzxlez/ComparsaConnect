<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'gender',
        'description',
        'birthdate',
        'gender_pref',
        'bandera',
        'file_id'
    ];

    use HasFactory;
    
    public function user()
    {
        return $this->belongsTo(User::class)->select('id', 'name', 'username');
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }

    public function gender()
    {
        // return $this->belongsTo(Gender::class, 'gender');
        return $this->belongsTo(Gender::class, 'gender')->select('id', 'name');
    }

    public function gender_pref()
    {
        // return $this->belongsTo(Bandera::class, 'bandera');
        return $this->belongsTo(Gender::class, 'gender_pref')->select('id', 'name');
    }

    public function bandera()
    {
        // return $this->belongsTo(Bandera::class, 'bandera');
        return $this->belongsTo(Bandera::class, 'bandera')->select('id', 'name');
    }

}
