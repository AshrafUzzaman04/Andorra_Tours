<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSocialLink;
use App\Http\Requests\UpdateSocialLink;
use App\Models\SocialLink;
use Illuminate\Http\Request;

class SocialLinksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $socialLinks = SocialLink::paginate(10);
        return response()->json(['success' => true, 'data' => $socialLinks]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSocialLink $request)
    {
        $data = $request->validated();
        $socialLink = SocialLink::create($data);
        return response()->json(['success'=> true, 'message' => 'Social link created successfully'],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(SocialLink $socialLink,$footer_social_link)
    {
        $socialLink = SocialLink::find($footer_social_link);
        return response()->json(['success' => true, 'data' => $socialLink]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSocialLink $request, SocialLink $socialLink,$footer_social_link)
    {
        $data = $request->validated();
        $socialLink = SocialLink::find($footer_social_link);
        $socialLink->update($data);
        return response()->json(['success'=> true, 'message' => 'Social link updated successfully'],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SocialLink $socialLink,$footer_social_link)
    {
        $socialLink = SocialLink::find($footer_social_link);
        $socialLink->delete();
        return response()->json(['success'=> true, 'message' => 'Social link deleted successfully'],200);
    }
}
