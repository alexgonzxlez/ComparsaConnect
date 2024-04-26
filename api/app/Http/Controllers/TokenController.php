<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\LogoutRequest;

class TokenController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);
        $token = $user->createToken("token")->plainTextToken;
    
        return response()->json([
            'success'   => true,
            'token'     => $token,
            'tokenType' => 'Bearer',
        ], 200);
    }
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('username', 'password');
    
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
        } else {
            $user = User::where('email', $credentials['username'])->first();
            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                return response()->json([
                    "success" => false,
                    "message" => "Credenciales de inicio de sesión inválidas"
                ], 401);
            }
        }
    
        $user->tokens()->delete();
        $token = $user->createToken("token")->plainTextToken;
    
        return response()->json([
            "success" => true,
            "token" => $token,
            "tokenType" => "Bearer"
        ], 200);
    }

    public function logout(LogoutRequest $request)
    {
        Auth::user()->tokens()->delete();

        return response()->json([
            'success' => true,
            'message' => 'El usuario cerró sesión exitosamente',
        ], 200);
    }

    public function user(Request $request)
    {
        $user = $request->user();
        $profile = $user->profile;
    
        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'profile' => $profile
            ]
        ], 200);
    }
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
}
