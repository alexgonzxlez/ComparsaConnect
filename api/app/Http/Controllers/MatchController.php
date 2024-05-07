<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;
use Carbon\Carbon;
use App\Models\User;

class MatchController extends Controller
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

    public function matches()
    {
        $userId = Auth::id();
        $profile = Profile::where("user_id", $userId)->first();

        if (!$profile) {
            return response()->json(['error' => 'No tienes perfil'], 404);
        }

        $userBirthdate = Carbon::parse($profile->birthdate);
        $userAge = $userBirthdate->age;

        $genderPref = $profile->gender_pref;
        $bandera = $profile->bandera;

        $query = Profile::where('id', '!=', $profile->id);

        if ($genderPref != 1) {
            $query->where('gender', $genderPref);
        }

        $query->where('gender_pref', $profile->gender);

        if ($bandera != 1) {
            $query->where('bandera', $bandera);
        }

        // $otrosPerfiles = $query->get();
        $otrosPerfiles = $query->with('gender', 'gender_pref', 'bandera')->get();

        $perfilesConPorcentaje = [];

        $coincidencias = 0;

        foreach ($otrosPerfiles as $perfil) {

            if ($genderPref == $perfil->gender) {
                $coincidencias += 33;
            }

            if ($bandera == $perfil->bandera) {
                $coincidencias += 33;
            }

            $perfilBirthdate = Carbon::parse($perfil->birthdate);
            $perfilAge = $perfilBirthdate->age;

            $diferenciaEdad = abs($userAge - $perfilAge);
            if ($diferenciaEdad <= 5) {
                $coincidencias += 33;
            }

            $user = $perfil->user;

            $perfilesConPorcentaje[] = [
                'perfil' => $perfil,
                'porcentaje' => $coincidencias,
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $perfilesConPorcentaje,
        ]);
    }

    public function like(User $recipient)
    {
        if ($recipient->id === auth()->id()) {
            return response()->json(['error' => 'No puedes hacer match contigo mismo.'], 400);
        }
    
        $existingRequest = $recipient->matches()->where('user2_id', auth()->id())->first();
        if ($existingRequest) {
            return response()->json(['error' => 'Ya tienes una solicitud de match pendiente a este usuario.'], 400);
        }
    
        // Crear la solicitud de amistad
        auth()->user()->matches()->create([
            'user2_id' => $recipient->id,
            'status' => 'pending',
        ]);
    
        return response()->json(['success' => true, 'message' => 'Solicitud de match enviada.'], 201);
    }
}
