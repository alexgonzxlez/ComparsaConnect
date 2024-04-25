<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\CreateProfileRequest;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProfileRequest $request)
    {
        $validatedData = $request->validated();
        $user = Auth::user();
    
        $user->update([
            'name'     => $validatedData['name'],
            'email'    => $validatedData['email'],
            'username' => $validatedData['username'],
        ]);
    
        return response()->json([
            'success' => true,
            'data'    => $user
        ], 200);
    }    
    public function profile(CreateProfileRequest $request)
    {
    
        // Obtener el usuario autenticado
        $user = Auth::user();
    
    
        $profileData = [
            'user_id'      => $user->id,
            'gender'       => $request->gender,
            'description'  => $request->description,
            'birthdate'    => $request->birthdate,
            'gender_pref'  =>  $request->gender_pref,
        ];
    
        $profile = Profile::create($profileData);
    
        return response()->json([
            'success' => true,
            'data'    => $profile
        ], 200);
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
