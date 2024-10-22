<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Multiple;
use App\Models\VeranoDetail;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function PriceByDay(Request $request)
    {
        $details = VeranoDetail::where('id', $request->id)
            ->where('for', $request->for)
            ->first();

        if ($details) {
            // Filter pricing to find the object that matches the specific day
            $priceDetail = collect(json_decode($details->pricing))->firstWhere('day', (string)$request->day);
            // Check if priceDetail exists
            if ($priceDetail) {
                return response()->json($priceDetail); // Return the matched price object
            } else {
                $data = ["day"=>1, "online_price" => 0, "shop_price" => 0];
                return response()->json($data);
            }
        } else {
            $data = ["day"=>1, "online_price" => 0, "shop_price" => 0];
            return response()->json($data);
        }
    }

    public function ProductPriceByDay(Request $request)
    {
        $product = Multiple::where('id', $request->id)
            ->where('product_for', $request->for)
            ->first();

        if ($product) {
            // Filter pricing to find the object that matches the specific day
            $priceDetail = collect(json_decode($product->pricing))->firstWhere('day', (string)$request->day);
            if ($priceDetail) {
                return response()->json($priceDetail); // Return the matched price object
            } else {
                return response()->json(['message' => 'Price not found for the specified day'], 404);
            }
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
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
    public function show(Booking $booking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        //
    }
}
