<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Header;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class HeaderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $headers = Header::first();
        return response()->json(['message'=>"success", 'data'=>$headers],200);
    }

    public function Header()
    {
        $headers = Header::first();
        $languages = Language::where("status", "Active")->get();
        $categories = Category::with(["sub"])->where("status","Active")->get();
        return response()->json([
            'message'=>"success", 
            'data'=> [
                "header"=> $headers,
                "categories"=> $categories,
                "languages" => $languages
            ]
        ],200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            "dark_logo" => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            "light_logo" => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            "show_language" => "nullable",
            "show_currency" => "nullable",
            "show_light_dark" => "nullable",
            "show_signin_button" => "nullable",
            'status' => 'nullable|string|in:Active,Inactive',
        ]);
        if($validation->fails()){
            return response()->json($validation->errors(), 422);
        }
        $data = ['status' => $request->status];
        if (isset($request->show_language)) $data['show_language'] = intval($request->show_language) === 0 ? 1:0;
        if (isset($request->show_currency)) $data['show_currency'] = intval($request->show_currency) === 0 ? 1:0;
        if (isset($request->show_light_dark)) $data['show_light_dark'] = intval($request->show_light_dark) === 0 ? 1:0;
        if (isset($request->show_signin_button)) $data['show_signin_button'] = intval($request->show_signin_button) === 0 ? 1:0;
    
        if ($request->hasFile('dark_logo')) {
            $data['dark_logo'] = 'storage/' . $request->file('dark_logo')->store('logos');
        }
        if ($request->hasFile('light_logo')) {
            $data['light_logo'] = 'storage/' . $request->file('light_logo')->store('logos');
        }
        $header = Header::first();
        if(!$header){
            Header::create($data);
        }else{
            if(!empty($header->light_logo) && $request->hasFile('light_logo')){
                $explode = explode("/", $header->light_logo);
                $path = $explode[1]."/".$explode[2];
                if(Storage::exists($path)){
                    $data['light_logo'] = 'storage/' . $request->file('light_logo')->store('logos');
                    Storage::delete($path);
                }
            }
            if(!empty($header->dark_logo) && $request->hasFile('dark_logo')){
                $explode = explode("/", $header->dark_logo);
                $path = $explode[1]."/".$explode[2];
                if(Storage::exists($path)){
                    $data['dark_logo'] = 'storage/' . $request->file('dark_logo')->store('logos');
                    Storage::delete($path);
                }
            }
            
            $header->update($data);
        }
        return response()->json(["success"=> true,'message' => 'Header updated successfully', $data],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Header $header)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Header $header)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Header $header)
    {
        //
    }
}
