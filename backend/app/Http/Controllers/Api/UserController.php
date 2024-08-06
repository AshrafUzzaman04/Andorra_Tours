<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
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
        $validation = Validator::make($request->all(), [
            'name' => "required|string|max:255|min:2",
            'email' => "required|email|unique:users,email",
            'phone' => 'nullable|string|regex:/^\+?[0-9\-]{7,15}$/',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            'gender' => 'nullable|string|enum:Male,Female,Others',
            'password' => "required|string|min:6|max:30",
        ]);
        if($validation->fails()){
            return response()->json($validation->errors(), 422);
        }
        $data = $validation->valid();
        $data['password'] = Hash::make($request->password);

        User::create($data);
        return response()->json(["status"=>true,"message"=>"User created successfully"],201);
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
