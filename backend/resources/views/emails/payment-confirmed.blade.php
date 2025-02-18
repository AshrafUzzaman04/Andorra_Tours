<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 10px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #27ae60;
            text-align: center;
        }

        .content {
            padding: 10px;
            color: #333;
            font-size: 16px;
        }

        .summary {
            background: #f2f2f2;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
        }

        .summary p {
            margin: 5px 0;
        }

        .summary strong {
            color: #333;
        }

        .products {
            margin-top: 15px;
            padding: 10px;
            border-radius: 6px;
            background: #eef9f0;
        }

        .products h3 {
            color: #2c3e50;
        }

        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #777;
        }

        .button {
            display: inline-block;
            background: #27ae60;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 10px;
            font-weight: bold;
        }

        @media screen and (max-width: 600px) {
            .container {
                width: 90%;
            }
        }
    </style>
</head>

<body>

    <div class="container">
        <!-- Payment Confirmation Message -->
        <h2>🎉 Payment Successful!</h2>

        <div class="content">
            <p>Hello <strong>{{ $booking->customer->name }}</strong>,</p>
            <p>We are delighted to inform you that your payment for <strong>Order ID #{{ $booking->order_id }}</strong>
                has been successfully processed.</p>

            <!-- Booking Summary -->
            <div class="summary">
                <p><strong>📅 Date:</strong> {{ $booking->updated_at->format('d M, Y') }}</p>
                <p><strong>💰 Sub Total:</strong> {{ $booking->price + $booking->discounted_price }} €</p>
                <p><strong>🎁 Discount:</strong> {{ $booking->discounted_price ?? '0' }} €</p>
                <p><strong>💰 Total:</strong> {{ $booking->price }} €</p>
                <p><strong>✅ Amount Paid:</strong> {{ $booking->price }} €</p>
                <p><strong>✅ Status:</strong> Paid</p>
                <p><strong>📄 Invoice Attached:</strong> ✅</p>
            </div>

            <!-- Products & Services -->
            <h3>🛒 Equipment & Services</h3>
            <div class="products">
                @php
                    $products = is_array($booking->products)
                        ? $booking->products
                        : json_decode($booking->products, true);
                @endphp

                @foreach ($products as $product)
                    <p><strong>📦 {{ $product['title'] ?? 'N/A' }}</strong></p>
                    @if (!empty($product['services']))
                        <p><strong>🔹 Services:</strong></p>
                        <ul>
                            @foreach ($product['services'] as $service)
                                @if ($service['title'])
                                    <li>{{ $service['title'] ?? '' }} (x{{ $service['quantity'] ?? '1' }})</li>
                                @endif
                            @endforeach
                        </ul>
                    @endif
                    @if ($product['extra_services'])
                        <p><strong>🔹 Shop Location:</strong></p>
                        <ul>
                            @foreach ($product['extra_services'] as $extra)
                                @if ($extra['title'])
                                    <li>{{ $extra['title'] }}</li>
                                @endif
                            @endforeach
                        </ul>
                    @endif
                    <p><strong>💵 Total Price:</strong> {{ $product['price'] ?? '0' }} €</p>
                    <hr>
                @endforeach
            </div>

            @if ($details->email)
                <!-- Contact Information -->
                <p>If you have any questions, feel free to <a href="mailto:{{ $details->email }}">contact us</a>.</p>
            @endif
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Thanks,</p>
            <p><strong>{{ config('app.name') }}</strong></p>
            <p>📞 Support: {{ $details->help_number }} | ✉️ <a
                    href="mailto:{{ $details->email }}">{{ $details->email }}</a></p>
        </div>
    </div>

</body>

</html>
