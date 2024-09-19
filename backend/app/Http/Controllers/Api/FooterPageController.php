<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFooterPage;
use App\Http\Requests\UpdateFooterPage;
use App\Models\FooterPage;
use Illuminate\Http\Request;

class FooterPageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Fetch paginated list of FooterPage records
        $footerPages = FooterPage::with(['category'])->paginate(10);
        return response()->json(["success" => true, "data" => $footerPages], 200);
    }

    /**
     * Display a listing of all footer pages.
     *
     * @return \Illuminate\Http\Response
     */
    public function footerPages()
    {
        // Fetch all FooterPage records
        $footerPages = FooterPage::all();
        return response()->json(["success" => true, "data" => $footerPages], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreFooterPage  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFooterPage $request)
    {
        // Validate and create a new FooterPage
        $data = $request->validated();
        $footerPage = FooterPage::create($data);
        return response()->json(["success" => true, "message" => "Footer page created successfully"], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FooterPage  $footerPage
     * @return \Illuminate\Http\Response
     */
    public function show(FooterPage $footerPage)
    {
        // Return a specific FooterPage record
        return response()->json(["success" => true, "data" => $footerPage], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Models\FooterPage  $footerPage
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateFooterPage $request, FooterPage $footerPage)
    {
        // Validate and update the FooterPage
        $data = $request->validated();
        $footerPage->update($data);
        return response()->json(["success" => true, "message" => "Footer page updated successfully",$footerPage], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FooterPage  $footerPage
     * @return \Illuminate\Http\Response
     */
    public function destroy(FooterPage $footerPage)
    {
        // Delete the FooterPage
        $footerPage->delete();
        return response()->json(["success" => true, "message" => "Footer page deleted successfully"], 200);
    }
}
