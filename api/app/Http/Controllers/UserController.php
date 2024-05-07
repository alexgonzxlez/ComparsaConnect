<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateAccountRequest;

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
    public function update(UpdateAccountRequest $request)
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
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $user = Auth::user();
    
        if ($user) {
            $user->tokens()->delete(); 
            $user->delete();
    
            return response()->json([
                'success' => true,
                'message' => 'Se ha eliminado el usuario correctamente.'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no encontrado.'
            ], 404);
        }
    }
    }
