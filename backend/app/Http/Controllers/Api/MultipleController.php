<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProduct;
use App\Http\Requests\UpdateProduct;
use App\Models\CardCategory;
use App\Models\Inverano;
use App\Models\Multiple;
use App\Models\Verano;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MultipleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $detailsFor = request()->get("product_for");
        $products = Multiple::where("product_for", $detailsFor)->with(["$detailsFor:id,title"])->paginate(10);
        return response()->json(["success" => true, "data" => $products], 200);
    }

    public function create($for)
    {
        if ($for == "verano") {
            $veranos = Verano::where("type", "multiple")->get(["id", "title"]);
            return response()->json(['success' => true, 'data' => $veranos], 200);
        } elseif ($for == "inverano") {
            $inveranos = Inverano::where("type", "multiple")->get(["id", "title"]);
            return response()->json(['success' => true, 'data' => $inveranos], 200);
        }
        return response()->json(['success' => true, 'data' => []], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProduct $request)
    {
        $currentStep = $request->input('step');
        if ($currentStep != 2) {
            $nextStep = $currentStep + 1;
            return response()->json([
                'message' => 'Step ' . $currentStep . ' completed successfully.',
                'step' => $nextStep,
            ], 200);
        }
        $data = $request->only(["product_for", "title", "slug", "photos", "description", "pricing", "form_title", "service_title", "services", "extra_service_title", "extra_services", "status"]);
        $photosArray = [];
        if ($request->hasFile('photos')) {
            $files = $request->photos;
            if (is_array($files)) {
                foreach ($files as $file) {
                    $path = "storage/" . $file->store("products");
                    $photosArray[] = $path;
                }
            }
        }
        if ($request->inverano) {
            $data["inverano_id"] = $request->inverano;
        }
        if (!empty($request->verano)) {
            $data["verano_id"] = $request->verano;
        }
        $data["photos"] = json_encode($photosArray);
        Multiple::create($data);
        return response()->json(["success" => true, "message" => "Product created successfully", "step" => "done"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Multiple $multiple)
    {
        if (!$multiple) {
            return response()->json(["success" => false, "message" => "Product not found"], 422);
        }
        return response()->json(["success" => true, "data" => $multiple], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProduct $request, Multiple $multiple)
    {
        
        $currentStep = $request->input('step');
        if ($currentStep != 2) {
            $nextStep = $currentStep + 1;
            return response()->json([
                'step' => $nextStep,
            ], 200);
        }
        $data = $request->only(["product_for", "title", "slug", "photos", "description", "pricing", "form_title", "service_title", "services", "extra_service_title", "extra_services", "status"]);
        $newPhotos = [];
        $existingPhotos = json_decode($multiple->photos, true) ?? [];

        if ($request->hasFile('photos')) {
            $files = $request->photos;
            if (is_array($files)) {
                foreach ($files as $file) {
                    $path = "storage/" . $file->store("products");
                    $newPhotos[] = $path;
                }
            }else{
                $path = "storage/" . $request->photos->store("products");
                $newPhotos[] = $path;
            }
        }

        if ($request->has('remove_photos')) {
            $removePhotos = explode(",",$request->input('remove_photos')) ?? [];
            foreach ($removePhotos as $photoPath) {
                $explode = explode('/', $photoPath);
                $deletePath = $explode[1] . "/" . $explode[2];
                if (Storage::exists($deletePath)) {
                    Storage::delete($deletePath);
                }
                $existingPhotos = array_filter($existingPhotos, function ($value) use ($photoPath) {
                    return $value !== $photoPath;
                });
            }
        }

        $data['photos'] = array_merge($existingPhotos, $newPhotos);
        if ($request->filled('verano') && $request->verano !== "null") {
            $data["verano_id"] = $request->verano;
        }
        if ($request->filled('inverano')) {
            $data["inverano_id"] = $request->inverano;
        }
        $multiple->update($data);
        return response()->json([
            "success" => true,
            "message" => "Product updated successfully",
            "step" => "done"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Multiple $multiple)
    {
        if (!$multiple) {
            return response()->json(["success" => false, "message" => "Product not found"], 422);
        }
        if ($multiple->photos) {
            foreach (json_decode($multiple->photos) as $photoPath) {
                $explode = explode('/', $photoPath);
                $deletePath = $explode[1] . "/" . $explode[2];
                if (Storage::exists($deletePath)) {
                    Storage::delete($deletePath);
                }
            }
        }
        $multiple->delete();
        return response()->json(["success" => true, "message" => "Product deleted successfully"], 200);
    }
}
