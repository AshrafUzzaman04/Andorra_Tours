<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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
     * Login with created user
     */
    public function login(Request $request)
    {
        $validation = Validator::make($request->all(),[
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6|max:30'
        ]);
        if($validation->fails()){
            return response()->json($validation->errors(), 422);
        }
        $user = User::where('email',$request->email)->first();
        if(Hash::check($request->password, $user->password)){
            $creadentials = $request->only(['email', 'password']);
            Auth::attempt($creadentials);
            $Authuser = Auth::user();
            $token = $Authuser->createToken("nextToursToken")->plainTextToken;
            return response()->json([
                'message' => 'success',
                'data' => [
                    'token' => $token,
                    'user' => $Authuser
                ]
            ]);
        }else{
            return response()->json(["status"=>false, "message"=> "password did not match!"], 422);
        }
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
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
