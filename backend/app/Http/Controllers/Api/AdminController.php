<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Artisan;
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

    public function optimize(Request $request)
    {
        
        $commands = [
            'cache:clear',
            'config:clear',
            'route:clear',
            'view:clear',
            'storage:link',
            'migrate',
        ];
    
        $outputMessages = [];
    
        $linkPath = public_path('storage');
        foreach ($commands as $command) {
            if (!file_exists($linkPath) && $command == 'storage:link') {
                Artisan::call($command);
                $outputMessages[] = Artisan::output();
            }elseif($command != 'storage:link'){
                Artisan::call($command);
                $outputMessages[] = Artisan::output();
            }
            
        }
        return response()->json(['output' => $outputMessages],200);
    }
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
        if($user->status == "Inactive") return response()->json(["errors" => ["email"=>["Your are not active"]]], 422);
        if($user->user_type == "admin") {
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
        }else {
            return response()->json(["errors" => ["email"=>["Your are not a admin"]]], 422);
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
        $data['user_type'] = "admin";
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
