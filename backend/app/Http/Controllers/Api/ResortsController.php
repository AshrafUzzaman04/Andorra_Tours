<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProviders;
use App\Http\Requests\UpdateProviders;
use App\Models\Resort;
use Illuminate\Http\Request;

class ResortsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $resorts = Resort::with([])->paginate(10);
        return response()->json(['success' => true, 'data' => $resorts]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProviders $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Resort $resort)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProviders $request, Resort $resort)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resort $resort)
    {
        //
    }
}
