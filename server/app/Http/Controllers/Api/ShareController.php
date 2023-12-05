<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Share;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class ShareController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function shareFile (Request $request)
    {
        //
        try{
            $user = JWTAuth::parseToken()->authenticate();

            $shares = [];

            foreach($request->received_user_id as $userId) {
                $shares[] = [
                    'file_id' => $request->file_id,
                    'share_user_id' => $user->id,
                    'received_user_id' => $userId,
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            }

            Share::insert($shares);

            // Log::debug($request->all());

            return response()->json([
                'message' => 'File shared successfully',
                'status' => 200,
            ], 200);

        } catch(\Exception $e) {
            return response()->json([
                'message' => 'failed to share files',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    public function getSharedFiles()
    {
        try {

            $user = JWTAuth::parseToken()->authenticate();

            $sharedFiles = Share::where('received_user_id', $user->id)->with(['files', 'shareUser'])->get();

            return response()->json([
                'sharedFiles' => $sharedFiles,
                'status' => 200
            ], 200);


        } catch(\Exception $e) {
            return response()->json([
                'message' => 'failed to get shared files',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }


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
