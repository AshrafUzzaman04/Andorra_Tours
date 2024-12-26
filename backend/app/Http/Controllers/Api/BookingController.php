<?php

namespace App\Http\Controllers\Api;

use App\Helpers\WhatsAppMessage;
use App\Http\Controllers\Controller;
use App\Http\Requests\BookingStore;
use App\Models\Booking;
use App\Models\Multiple;
use App\Models\User;
use App\Models\VeranoDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::with(['customer'])->paginate(10);
        return response()->json(['message' => "success", "data" => $bookings]);
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
    public function store(BookingStore $request)
    {
        $data = $request->validated();
        $user = User::updateOrCreate(
            ['email' => $data['email']], // Condition to find the user
            [
                'name' => $data['name'],
                'last_name' => $data['last_name'],
                'phone' => $data['phone'],
                'company' => $data['company'],
                'country' => $data['country'],
                'address' => $data['address'],
                'user_type' => 'normal',
                'password' => Hash::make($data['email']) // Set the password
            ]
        );
        if($user){
            $data['user_id'] = $user->id;
            $booking = Booking::create($data);
            // Set locale to Spanish
            Carbon::setLocale('es');
            // Format the date
            $todayDate = Carbon::now()->translatedFormat('F j, Y');
            $products = json_decode($booking->products, true); // Decode the JSON from the `products` column
            // Build the order details dynamically
            $orderDetails = collect($products)->map(function ($product) {
                return collect($product['services'])->map(function ($service) {
                    return "⭐ {$service['title']} x {$service['quantity']} => €" . number_format($service['price'] * $service['quantity'], 2, '.', '') . " EUR";
                })->implode("\n");
            })->implode("\n");
            $formattedPrice = '€' . number_format($booking->price, 2, '.', '') . ' EUR';
            $order = [
                'order_number' => $booking->order_id,
                'status' => "Processing",
                'date' => $todayDate,
                'email' => $user->email,
                'total_amount' => $formattedPrice,
                'details' => $orderDetails,
                'subtotal' => $formattedPrice,
                'total' => $formattedPrice,
                'note' => $booking->order_note,
                'billing_name' => $user->name." ".$user->last_name,
                'billing_address' => $user->address,
                'country' => $user->country,
                'phone' => $user->phone,
                'pay_now_link' => 'https://toursandorra.com/checkout/order-pay/9808/?pay_for_order=true&key=wc_order_Ufz6ryk5aYguh',
                'view_order_link' => 'https://toursandorra.com/my-account/view-order/9808/',
            ];
            $message = WhatsAppMessage::buildOrderMessage($order);
            $shopOwnerPhone = env("WHATS_APP_NUMBER");
            $whatsappLink = WhatsAppMessage::buildWhatsAppLink($shopOwnerPhone,$message);
            return response()->json([
                'message' => "Booking created successfully", 
                "order_id" => (string)$booking->order_id,
                "whatsappLink" => $whatsappLink
            ], 200);
                
        }else{
            return response()->json(['message' => "Error creating booking"], 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        //booking not found
        if (!$booking) return response()->json(["message" => "Booking not found",], 422);
        $booking->load("customer:id,name,last_name,email,country,phone,address,company");
        return response()->json(["message" => "success", "data" => $booking], 200);
    }

    public function updateByOrderId(Request $request, $orderId)
    {
        $booking = Booking::where('order_id', $orderId)->first();
        if (!$booking) return response()->json(["message" => "Booking not found",], 422);
        $booking->status = $request->status;
        $booking->save();
        return response()->json(["message" => "Booking updated successfully",], 200);
    }

    public function notification(Request $request)
    {
        $message = $request->all();
        if (isset($message['Ds_MerchantParameters'])) {
            $decode = json_decode(base64_decode($message['Ds_MerchantParameters']), true);
            $date = urldecode($decode['Ds_Date']);
            $hour = urldecode($decode['Ds_Hour']);
            $response = urldecode($decode['Ds_Response']);
            $decode['Ds_Date'] = $date;
            $decode['Ds_Hour'] = $hour;
            $decode['Ds_order'] = urldecode($decode['Ds_Order']);
            if ($response === '0000') {
                if ($decode['Ds_order']) {
                    $booking = Booking::where('order_id', $decode['Ds_order'])->first();
                    $booking->status = "Paid";
                    $booking->save();
                }
            } else {
                if (isset($message['Ds_MerchantParameters'])) {
                    $decode = json_decode(base64_decode($message['Ds_MerchantParameters']), true);
                    $date = urldecode($decode['Ds_Date']);
                    $hour = urldecode($decode['Ds_Hour']);
                    $decode['Ds_Date'] = $date;
                    $decode['Ds_Hour'] = $hour;
                    $decode['Ds_order'] = urldecode($decode['Ds_Order']);
                    if ($decode['Ds_order']) {
                        $booking = Booking::where('order_id', $decode['Ds_order'])->first();
                        $booking->status = "Cancelled";
                        $booking->save();
                    }
                }
            }
        }

        return response()->json(['status' => 'success']);
    }

    public function cancelBooking($id)
    {
        $booking = Booking::find($id);
        if (!$booking) return response()->json(["message" => "Booking not found",], 422);
        $booking->status = "Cancelled";
        $booking->save();
        return response()->json(["message" => "Booking cancelled successfully",], 200);
    }

    public function getBookingsByOrderId($orderId)
    {
        $bookings = Booking::where('order_id', $orderId)->get();
        if (!$bookings) return response()->json(["message" => "No bookings found for this order",], 422);
        return response()->json(["message" => "success", "data" => $bookings], 200);
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
        //booking is not found
        if (!$booking) return response()->json(["message" => "Booking not found",], 422);
        $booking->delete();
        return response()->json(["message" => "Booking deleted successfully",], 200);
    }
}
