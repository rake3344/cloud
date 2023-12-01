<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Files;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {

            $user = JWTAuth::parseToken()->authenticate();
            // $files = User::find($user->id)->with('files')->get();
            $files = User::find($user->id)->files;
            $folders = User::find($user->id)->folders;

            return response()->json([
                'files' => $files,
                'folders' => $folders,
                'status' => 200
            ], 200);

        } catch(\Exception $e) {
            return response()->json([
                'message' => 'failed to get files',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id = null)
    {
        //
        try {
            $file = $request->file('file');
            $getSizeFileInMb = $file->getSize() / 1024 / 1024;
            $fileName = $file->getClientOriginalName();
            $fileExtension = $file->getClientOriginalExtension();
            $parseSize = number_format($getSizeFileInMb, 2);

            $userToken = JWTAuth::parseToken()->authenticate();
            $user = User::find($userToken->id);

            $userStorage = $user->storage + $parseSize;

            if ($userStorage <= 300) {

                $imagesExt = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'tif'];

                $newFile = new Files();
                $newFile->file_name = $fileName;
                $newFile->file_size = $parseSize;
                $newFile->file_type = $fileExtension;
                $newFile->user_id = $userToken->id;

                $fileExt = strtolower($fileExtension);
                
                if(in_array($fileExt,$imagesExt) ){
                    $file_path = Storage::disk('s3')->put('images', $file);
                } else {
                    $file_path = Storage::disk('s3')->put('files', $file);
                }

                $newFile->file_path = $file_path;
                $newFile->save();

                $user->storage = $userStorage;
                $user->save();

                if($id !== null) {
                    DB::table('files_folder')->insert([
                        'files_id' => $newFile->id,
                        'folder_id' => $id
                    ]);
                }


            } else {
                return response()->json([
                    'message' => 'storage is full',
                    'status' => 'failed'
                ], 200);
            }

            return response()->json([
                'message' => 'file uploaded successfully',
                'status' => 200,
                'id' => $id
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'file upload failed',
                'error' => $e->getMessage()
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
    public function destroy($id)
    {
        //
        try{

            $file = Files::find($id);

            Storage::disk('s3')->delete($file->file_path);

            $file->delete();

            return response()->json([
                'message' => 'file deleted',
                'status' => 200,
            ], 200);
            

        } catch(\Exception $e) {
            return response()->json([
                'message' => 'failed to delete file',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }
}
