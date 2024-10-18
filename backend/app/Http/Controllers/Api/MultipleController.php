<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CardCategory;
use App\Models\Inverano;
use App\Models\Multiple;
use App\Models\Verano;
use Illuminate\Http\Request;

class MultipleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function create($for)
    {
        if($for == "verano"){
            $veranos = Verano::where("type", "multiple")->get(["id","title"]);
            return response()->json(['success' => true, 'data' => $veranos],200);
        }elseif($for == "inverano"){
            $inveranos = Inverano::where("type", "multiple")->get(["id","title"]);
            return response()->json(['success' => true, 'data' => $inveranos],200);
        }
        return response()->json(['success' => true, 'data' => []],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Multiple $multiple)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Multiple $multiple)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Multiple $multiple)
    {
        //
    }
}
