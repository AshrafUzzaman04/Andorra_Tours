<?php

namespace App\Http\Controllers\Api;

use App\Helpers\WhatsAppMessage;
use App\Http\Controllers\Controller;
use App\Http\Requests\BookingStore;
use App\Mail\PaymentConfirmedMail;
use App\Models\Booking;
use App\Models\CompanyPromotion;
use App\Models\FooterDetails;
use App\Models\Header;
use App\Models\Multiple;
use App\Models\User;
use App\Models\VeranoDetail;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::with(['customer'])->latest()->paginate(10);
        return response()->json(['message' => "success", "data" => $bookings]);
    }

    public function searchBooking(Request $request)
    {
        $searchKey = $request->query('search'); // Get search keyword from query params

        $bookings = Booking::with(['customer'])
            ->whereHas('customer', function ($query) use ($searchKey) {
                $query->where('name', 'LIKE', "%{$searchKey}%") // Search by customer name
                    ->orWhere('email', 'LIKE', "%{$searchKey}%"); // Search by email
            })
            ->orWhere('order_id', 'LIKE', "%{$searchKey}%") // Search by booking reference
            ->orWhere('status', 'LIKE', "%{$searchKey}%") // Search by booking status
            ->latest()
            ->paginate(10);

        return response()->json(['message' => "success", "data" => $bookings]);
    }

    public function manualPaymentByAdmin(Request $request, int $id)
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json(["message" => "Booking not found"], 404);
        }

        if ($booking->status === "Paid") {
            return response()->json(["message" => "Booking is already paid"], 422);
        }

        $validatedData = $request->validate([
            "email" => "nullable|email",
            "note" => "nullable|string",
        ]);

        $manualEmail = $validatedData['email'] ?? null;
        $manualNote = $validatedData['note'] ?? null;

        $updated = $booking->update([
            "manualpayment_email" => $manualEmail,
            "manualpayment_note" => $manualNote,
            "status" => "Paid", // Ensure status is updated
        ]);

        $details = FooterDetails::where("id", 1)->first();
        $promotions = CompanyPromotion::where("content_for", "section_two")->first();
        $header = Header::where("id", 1)->first();


        $storagePath = public_path('storage/invoices');
        if (!file_exists($storagePath)) {
            mkdir($storagePath, 0777, true);
        }

        // Generate PDF and store it temporarily
        $pdf = Pdf::loadView('invoice', compact('booking', 'details', "promotions", "header"));
        $pdfFileName = "invoice_{$booking->id}_" . time() . ".pdf";
        $pdfFullPath = $storagePath . "/" . $pdfFileName;

        file_put_contents($pdfFullPath, $pdf->output());

        // Send email with PDF attachment
        $customerEmail = $booking->customer->email ?? null;
        $ownerEmail = env("OWNER_EMAIL") ?? null;
        if ($customerEmail) {
            Mail::to([$customerEmail, $ownerEmail])->send(new PaymentConfirmedMail($booking, $pdfFullPath, $details));
        }

        if ($updated) {
            return response()->json(['message' => "Booking Payment Successfully Updated"], 200);
        }

        return response()->json(["message" => "No changes detected"], 200);
    }

    public function downloadInvoice(int $id)
    {
        $booking = Booking::where("id", $id)->with("customer")->first();
        $details = FooterDetails::where("id", 1)->first();
        $promotions = CompanyPromotion::where("content_for", "section_two")->first();
        $header = Header::where("id", 1)->first();

        $pdf = Pdf::loadView('invoice', compact('booking', 'details', "promotions", "header"));
        return $pdf->download('invoice.pdf');
    }

    public function PriceByDay(Request $request)
    {
        $details = VeranoDetail::where('id', $request->id)
            ->where('for', $request->for)
            ->first();

        if ($details) {
            // Filter pricing to find the object that matches the specific day
            $priceDetail = collect(json_decode($details->pricing))->firstWhere('day', (string) $request->day);
            // Check if priceDetail exists
            if ($priceDetail) {
                return response()->json($priceDetail); // Return the matched price object
            } else {
                $data = ["day" => 1, "online_price" => 0, "shop_price" => 0];
                return response()->json($data);
            }
        } else {
            $data = ["day" => 1, "online_price" => 0, "shop_price" => 0];
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
            $priceDetail = collect(json_decode($product->pricing))->firstWhere('day', (string) $request->day);
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
        if ($user) {
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
                    return "⭐ {$service['title']} x {$service['quantity']} => " . number_format($service['price'] * $service['quantity'], 2, '.', '') . " €";
                })->implode("\n");
            })->implode("\n");
            $formattedTotalPrice = number_format($booking->price, 2, '.', '') . ' €';
            $formattedDiscountPrice = number_format($booking->discounted_price, 2, '.', '') . ' €';
            $formattedSubTotalPrice = number_format($booking->price + $booking->discounted_price, 2, '.', '') . ' €';
            $order = [
                'order_number' => $booking->order_id,
                'status' => "Processing",
                'date' => $todayDate,
                'email' => $user->email,
                'total_amount' => $formattedTotalPrice,
                'details' => $orderDetails,
                'subtotal' => $formattedSubTotalPrice,
                'discountPrice' => $formattedDiscountPrice,
                'total' => $formattedTotalPrice,
                'note' => $booking->order_note,
                'billing_name' => $user->name . " " . $user->last_name,
                'billing_address' => $user->address,
                'country' => $user->country,
                'phone' => $user->phone,
                'view_order_link' => env('FRONTEND_LINK') . 'booking-payment/' . $booking->order_id,
                // 'pay_now_link' => 'https://toursandorra.com/checkout/order-pay/9808/?pay_for_order=true&key=wc_order_Ufz6ryk5aYguh',
            ];
            $message = WhatsAppMessage::buildOrderMessage($order);
            $shopOwnerPhone = env("WHATS_APP_NUMBER");
            $whatsappLink = WhatsAppMessage::buildWhatsAppLink($shopOwnerPhone, $message);
            return response()->json([
                'message' => "Booking created successfully",
                "order_id" => (string) $booking->order_id,
                "whatsappLink" => $whatsappLink
            ], 200);

        } else {
            return response()->json(['message' => "Error creating booking"], 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        //booking not found
        if (!$booking)
            return response()->json(["message" => "Booking not found",], 422);
        $booking->load("customer:id,name,last_name,email,country,phone,address,company");
        return response()->json(["message" => "success", "data" => $booking], 200);
    }

    public function updateByOrderId(Request $request, $orderId)
    {
        $booking = Booking::where('order_id', $orderId)->first();
        if (!$booking)
            return response()->json(["message" => "Booking not found",], 422);
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
        if (!$booking)
            return response()->json(["message" => "Booking not found",], 422);
        $booking->status = "Cancelled";
        $booking->save();
        return response()->json(["message" => "Booking cancelled successfully",], 200);
    }

    public function getBookingsByOrderId($orderId)
    {
        $bookings = Booking::where('order_id', $orderId)->first();
        if (!$bookings)
            return response()->json(["message" => "No bookings found for this order",], 422);
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
        if (!$booking)
            return response()->json(["message" => "Booking not found",], 422);
        $booking->delete();
        return response()->json(["message" => "Booking deleted successfully",], 200);
    }
}
