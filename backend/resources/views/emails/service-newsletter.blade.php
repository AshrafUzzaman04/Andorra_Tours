<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Newsletter Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007bff;
            color: #ffffff;
            text-align: center;
            padding: 15px;
            font-size: 20px;
            font-weight: bold;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        .footer {
            text-align: center;
            padding: 15px;
            font-size: 12px;
            color: #777;
        }
        .button {
            display: inline-block;
            padding: 10px 15px;
            margin-top: 10px;
            background-color: #28a745;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 14px;
        }
        .button:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        📩 New Newsletter Submission Received
    </div>

    <div class="content">
        <p>Hello,</p>
        <p>A new newsletter has been submitted. Here are the details:</p>


        @foreach($formData as $index => $data)
            <h3 style="margin-top:20px;">Step {{ $index + 1 }}</h3>
            <table>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                @foreach($data as $key => $value)
                    <tr>
                        <td>{{ ucfirst(str_replace('_', ' ', $key)) }}</td>
                        <td>{{ $value }}</td>
                    </tr>
                @endforeach
            </table>
        @endforeach

        <p style="margin-top:20px;">📌 **Next Steps:** Please review this submission and take necessary action.</p>

        <a href="{{ env('BACKEND_LINK') . 'service-newsletter'  }}" class="button">View All Submissions</a>
    </div>
</div>

</body>
</html>
