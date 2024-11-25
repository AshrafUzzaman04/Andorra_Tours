<?php

namespace App\Helpers;

use App\Models\Booking;

class WhatsAppMessage
{
    public static function buildOrderMessage($order)
    {
        return <<<EOD
    👉 New Order Received @ Tours Andorra I Actividades de Esqui, Snowboard en Andorra
    
    --------------------------------
    
    ⿪ Order number    : {$order['order_number']}
    🔆 Order Status    : {$order['status']}
    🗓 Date            : {$order['date']}
    📧 Email           : {$order['email']}
    💰 Total Amount    : {$order['total_amount']}
    
    🔍 Order details: 
    
    {$order['details']}
    
    --------------------------------
    
    Subtotal: {$order['subtotal']}
    Total: {$order['total']}
    
    --------------------------------
    
    Note:
    {$order['note']}
    
    --------------------------------
    
    🗒 Billing address:
    
    {$order['billing_name']}
    {$order['billing_address']}

    
    {$order['country']}
    {$order['email']}
    {$order['phone']}
    
    --------------------------------
    💳 Pay Now
    {$order['pay_now_link']}
    
    👁 View Order
    {$order['view_order_link']}
    EOD;
    }

    public static function buildWhatsAppLink($phone, $message)
    {
        $encodedMessage = urlencode($message); // URL encode the message
        return "https://api.whatsapp.com/send?phone={$phone}&text={$encodedMessage}";
    }
}
