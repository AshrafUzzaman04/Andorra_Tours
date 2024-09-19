<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePartners;
use App\Http\Requests\UpdatePartners;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PartnersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $partners = Partner::paginate(10);
        return response()->json(['success' => true, 'data' => $partners]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePartners $request)
    {
        $data = $request->validated();
        if($request->hasFile('partner_logo')){
            $uploadLink = "storage/".$request->partner_logo->store("partner_logo");
            $data['partner_logo'] = $uploadLink;
        }
        $partners = Partner::create($data);
        return response()->json(['success'=> true,'message'=> "Partner created successfully"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Partner $partner,$footer_partner)
    {
        $partner = Partner::find($footer_partner);
        return response()->json(['success' => true, 'data' => $partner],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePartners $request, Partner $partner,$footer_partner)
    {
        $data = $request->validated();
        $partner = Partner::find($footer_partner);
        if($request->hasFile('partner_logo')){
            if(!empty($partner->partner_logo)){
                $explode = explode("/",$partner->partner_logo);
                $path = $explode[1]."/".$explode[2];
                if(Storage::exists($path)){
                    Storage::delete($path);
                }
            }
            $uploadLink = "storage/".$request->partner_logo->store("partner_logo");
            $data['partner_logo'] = $uploadLink;
        }
        $partner->update($data);
        return response()->json(['success'=> true,'message'=> "Partner updated successfully"],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Partner $partner,$footer_partner)
    {
        $partner = Partner::find($footer_partner);
        if(!empty($partner->partner_logo)){
            $explode = explode("/",$partner->partner_logo);
            $path = $explode[1]."/".$explode[2];
            if(Storage::exists($path)){
                Storage::delete($path);
            }
        }
        $partner->delete();
        return response()->json(['success'=> true,'message'=> "Partner deleted successfully"],200);
    }
}
