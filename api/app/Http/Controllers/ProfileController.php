<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gender;
use App\Models\Bandera;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProfileRequest;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdateProfileRequest;

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
    public function store(ProfileRequest $request)
    {
        $user = Auth::user();

        if ($user->profile()->exists()) {
            return response()->json([
            'success' => false,
            'message' => 'El usuario ya tiene un perfil.'
            ], 400);
        }

        $upload = $request->file('upload');
        $fileName = $upload->getClientOriginalName();
        $fileSize = $upload->getSize();

        $uploadName = time() . '_' . $fileName;
        $filePath = $upload->storeAs(
            'uploads',
            $uploadName,
            'public'
        );

        if (Storage::disk('public')->exists($filePath)) {

            $fullPath = Storage::disk('public')->path($filePath);

            $file = File::create([
                'filepath' => $filePath,
                'filesize' => $fileSize,
            ]);

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
                'message' => 'Error al crear el perfil'
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
    public function update(UpdateProfileRequest $request)
    {
        $user = Auth::user();
        $profile = $user->profile;

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'El usuario no tiene un perfil.'
            ], 404);
        }

        if ($profile->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'No tienes permiso para actualizar este perfil.'
            ], 403);
        }

        $profile->gender = $request->gender;
        $profile->description = $request->description;
        $profile->birthdate = $request->birthdate;
        $profile->gender_pref = $request->gender_pref;
        $profile->bandera = $request->bandera;

        if ($request->hasFile('upload')) {
            foreach ($request->file('upload') as $upload) {
                $fileName = $upload->getClientOriginalName();
                $fileSize = $upload->getSize();
        
                $uploadName = time() . '_' . $fileName;
                $filePath = $upload->storeAs(
                    'uploads',
                    $uploadName,
                    'public'
                );
        
                if (Storage::disk('public')->exists($filePath)) {
                    $file = File::create([
                        'filepath' => $filePath,
                        'filesize' => $fileSize,
                    ]);
        
                    $profile->files()->attach($file->id);
                }
            }
        }        

        $profile->save();

        return response()->json([
            'success' => true,
            'data' => $profile,
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
