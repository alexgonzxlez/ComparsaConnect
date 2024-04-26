<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gender;
use App\Models\Bandera;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateProfileRequest;
use App\Models\File;
use Illuminate\Support\Facades\Storage;


class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $genders = Gender::all();
        $banderas = Bandera::all();
        $data = [
            'genders' => $genders,
            'banderas' => $banderas,
        ];
        
        return response()->json([
            'success' => true,
            'data' => $data
        ]);
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

        $upload = $request->file('upload');
        $fileName = $upload->getClientOriginalName();
        $fileSize = $upload->getSize();

        // Almacenamiento del archivo en el sistema de archivos y la base de datos.
        $uploadName = time() . '_' . $fileName;
        $filePath = $upload->storeAs(
            'uploads',
            $uploadName,
            'public'
        );

        if (Storage::disk('public')->exists($filePath)) {

            $fullPath = Storage::disk('public')->path($filePath);

            // Creación de la entrada del archivo en la base de datos.
            $file = File::create([
                'filepath' => $filePath,
                'filesize' => $fileSize,
            ]);

            // Creación de la publicación en la base de datos.
            $profileData = [
                'user_id' => $user->id,
                'gender' => $request->gender,
                'description' => $request->description,
                'birthdate' => $request->birthdate,
                'gender_pref' => $request->gender_pref,
                'bandera' => $request->bandera,
                'file_id'=> $file->id,
            ];
    
            $profile = Profile::create($profileData);
            
            return response()->json([
                'success' => true,
                'data' => $profile
            ], 200);

        } else {
            return response()->json([
                'success'  => false,
                'message' => 'Error uploading post'
            ], 500);
        }
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
