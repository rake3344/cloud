<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Folder;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class FolderController extends Controller
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
        try{

            $user = JWTAuth::parseToken()->authenticate();
            $folder = new Folder();
            $folder->folder_name = $request->name;
            $folder->user_id = $user->id;

            $folder->save();

            return response()->json([
                'message' => 'folder created',
                'status' => 200
            ], 200);

        } catch(\Exception $e) {
            return response()->json([
                'message' => 'failed to create folder',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $folderFiles = Folder::find($id)->files;
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
