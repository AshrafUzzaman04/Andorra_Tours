<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FormBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FormBuilderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            "service_id" => "required|exists:services,id|unique:form_builders,service_id",
            "form" => "required|string",
        ]);
    
        if ($validation->fails()) {
            return response()->json(["errors" => $validation->errors()], 422);
        }

        $data = $validation->valid();
        FormBuilder::create($data);
        return response()->json(["success" => true, "message"=>"Form created successfully"], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(FormBuilder $formBuilder,$form)
    {
        $formBuilder = FormBuilder::where("service_id",$form)->first();
        return response()->json(["success" => true, "data"=> $formBuilder], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FormBuilder $formBuilder,$form)
    {
        $formBuilder = FormBuilder::where("service_id",$form)->first();
        $validation = Validator::make($request->all(), [
            "service_id" => "required|exists:services,id",
            "form" => "required|string",
        ]);
    
        if ($validation->fails()) {
            return response()->json(["errors" => $validation->errors(),"data"=>$formBuilder], 422);
        }

        $data = $validation->valid();
        $formBuilder->update($data);
        return response()->json(["success" => true, "message"=>"Form updated successfully"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FormBuilder $formBuilder,$form)
    {
        $formBuilder = FormBuilder::where("service_id",$form)->first();
        $formBuilder->delete();
        return response()->json(["success" => true, "message"=>"Form deleted successfully"], 200);
    }
}
