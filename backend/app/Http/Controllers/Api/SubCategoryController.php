<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubCategory;
use App\Models\Category;
use App\Models\SubCategory as ModelsSubCategory;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Subcategories = ModelsSubCategory::with(['category'])->paginate(10);
        return response()->json(['message' => "success", "data" => $Subcategories]);
    }

    public function getSubcategories()
    {
        $categories = Category::all();
        return response()->json(['message' => "success", "data" => $categories]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(SubCategory $request)
    {
        $data = $request->only(['sub_category_name','status','link']);
        $data['categorie_id'] = $request->category;
        ModelsSubCategory::create($data);
        return response()->json(['message' => "Sub Category create successfully",],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $Subcategory = ModelsSubCategory::find($id);
        if(!$Subcategory)return response()->json(["message" => "Sub Category not found",],422);
        return response()->json(['message'=>"success", "data" => $Subcategory],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubCategory $request, string $id)
    {
        $Subcategory = ModelsSubCategory::find($id);
        if(!$Subcategory)return response()->json(["message" => "Sub Category not found",],422);
        $data = $request->only(['sub_category_name','status','link']);
        $data['categorie_id'] = $request->category;
        $Subcategory->update($data);
        return response()->json(['message'=>"Category update successfully"],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $Subcategory = ModelsSubCategory::find($id);
        if(!$Subcategory)return response()->json(["message" => "Sub Category not found",],422);
        $Subcategory->delete();
        return response()->json(['message'=>"Sub Category delete successfully"],200);
    }
}
