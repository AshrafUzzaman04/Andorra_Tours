<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inverano;
use App\Models\Verano;
use App\Models\VeranoDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VeranoDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $detailsFor = request()->get("for");
        $veranoDetails = VeranoDetail::where("for",$detailsFor)->with(["verano"])->paginate(10);
        return response()->json(["success" => true, "data" => $veranoDetails], 200);
    }

    public function create()
    {
        $for = request()->get('for');
        if($for == "verano"){
            $veranos = Verano::where("status", "Active")->get();
        }elseif($for == "inverano"){
            $veranos = Inverano::where("status", "Active")->get();
        }
        return response()->json(["success" => true, "data" => $veranos], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $step = $request->get("step");
        $data = $request->input('data', []);

        if ($step == 0) {
            // Step 0 validation
            $validation = Validator::make($request->all(), [
                "verano" => "required",
                "duration" => "required|string|max:255",
                "duration_title" => "required|string|max:255",
                "group_size" => "required|string|max:255",
                "group_size_title" => "required|string|max:255",
                "tour_type" => "required|string|max:255",
                "tour_type_title" => "required|string|max:255",
                "language" => "required|string|max:255",
                "language_title" => "required|string|max:255",
                "details" => "required|string",
                "status" => "nullable|string|in:Active,Inactive",
            ]);
        
            if ($validation->fails()) {
                return response()->json(["errors" => $validation->errors()], 422);
            }
        
            // Merge validated step 0 data with the existing data
            $data['verano_id'] = $request->verano;
            $data = array_merge($data, $validation->valid());
        
            // Return success, next step, and the accumulated data back to the frontend
            return response()->json(["success" => true, "step" => 1], 200);
        
        } elseif ($step == 1) {
            // Step 1 validation
            $validation = Validator::make($request->all(), [
                "question_title" => "required|string|max:255",
                "answers" => "required|string",
            ]);
        
            if ($validation->fails()) {
                return response()->json(["errors" => $validation->errors()], 422);
            }
        
            // Merge validated step 1 data with the existing data
            $data = array_merge($data, $validation->valid());
        
            // Return success, next step, and the accumulated data back to the frontend
            return response()->json(["success" => true, "step" => 2], 200);
        
        } elseif ($step == 2) {
            // Step 2 validation
            $validation = Validator::make($request->all(), [
                "form_title" => "nullable|string|max:255",
                "times" => "required|string",
                "service_title" => "required|string",
                "services" => "required|string",
                "add_extra_title" => "required|string",
                "add_extra" => "required|string",
            ]);
        
            if ($validation->fails()) {
                return response()->json(["errors" => $validation->errors()], 422);
            }
        
            // Merge validated step 2 data with the existing data
            $data['verano_id'] = $request->verano;
            $data = array_merge($data, $validation->valid());
        
            // Save the accumulated data to the database
            VeranoDetail::create($data);
        
            // Final success response
            return response()->json(["success" => true, "message" => "Activity details created", "step" => "done"], 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(VeranoDetail $veranoDetail, $veranoDeatil)
    {
        $for = request()->get('for');
        $veranoDetail = VeranoDetail::where("for",$for)->where("id", $veranoDeatil)->first();
        return response()->json(["success" => true, "data" => $veranoDetail], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VeranoDetail $veranoDetail,$veranoDeatil)
    {
        $veranoDetail = VeranoDetail::where("for",$request->get('for'))->where("id", $veranoDeatil)->first();
        $step = $request->get("step");
        $data = $request->input('data', []);
        $data['for'] = $request->get("for");
        if ($step == 0) {
            // Step 0 validation
            $validation = Validator::make($request->all(), [
                "verano" => "required",
                "duration" => "required|string|max:255",
                "duration_title" => "required|string|max:255",
                "group_size" => "required|string|max:255",
                "group_size_title" => "required|string|max:255",
                "tour_type" => "required|string|max:255",
                "tour_type_title" => "required|string|max:255",
                "language" => "required|string|max:255",
                "language_title" => "required|string|max:255",
                "details" => "required|string",
                "status" => "nullable|string|in:Active,Inactive",
            ]);
        
            if ($validation->fails()) {
                return response()->json(["errors" => $validation->errors()], 422);
            }
        
            // Merge validated step 0 data with the existing data
            $data['verano_id'] = $request->verano;
            $data = array_merge($data, $validation->valid());
        
            // Return success, next step, and the accumulated data back to the frontend
            return response()->json(["success" => true, "step" => 1], 200);
        
        } elseif ($step == 1) {
            // Step 1 validation
            $validation = Validator::make($request->all(), [
                "question_title" => "required|string|max:255",
                "answers" => "required|string",
            ]);
        
            if ($validation->fails()) {
                return response()->json(["errors" => $validation->errors()], 422);
            }
        
            // Merge validated step 1 data with the existing data
            $data = array_merge($data, $validation->valid());
        
            // Return success, next step, and the accumulated data back to the frontend
            return response()->json(["success" => true, "step" => 2], 200);
        
        } elseif ($step == 2) {
            // Step 2 validation
            $validation = Validator::make($request->all(), [
                "form_title" => "nullable|string|max:255",
                "times" => "required|string",
                "service_title" => "required|string",
                "services" => "required|string",
                "add_extra_title" => "required|string",
                "add_extra" => "required|string",
            ]);
        
            if ($validation->fails()) {
                return response()->json(["errors" => $validation->errors()], 422);
            }
        
            // Merge validated step 2 data with the existing data
            $data['verano_id'] = $request->verano;
            $data = array_merge($data, $validation->valid());
            // Save the accumulated data to the database
            $veranoDetail->update($data);
            // Final success response
            return response()->json(["success" => true, "message" => "Activity details updated","step" => "done"], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VeranoDetail $veranoDetail,$veranoDeatil)
    {
        $for = request()->get('for');
        $veranoDetail = VeranoDetail::where("for",$for)->where("id", $veranoDeatil)->first();
        $veranoDetail->delete();
        return response()->json(["success" => true, "message" => "Activity details deleted"], 200);
    }
}
