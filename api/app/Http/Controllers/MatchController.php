<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Matches;
use App\Http\Resources\PaginateCollection;

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

    public function matches(Request $request)
    {
        $userId = Auth::id();
        $profile = Profile::where("user_id", $userId)->first();
    
        if (!$profile) {
            return response()->json(['error' => 'No tienes perfil'], 404);
        }
    
        // $userBirthdate = Carbon::parse($profile->birthdate);
        // $userAge = $userBirthdate->age;
    
        // $genderPref = $profile->gender_pref;
        // $bandera = $profile->bandera;
    
        $query = Profile::where('id', '!=', $profile->id);
    
        // $query->where('gender_pref', $profile->gender);
    
        $otrosPerfiles = $query->with('gender', 'gender_pref', 'bandera', 'file', 'user')->get();
    
        $filteredProfiles = [];
    
        foreach ($otrosPerfiles as $perfil) {
    
            $existingMatch = Matches::where(function ($query) use ($userId, $perfil) {
                $query->where('user_id', $userId)
                      ->where('user2_id', $perfil->user_id);
            })
            ->orWhere(function ($query) use ($userId, $perfil) {
                $query->where('user_id', $perfil->user_id)
                      ->where('user2_id', $userId);
            })
            ->where(function ($query) {
                $query->where('status', 'accepted')
                      ->orWhere('status', 'rejected');
            })
            ->exists();

            if (!$existingMatch) {
                    $filteredProfiles[] = $perfil;
            }
        }
    
        // Pagination
        $perPage = 10; // Mostrar un perfil por página
        $page = $request->get('page', 1);
        $offset = ($page - 1) * $perPage;
        $paginatedData = array_slice($filteredProfiles, $offset, $perPage);
    
        return response()->json([
            'success' => true,
            'data'    => $paginatedData,
            'meta'    => [
                'current_page' => $page,
                'per_page'     => $perPage,
                'total'        => count($filteredProfiles)
            ]
        ]);
    }
    
    
    public function match(User $recipient)
    {
        $userId = Auth::id();
        $profile = Profile::where("user_id", $userId)->first();

        if (!$profile) {
            return response()->json(['message' => 'No tienes perfil'], 404);
        }
        
        if ($recipient->id === auth()->id()) {
            return response()->json(['message' => 'No puedes hacer match contigo mismo.'], 400);
        }

        $existingRequest = auth()->user()->matches()->where('user2_id', $recipient->id)->first();
        if ($existingRequest) {
            return response()->json(['message' => 'Ya tienes una solicitud de match pendiente a este usuario.'], 400);
        }

        $pendingRequest = $recipient->matches()->where('user2_id', auth()->id())->first();
        if ($pendingRequest) {
            if ($pendingRequest->status === 'accepted') {
                return response()->json(['message' => 'Ya hay un match aceptado con este usuario.'], 200);
            }
            if ($pendingRequest->status === 'rejected') {
                return response()->json(['message' => 'El otro usuario ha rechazado tu match.'], 200);
            }
            if ($pendingRequest->status === 'pending') {
                $pendingRequest->update(['status' => 'accepted']);
                return response()->json(['success' => true, 'match' => true], 200);
            }

        }
        
        $match = auth()->user()->matches()->create([
            'user_id' => auth()->id(),
            'user2_id' => $recipient->id,
            'status' => 'pending',
        ]);

        if (!$match) {
            return response()->json(['message' => 'No se pudo crear la solicitud de match.'], 500);
        }

        return response()->json(['success' => true, 'message' => 'Solicitud de match enviada.'], 201);
    }

    public function rejectMatch(User $recipient)
    {
        $existingRequest = Matches::where('user_id', $recipient->id)
        ->where('user2_id', Auth::id())
        ->first();

        if (!$existingRequest) {
            // Si no existe una solicitud de match, crea una nueva y la rechaza
            $existingRequest = auth()->user()->matches()->create([
                'user_id' => auth()->id(),
                'user2_id' => $recipient->id,
                'status' => 'rejected',
            ]);
            return response()->json(['success' => true, 'message' => 'Solicitud de match creada y rechazada.'], 200);
        }

        $existingRequest->update(['status' => 'rejected']);

        return response()->json(['success' => true, 'message' => 'Solicitud de match rechazada.'], 200);
    }

}
