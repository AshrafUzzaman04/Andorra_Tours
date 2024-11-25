<?php

namespace App\Helpers;

use App\Models\Booking;

class OrderIdGenerator
{
    public static function generateUniqueOrderId() {
        $maxAttempts = 100; // Optional: limit attempts to prevent infinite loop
        $attempts = 0;
    
        do {
            // Generate a random 6-digit number (from 100000 to 999999)
            $orderId = mt_rand(100000, 999999);
            // Check if the order ID already exists in the database
            // $exists = \DB::table('orders')->where('order_id', $orderId)->exists();
            $exists = Booking::where('order_id', $orderId)->exists();
            $attempts++;
            
            // Safety check to prevent an infinite loop in case of database issues
            if ($attempts > $maxAttempts) {
                throw new \Exception("Failed to generate a unique order ID after $maxAttempts attempts.");
            }
    
        } while ($exists); // Repeat if the ID already exists
    
        return $orderId;
    }
    
}