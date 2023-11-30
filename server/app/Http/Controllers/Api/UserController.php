<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{


    public function register(Request $request)
    {   
        $userExist = User::where('email', $request->email)->first();
        if($userExist){
            return response()->json([
                'message' => 'User already exist'
            ], 200);
        } else {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();

            $token = JWTAuth::fromUser($user);
            
            return response()->json([
                'message' => 'User created successfully',
                'token' => $token,
                'status' => 201
            ], 201);
        }
    }


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt($credentials)){
                return response()->json([
                    'message' => 'Invalid credentials',
                    'status' => 400
                ], 200);
            }
        } catch (JWTException $e) {
            return response()->json([
                'message' => 'Could not create token'
            ], 500);
        }

        return response()->json([
            'message' => 'User logged in successfully',
            'token' => $token,
            'status' => 200
        ], 200);    
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $users = User::all();
        return response()->json(compact('users'));
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
    public function show()
    {
        //
        $user = JWTAuth::parseToken()->authenticate();
        return response()->json([
            'message' => 'User found',
            'user' => $user
        ], 200);
        
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
