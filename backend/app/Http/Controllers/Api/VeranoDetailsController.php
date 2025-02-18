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
        $veranoDetails = VeranoDetail::where("for", $detailsFor)->with([$detailsFor])->paginate(10);
        return response()->json(["success" => true, "data" => $veranoDetails], 200);
    }

    public function create()
    {
        $for = request()->get('for');
        if ($for == "verano") {
            $veranos = Verano::where("status", "Active")->get();
        } elseif ($for == "inverano") {
            $veranos = Inverano::where("status", "Active")->get();
        }
        return response()->json(["success" => true, "data" => $veranos], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // return response()->json(["errors" => $request->all()], 200);
        $step = $request->get("step");
        $data = $request->only(["pricing", "details", "form_title", "times", "service_title", "services", "add_extra_title", "add_extra", "status", "meta_title", "meta_tags", "meta_description"]);
        $data['for'] = $request->get("for");
        if ($step == 0) {
            // Step 0 validation
            $validation = Validator::make($request->all(), [
                "verano" => "required",
                "details" => "required|string",
                "status" => "nullable|string|in:Active,Inactive",
                "meta_title" => "required|string|max:255",
                "meta_description" => "required",
                "meta_tags" => "nullable",
            ]);

            if ($validation->fails()) {
                return response()->json(["errors" => $validation->errors()], 422);
            }

            // Merge validated step 0 data with the existing data
            if ($request->get("for") == "verano") {
                $data['verano_id'] = $request->verano;
            } elseif ($request->get("for") == "inverano") {
                $data['inverano_id'] = $request->verano;
            }
            // Return success, next step, and the accumulated data back to the frontend
            return response()->json(["success" => true, "step" => 1], 200);
        } elseif ($step == 1) {
            // Step 1 validation
            $validation = Validator::make($request->all(), [
                "pricing" => "nullable",
            ]);

            if ($validation->fails()) {
                return response()->json(["errors" => $validation->errors()], 422);
            }

            return response()->json(["success" => true, "step" => 2], 200);
        } elseif ($step == 2) {
            // Step 2 validation
            $validation = Validator::make($request->all(), [
                "form_title" => "nullable|string|max:255",
                "times" => "nullable|string",
                "service_title" => "nullable|string",
                "services" => "nullable|string",
                "add_extra_title" => "nullable|string",
                "add_extra" => "nullable|string",
            ]);

            if ($validation->fails()) {
                return response()->json(["errors" => $validation->errors()], 422);
            }

            // Merge validated step 2 data with the existing data
            if ($request->get("for") == "verano") {
                $data['verano_id'] = $request->verano;
            } elseif ($request->get("for") == "inverano") {
                $data['inverano_id'] = $request->verano;
            }

            VeranoDetail::create($data);
            return response()->json(["success" => true, "message" => "Activity details created", "step" => "done"], 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(VeranoDetail $veranoDetail, $veranoDeatil)
    {
        $for = request()->get('for');
        $veranoDetail = VeranoDetail::where("for", $for)->where("id", $veranoDeatil)->first();
        return response()->json(["success" => true, "data" => $veranoDetail], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VeranoDetail $veranoDetail, $veranoDetailId)
    {
        $veranoDetail = VeranoDetail::where("for", $request->get('for'))->where("id", $veranoDetailId)->first();

        if (!$veranoDetail) {
            return response()->json(['error' => 'Verano detail not found'], 404);
        }

        $step = $request->get("step");
        $data = $request->only(["pricing", "details", "form_title", "times", "service_title", "services", "add_extra_title", "add_extra", "status", "meta_title", "meta_tags", "meta_description"]);
        $data['for'] = $request->get("for");

        if ($step == 0) {
            $validation = Validator::make($request->all(), [
                "verano" => "required|exists:veranos,id",
                "details" => "required|string",
                "status" => "nullable|string|in:Active,Inactive",
                "meta_title" => "required|string|max:255",
                "meta_description" => "required",
                "meta_tags" => "nullable",
            ]);

            if ($validation->fails()) {
                return response()->json(["errors" => $validation->errors()], 422);
            }

            if ($request->get("for") == "verano") {
                $data['verano_id'] = $request->verano;
            } elseif ($request->get("for") == "inverano") {
                $data['inverano_id'] = $request->verano;
            }

            return response()->json(["success" => true, "step" => 1], 200);
        } elseif ($step == 1) {
            $validation = Validator::make($request->all(), [
                "pricing" => "nullable|string",
            ]);

            if ($validation->fails()) {
                return response()->json(["errors" => $validation->errors()], 422);
            }

            return response()->json(["success" => true, "step" => 2], 200);
        } elseif ($step == 2) {
            $validation = Validator::make($request->all(), [
                "form_title" => "nullable|string|max:255",
                "times" => "nullable|string",
                "service_title" => "nullable|string",
                "services" => "nullable|string",
                "add_extra_title" => "nullable|string",
                "add_extra" => "nullable|string",
            ]);

            if ($validation->fails()) {
                return response()->json(["errors" => $validation->errors()], 422);
            }

            if ($request->get("for") == "verano") {
                $data['verano_id'] = $request->verano;
            } elseif ($request->get("for") == "inverano") {
                $data['inverano_id'] = $request->verano;
            }
            $veranoDetail->update($data);

            return response()->json(["success" => true, "message" => "Activity details updated", "step" => "done", 'data' => $data], 200);
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $veranoDetail = VeranoDetail::where("id", $id)->first();

        if (!$veranoDetail) {
            return response()->json(['error' => 'Verano detail not found'], 404);
        }

        $veranoDetail->delete();
        return response()->json(["success" => true, "message" => "Activity details deleted"], 200);
    }
}
