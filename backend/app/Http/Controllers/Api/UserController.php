<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where("user_type", "admin")->with([])->paginate(10);
        return response()->json(['message' => "success", "data" => $users]);
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
            'gender' => 'nullable|string|in:Male,Female,Others',
            'password' => "required|string|min:6|max:30",
            'status' => 'nullable|string|in:Active,Inactive',
        ]);
        if($validation->fails()){
            return response()->json($validation->errors(), 422);
        }
        $data = $validation->valid();
        if($request->hasFile("photo")){
            $path = 'storage/' . $request->photo->store("user-photo");
            $data['photo'] = $path;
        }
        $data['password'] = Hash::make($request->password);
        $data['user_type'] = "normal";
        User::create($data);
        return response()->json(["status"=>true,"message"=>"User created successfully"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::find($id);
        return response()->json(["message" => "success", "data" => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validation = Validator::make($request->all(), [
            'name' => "required|string|max:255|min:2",
            'email' => "required|email|unique:users,email,".$user->id,
            'phone' => 'nullable|string|min:11|max:18',
            'gender' => 'nullable|string|in:Male,Female,Others,'.$user->id,
            'status' => 'nullable|string|in:Active,Inactive',
        ]);
        if($request->hasFile("photo")){
            $validation = Validator::make($request->all(), [
                'photo' => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048,'. $user->id,
            ]);
            
        }
        if ($validation->fails()) {
            return response()->json(["errors" => $validation->errors()], 422);
        }
        $data = $validation->valid();
        if($request->hasFile("photo")){
            $path = 'storage/' . $request->photo->store("user-photo");
            $data['photo'] = $path;
        }
        
        $user->update($data);
        
        return response()->json(["success" => true, "message" => "User update successfully"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if(!$user)return response()->json(["message" => "User not found",],422);
        $user->delete();
        return response()->json(['message'=>"User delete successfully"],200);
    }
}
