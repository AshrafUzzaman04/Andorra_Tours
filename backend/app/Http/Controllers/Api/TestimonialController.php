<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTestimonial;
use App\Http\Requests\UpdateTestimonial;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonials = Testimonial::with([])->paginate(10);
        return response()->json(['success' => true, 'data' => $testimonials]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTestimonial $request)
    {
        $data = $request->validated();
        if($request->hasFile('client_photo')){
            $image = "storage/".$request->client_photo->store('testimonial');
            $data['client_photo'] = $image;
        }
        Testimonial::create($data);
        return response()->json(['success' => true, 'message' => 'Testimonial created successfully'],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Testimonial $testimonial)
    {
        return response()->json(['success'=> true, 'data' => $testimonial]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTestimonial $request, Testimonial $testimonial)
    {
        $data = $request->validated();
        if($request->hasFile('client_photo')){
            if(!empty($testimonial->client_photo)){
                $explode = explode("/", $testimonial->client_photo);
                $imagePath = $explode[1]."/".$explode[2];
                if(Storage::exists($imagePath)){
                    Storage::delete($imagePath);
                }
            }
            $image = "storage/".$request->client_photo->store('testimonial');
            $data['client_photo'] = $image;
        }
        $testimonial->update($data);
        return response()->json(['success' => true, 'message' => 'Testimonial updated successfully'],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testimonial $testimonial)
    {
        if(!empty($testimonial->client_photo)){
            $explode = explode("/", $testimonial->client_photo);
            $imagePath = $explode[1]."/".$explode[2];
            if(Storage::exists($imagePath)){
                Storage::delete($imagePath);
            }
        }
        $testimonial->delete();
        return response()->json(['success' => true, 'message' => 'Testimonial deleted successfully'],200);
    }
}
