<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceNewsletterRequest;
use App\Models\Service;
use App\Models\ServiceNewsletter;
use Illuminate\Http\Request;

class ServiceNewsletterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = ServiceNewsletter::with(["getService"])->latest()->paginate(10);

        return response()->json(['message' => "success", "data" => $services]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    public function formSubmit(ServiceNewsletterRequest $request)
    {
        $data = $request->validated();

        $serviceId = (Service::where("slug", $data['serviceSlug'])->first())['id'];
        $serviceNewsLetter = ServiceNewsletter::create([
            "service_id" => $serviceId,
            "form_data" => $data['formData'],
        ]);

        if ($serviceNewsLetter) {
            return response()->json(['message' => "Newsletter saved successfully!"], 201);
        } else {
            return response()->json(['message' => "Failed to save newsletter"], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $newsLetter = ServiceNewsletter::find($id);
        return response()->json(["message" => "success", "data" => $newsLetter]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceNewsletter $serviceNewsletter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ServiceNewsletter $serviceNewsletter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $newsletter = ServiceNewsletter::find($id);
        if (!$newsletter) {
            return response()->json(["message" => "Service Newsletter not found",], 422);
        }
        $newsletter->delete();

        return response()->json(['message' => "Service Newsletter delete successfully"], 200);
    }
}
