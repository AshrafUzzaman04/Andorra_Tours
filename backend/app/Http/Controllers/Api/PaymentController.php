<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\PaymentLinkSendEmail;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function sendPaymentLink($id)
    {
        $booking = Booking::where('id', $id)->with('customer')->first();
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }
        $link = env('FRONTEND_LINK')."booking-payment/".$booking->order_id;
        $data = [
            "name" => $booking->customer->name." ".$booking->customer->last_name,
            "bookingNumber" => $booking->order_id,
            "amount" => $booking->price,
            "payment_link" => $link
        ];
        Mail::to($booking->customer->email)->send(new PaymentLinkSendEmail($data));
        return response()->json(["success"=>true, "message" => "Payment link sent"],200);
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
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
