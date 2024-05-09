<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\BanUserRequest;
use App\Models\BannedUser;

class AdminController extends Controller
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

    public function getUsers()
    {
        $userId = Auth::id();
        $admin = User::where("id", $userId)->where('role', 1)->first();

        if (!$admin) {
            return response()->json(['message' => 'No tienes permisos de administrador'], 404);
        }

        $bannedUserIds = BannedUser::pluck('user_id')->toArray();

        $users = User::where('role', '!=', 1)
                    ->whereNotIn('id', $bannedUserIds)
                    ->with('profile.file')
                    ->with('profile.gender')
                    ->with('profile.bandera')
                    ->with('profile.gender_pref')
                    ->get();

        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }

    public function banUser($id, BanUserRequest $request)
    {
        //
        $userId = Auth::id();
        $admin = User::where("id", $userId)->where('role', 1)->first();

        if (!$admin) {
            return response()->json(['message' => 'No tienes permisos de administrador'], 404);
        }

        $alreadyBanned = BannedUser::where('user_id', $id)->exists();

        if ($alreadyBanned) {
            return response()->json(['message' => 'El usuario ya está baneado'], 400);
        }

        $banedUser = BannedUser::create([
            'user_id' => $id,
            'reason' => $request->reason
        ]);

        if (!$banedUser) {
            return response()->json(['message' => 'No se pudo banear al usuario'], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Usuario baneado con éxito',
            'data' => $banedUser
        ], 200);
    }

    public function unbanUser($id)
    {
        $userId = Auth::id();
        $admin = User::where("id", $userId)->where('role', 1)->first();

        if (!$admin) {
            return response()->json(['message' => 'No tienes permisos de administrador'], 404);
        }

        $bannedUser = BannedUser::where('user_id', $id)->first();

        if (!$bannedUser) {
            return response()->json(['message' => 'El usuario no está baneado'], 400);
        }

        $bannedUser->delete();

        return response()->json([
            'success' => true,
            'message' => 'Usuario desbaneado con éxito'
        ], 200);    
    }

    public function getBanedUsers()
    {
        $userId = Auth::id();
        $admin = User::where("id", $userId)->where('role', 1)->first();

        if (!$admin) {
            return response()->json(['message' => 'No tienes permisos de administrador'], 404);
        }

        $bannedUserIds = BannedUser::pluck('user_id')->toArray();

        $bannedUsers = User::where('role', '!=', 1)
                       ->whereIn('id', $bannedUserIds)
                       ->with('profile.file')
                       ->with('profile.gender')
                       ->with('profile.bandera')
                       ->with('profile.gender_pref')
                       ->get();

        return response()->json([
            'success' => true,
            'data' => $bannedUsers,
        ]);
    }
}