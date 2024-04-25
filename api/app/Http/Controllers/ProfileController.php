<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gender;
use App\Models\Bandera;

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
