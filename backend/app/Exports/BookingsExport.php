<?php

namespace App\Exports;

use App\Models\Booking;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BookingsExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Booking::all()->flatMap(function ($booking) {
            $products = json_decode($booking->products, true);

            return collect($products)->map(function ($product) use ($booking) {
                $services = collect($product['services'])->map(fn($s) => "{$s['title']} ({$s['quantity']}x)")->implode(", ");

                $extraServices = collect($product['extra_services'])
                    ->map(fn($e) => $e['title'] . ($e['quantity'] ?? false ? " ({$e['quantity']}x)" : ""))
                    ->implode(", ");

                return [
                    'Order ID' => $booking->order_id,
                    'Product Title' => $product['title'],
                    'Product Price' => $product['price'],
                    'Coupon Id' => $booking->coupon_id ?? "None",
                    'Discount Amount' => $booking->discounted_price ?? "None",
                    'Quantity' => $product['quantity'],
                    'Services' => $services ?: 'None',
                    'Extra Services' => $extraServices ?: 'None',
                    'Start Date' => $product['startDate'],
                    'End Date' => $product['endDate'] ?? 'N/A',
                    'Status' => $booking->status,
                    'Created At' => $booking->created_at,
                ];
            });
        });
    }

    public function headings(): array
    {
        return [
            'Order ID',
            'Product Title',
            'Product Price',
            'Coupon Id',
            'Discount Amount',
            'Quantity',
            'Services',
            'Extra Services',
            'Start Date',
            'End Date',
            'Status',
            'Created At',
        ];
    }
}
