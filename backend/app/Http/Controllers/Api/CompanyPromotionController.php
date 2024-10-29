<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateCompanyPromotion;
use App\Models\CompanyPromotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyPromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companyPromotions = CompanyPromotion::with([])->get();
        return response()->json(["message" => "success", "data" => $companyPromotions], 200);
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
    public function show($company_promotion)
    {
        $companyPromotion = CompanyPromotion::where('content_for', $company_promotion)->first();

        if ($companyPromotion) {
            $filteredData = array_filter($companyPromotion->toArray(), function ($value) {
                return !is_null($value) && $value !== 'null';
            });
            
            return response()->json(["message" => "success", "data" => $filteredData], 200);
        } else {
            return response()->json(["message" => "Company promotion not found"], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyPromotion $request, CompanyPromotion $companyPromotion)
    {
        //if the data not found
        if (!$companyPromotion) return response()->json(["message" => "Company Promotion not found"], 422);
        $data = $request->validated();
        if($request->hasFile('image')){
            if(!empty($companyPromotion->image)){
                $oldpath = str_replace("storage/","",$companyPromotion->image);
                if(Storage::exists($oldpath)){
                    Storage::delete($oldpath);
                }
            }
            $data['image'] = "storage/". $request->file('image')->store('company_promotion');
        }
        $companyPromotion->update($data);
        return response()->json(["success" => true, "message" => "Updated successfully"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CompanyPromotion $companyPromotion)
    {
        //
    }
}
