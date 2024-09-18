<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePageCategory;
use App\Http\Requests\UpdatePageCategory;
use App\Models\PageCategory;
use Illuminate\Http\Request;

class PageCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pageCategory = PageCategory::with([])->paginate(10);
        return response()->json(["success" => true, "data" => $pageCategory],200);
    }

    public function pageCategories()
    {
        $pageCategory = PageCategory::all();
        return response()->json(["success" => true, "data" => $pageCategory],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePageCategory $request)
    {
        $data = $request->validated();
        $pageCategory = PageCategory::create($data);
        return response()->json(["success" => true, "message" => "Page category created successfully"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(PageCategory $pageCategory)
    {
        return response()->json(["success" => true, "data" => $pageCategory],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePageCategory $request, PageCategory $pageCategory)
    {
        $data = $request->validated();
        $pageCategory->update($data);
        return response()->json(["success" => true, "message" => "Page category updated successfully"],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PageCategory $pageCategory)
    {
        $pageCategory->delete();
        return response()->json(["success" => true, "message" => "Page category deleted successfully"],200);
    }
}
