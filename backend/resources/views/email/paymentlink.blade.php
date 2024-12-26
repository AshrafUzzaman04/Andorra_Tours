<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete Your Payment</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; color: #333333;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 40px 30px; background-color: #4F46E5; text-align: center;">
                <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Complete Your Payment</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px;">
                <p style="margin-bottom: 20px;">Dear {{ $data['name'] }},</p>
                <p style="margin-bottom: 20px;">Thank you for your booking. To complete your reservation, please proceed with the payment for your order.</p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto;">
                    <tr>
                        <td style="border-radius: 4px; background-color: #4F46E5; text-align: center; padding: 10px 20px;">
                            <a href="{{ $data['payment_link'] }}" style="color: #ffffff; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px;">Pay {{ number_format($data['amount'], 2) . '€' }} Now</a>
                        </td>
                    </tr>
                </table>
                <p style="margin-top: 30px; margin-bottom: 10px;">Booking details:</p>
                <ul style="padding-left: 20px; margin-bottom: 20px;">
                    <li>Booking number: #{{ $data['bookingNumber'] }}</li>
                    <li>Amount due: {{ number_format($data['amount'], 2) . '€' }}</li>
                </ul>
                <p style="margin-bottom: 10px;">If the button above doesn't work, please copy and paste the following link into your browser:</p>
                <p style="margin-bottom: 30px; word-break: break-all;"><a href="{{ $data['payment_link'] }}" style="color: #4F46E5;">{{ $data['payment_link'] }}</a></p>
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
                <p style="font-size: 14px; color: #666666; margin-bottom: 10px;">If you have any questions, please don't hesitate to contact our customer support team.</p>
                <p style="font-size: 14px; color: #666666; margin-bottom: 0;">Best regards,<br>Tours Andorra</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px 30px; background-color: #f8f8f8; text-align: center; font-size: 12px; color: #666666;">
                <p style="margin: 0;">&copy; {{ date('Y') }} Tours Andorra. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html>

