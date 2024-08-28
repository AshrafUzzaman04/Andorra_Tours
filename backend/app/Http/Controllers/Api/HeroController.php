<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class HeroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $hero = Hero::with([])->paginate(10);
        return response()->json(['message' => "success", "data" => $hero]);
    }

    public function Hero()
    {
        $heros = Hero::where("status","Active")->get();
        $thumbnails = $heros->map(function ($hero) {
            return $hero->thumnail_image;
        });
        return response()->json(['message' => "success", "data" => $heros, "thumbnails" => $thumbnails]);
    }

    public function serach($serachKey)
    {
        $heros = Hero::where('description', 'like', '%' . $serachKey . '%')
            ->orWhere('id', 'like', '%' . $serachKey . '%')
            ->orWhere('status', 'like', '%' . $serachKey . '%')
            ->orWhere('title', 'like', '%' . $serachKey . '%')->with([])->paginate(10);
        return response()->json(['message' => "success", "data" => $heros]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'title' => "required|string|max:255|min:2",
            'button_text' => 'required|string|max:255',
            'button_color' => 'required|string|max:255',
            'button_text_color' => 'required|string|max:255',
            'button_link' => 'required|string|max:255',
            'slider_image' => 'required|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            'thumnail_image' => 'required|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            'description' => 'required|string|max:5000',
            "description_text_color" => 'required|string|max:255',

            'status' => 'nullable|string|in:Active,Inactive',
        ]);
        if ($validation->fails()) {
            return response()->json(["errors" => $validation->errors()], 422);
        }
        $data = $request->only([
            "title",
            "title_color",
            "button_text",
            "button_color",
            "button_text_color",
            "button_link",
            "description",
            "description_text_color",
            "status"
        ]);
        if ($request->hasFile('slider_image')) {
            $path = "storage/" . $request->slider_image->store("slider_images");
            $data['slider_image'] = $path;
        }
        if ($request->hasFile('thumnail_image')) {
            $path = "storage/" . $request->thumnail_image->store("thumnail_image");
            $data['thumnail_image'] = $path;
        }
        Hero::create($data);
        return response()->json(['message' => "Slider create successfully",], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $hero = Hero::find($id);
        if (!$hero) return response()->json(["message" => "Hero Slider not found",], 422);
        return response()->json(['message' => "success", "data" => $hero], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $hero = Hero::find($id);
        $validation = Validator::make($request->all(), [
            'title' => "required|string|max:255|min:2",
            'button_text' => 'required|string|max:255',
            'button_color' => 'required|string|max:255',
            'button_text_color' => 'required|string|max:255',
            'button_link' => 'required|string|max:255',
            'slider_image' => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048,'.$id,
            'thumnail_image' => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048,'.$id,
            'description' => 'required|string|max:5000',
            "description_text_color" => 'required|string|max:255',
            'status' => 'nullable|string|in:Active,Inactive',
        ]);
        if ($validation->fails()) {
            return response()->json(["errors" => $validation->errors()], 422);
        }
        $data = $request->only([
            "title",
            "title_color",
            "button_text",
            "button_color",
            "button_text_color",
            "button_link",
            "description",
            "description_text_color",
            "status"
        ]);
        if ($request->hasFile('slider_image')) {
            if (!empty($hero->slider_image)) {
                $explode = explode('/', $hero->slider_image);
                $path = $explode[1] . "/" . $explode[2];
                if (Storage::exists($path)) {
                    Storage::delete($path);
                    $path = "storage/" . $request->slider_image->store("slider_images");
                    $data['slider_image'] = $path;
                }
            }
        }
        if ($request->hasFile('thumnail_image')) {
            if (!empty($hero->thumnail_image)) {
                $explode = explode('/', $hero->thumnail_image);
                $path = $explode[1] . "/" . $explode[2];
                if (Storage::exists($path)) {
                    Storage::delete($path);
                    $path = "storage/" . $request->thumnail_image->store("thumnail_image");
                    $data['thumnail_image'] = $path;
                }
            }
        }

        $hero->update($data);
        return response()->json(['message' => "Slider update successfully",], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $hero = Hero::find($id);
        if (!$hero) return response()->json(["message" => "Hero Slider not found",], 422);
        if (!empty($hero->slider_image)) {
            $explode = explode('/', $hero->slider_image);
            $path = $explode[1] . "/" . $explode[2];
            if (Storage::exists($path)) {
                Storage::delete($path);
            }
        }
        if (!empty($hero->thumnail_image)) {
            $explode = explode('/', $hero->thumnail_image);
            $path = $explode[1] . "/" . $explode[2];
            if (Storage::exists($path)) {
                Storage::delete($path);
            }
        }
        $hero->delete();
        return response()->json(['message' => "Hero Slider delete successfully"], 200);
    }
}
