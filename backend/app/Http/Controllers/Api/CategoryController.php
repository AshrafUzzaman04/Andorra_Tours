<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Models\CategoryDetail;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::with([])->paginate(10);
        return response()->json(['message' => "success", "data" => $categories]);
    }

    public function Categories()
    {

    }

    public function categoryDetails($slug)
    {
        $id = Category::where("slug", $slug)->pluck('id');
        $data = CategoryDetail::where("category_id", $id)->select("category_desc")->first();
        return response()->json(['message' => "success", "data" => $data]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $data = $request->validated();
        Category::create($data);
        return response()->json(['message' => "Category create successfully",], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::with(["categoryDesc"])->find($id);
        if (!$category)
            return response()->json(["message" => "Category not found",], 422);
        return response()->json(['message' => "success", "data" => $category], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, $id)
    {
        $category = Category::find($id);
        if (!$category)
            return response()->json(["message" => "Category not found",], 422);
        $data = $request->validated();
        $category->update($data);

        $categoryDtls = CategoryDetail::where("category_id", $id)->first();
        if ($categoryDtls) {
            $categoryDtls->update([
                "category_desc" => $data['description'],
            ]);
        }
        return response()->json(['message' => "Category update successfully", "data" => $category], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category)
            return response()->json(["message" => "Category not found",], 422);
        $category->delete();
        return response()->json(['message' => "Category delete successfully"], 200);
    }
}