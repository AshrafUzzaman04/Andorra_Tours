<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
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
        $validation = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6|max:30'
        ]);
        if ($validation->fails()) {
            return response()->json(["errors"=>$validation->errors()], 422);
        }
        $user = User::where('email', $request->email)->first();
        if (Hash::check($request->password, $user->password)) {
            $creadentials = $request->only(['email', 'password']);
            Auth::attempt($creadentials,$request->checkbox);
            $Authuser = Auth::user();
            $token = $Authuser->createToken("nextToursToken")->plainTextToken;
            return response()->json([
                'message' => 'success',
                'data' => [
                    'token' => $token,
                    'user' => $Authuser
                ]
            ]);
        } else {
            return response()->json(["errors" => ["password"=>["password did not match!"]]], 422);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(["message" => "Logout Successfully"], 200);
    }

    public function details(Request $request)
    {
        $user = Auth::user();
        return response()->json(["message" => "success", "data" => $user]);
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
        $validation = Validator::make($request->all(), [
            'name' => "required|string|max:255|min:2",
            'email' => "required|email|unique:users,email," . Auth::user()->id,
            'phone' => 'nullable|string|min:11|max:18',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            'gender' => 'nullable|string|in:Male,Female,Others,' . Auth::user()->id,
        ]);
        if ($validation->fails()) {
            return response()->json(["errors" => $validation->errors()], 422);
        }
        $user = User::where('id', Auth::user()->id)->first();
        $data = $validation->valid();
        $user->update($data);
        return response()->json(["success" => true, "message" => "User update successfully"], 200);
    }

    public function passwordUpdate(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'current_password' => 'required|min:6|max:30',
            'password' => 'required|min:6|max:30',
            'password_confirmation' => 'required|same:password|min:6|max:30',
        ]);

        if ($validation->fails()) {
            return response()->json(["errors" => $validation->errors()], 422);
        }

        $user = User::where('id', Auth::user()->id)->first();
        if(!Hash::check($request->current_password,$user->password)){
            return response()->json(["errors" => ["current_password"=>["Current password is incorrect"]]],422);
        }

        $user->update([
            'password'=>Hash::make($request->password)
        ]);
        
        return response()->json(["success" => true, "message" => "Password changed successfully"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
