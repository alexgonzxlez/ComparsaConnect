<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateProfileRequest;

class ProfileController extends Controller
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
    public function store(CreateProfileRequest $request)
    {
        // Obtener el usuario autenticado
        $user = Auth::user();

        // Verificar si el usuario ya tiene un perfil
        if ($user->profile()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'El usuario ya tiene un perfil.'
            ], 400);
        }

        // Crear el perfil si el usuario no tiene uno
        $profileData = [
            'user_id'      => $user->id,
            'gender'       => $request->gender,
            'description'  => $request->description,
            'birthdate'    => $request->birthdate,
            'gender_pref'  => $request->gender_pref,
        ];

        $profile = Profile::create($profileData);

        return response()->json([
            'success' => true,
            'data'    => $profile
        ], 200);
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
