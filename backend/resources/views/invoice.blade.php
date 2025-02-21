<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{{ config('app.name', 'APP') }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: #fff;
            font-family: Arial, Helvetica, sans-serif;
            /* font-weight: 400; */
        }

        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 0 40px !important;
        }

        .text-center {
            text-align: center;
        }

        .text-start,
        .text-left {
            text-align: left;
        }

        .text-end,
        .text-right {
            text-align: right;
        }

        .p-td {
            padding: 4px;
        }

        th,
        td {
            text-align: center;
            border: 1px solid black;
            border-collapse: collapse;
        }

        .border-none {
            border: none;
        }

        .bg-warning {
            background-color: #F7C650;
        }

        .invoice-container {
            width: 100%;
            margin: 0;
        }

        .border-top {
            border-top: 2px solid #000;
        }

        .btn {
            border: none;
            border-radius: 4px;
            padding: 4px 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
        }

        .bg-success {
            background-color: #5cb85c;
            color: #fff;
        }

        .bg-secondary {
            background-color: #6b6b6b;
            color: #fff;
        }


        .bg-danger {
            color: #fff;
            background-color: rgb(255, 56, 56);
        }

        .bg-dark {
            color: #fff;
            background-color: #000;
        }

        .list-unstyled {
            list-style: none;
        }

        .invoice-details {
            /* display: flex;
            justify-content: space-between;
            align-items: center; */
            /* gap: 20px; */
        }

        .logo {
            color: #3a436b;
            margin: 0;
            width: max-content;
            display: flex;
            align-items: center;
            justify-content: start;
            font-size: 20px;
            font-weight: 600;
            text-transform: uppercase;
        }

        @media screen and (max-width: 767px) {
            .logo {
                color: #000;
                margin: 0;
                padding: 0;
                background-color: transparent;
            }
        }

        .invoice-container>.invoice-table {
            width: 100%;
            margin: 0;
            padding: 0;
        }

        .thead {
            background-color: #3a436b;
            color: #fff;
        }

        @media screen and (max-width: 767px) {
            .invoice-container>.contact {
                display: flex;
                flex-direction: column;
                gap: 5px;
                justify-content: center !important;
                text-align: center;
            }
        }

        .invoice-container>.footer-style {
            margin-top: 25px;
            background-color: #3a3a3a;
            height: 24px;
            position: relative;
            width: 80%;
        }

        .invoice-container>.footer-style::before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(16px, 2px) rotate(22deg);
            height: 28px;
            width: 24px;
            background-color: #fff;
        }


        .bill_details,
        .bill_time {
            padding-top: 20px;
        }

        .signature_section {
            padding-top: 100px;
        }

        @media print {
            .invoice-container {
                max-width: unset;
                box-shadow: none;
                border: 0;
                background-color: #fff;
                height: 100%;
                width: 100%;
                position: fixed;
                top: 0;
                left: 0;
                margin: 0;
                padding: 15px;
            }

            .bill_details,
            .bill_time {
                padding-top: 20px;
            }

            .signature_section {
                padding-top: 80px;
            }

            .logo {
                color: #000;
                margin: 0;
                padding: 0;
                background-color: #3a3a3a;
            }
        }

        .text-black {
            color: #000;
        }



        /* second page */
        .page-break {
            page-break-after: always;
        }

        .pdf-second .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .pdf-second .title-blue {
            color: #3866af !important;
            font-size: 22px;
            font-weight: 900;
            margin: 0;
        }


        .pdf-second .title-large {
            font-size: 38px;
            margin: 5px 5px 15px 5px !important;
        }


        .pdf-second .title-dark {
            color: #27292eb2;
        }


        .pdf-second .title-blue-text {
            color: #3866af;
        }


        .pdf-second .activities-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }



        .pdf-second .activities-table td {
            width: 50%;
            padding: 15px 30px;
        }


        .pdf-second .activity-card {
            position: relative;
            width: 100%;
            height: 170px;
            overflow: hidden;
            border-radius: 0 26px;
        }

        .pdf-second .activity-card a {
            /* min-height: 170px;
            min-width: max-content;
            max-height: 170px;
            max-width: max-content;
            position: absolute;
            content: "";
            top: 0px;
            left: 0px; */
            position: absolute;
            content: "";
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }


        .pdf-second .activity-card img {
            /* min-width: 100%;
            min-height: 100%;
            max-width: 100%;
            max-height: 100%;
            object-fit: cover; */
            height: 170px;
            width: 100%;
        }


        .pdf-second .activity-title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            width: 80%;
            padding: 6px 0px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            background-color: #3a436ba4;
        }


        .pdf-second .footer {
            background-color: #3a436b;
            border-radius: 30px;
            padding: 5px 20px;
            width: 100%;
            border-collapse: collapse;
        }


        .pdf-second .footer-logo {
            width: 60%;
        }

        .pdf-second .footer-text {
            color: white !important;
            font-size: 20px;
            font-weight: bold;
            display: block;
            text-decoration: none;
        }


        .pdf-second .footer-qr {
            padding: 5px;
            background: #ffffff;
            height: 100px;
            width: 100px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="invoice-container">
            <table class="invoice-table">
                <tbody>

                    {{-- company name --}}
                    <tr>
                        <td colspan="6" class="border-none text-start">
                            <div class="logo">
                                <a href="https://toursandorra.com" style="display: block;text-decoration: none">
                                    @if ($header->light_logo)
                                        <img style="width: 150px;" src="{{ public_path($header->light_logo) }}"
                                            alt="Tours Andorra Logo" class="footer-logo">
                                    @else
                                        <h3>{{ config('app.name') }}</h3>
                                    @endif
                                </a>
                            </div>
                        </td>
                    </tr>

                    {{-- invoice text --}}
                    {{-- <tr class="thead">
                        <td colspan="3" class="border-none"></td>
                        <td class="border-none"></td>
                        <td colspan="1" class="text-center border-none" style="background: white">
                            <div class="invoice-title text-black" style="font-size: 25px; font-weight: 600">Invoice
                            </div>
                        </td>
                        <td class="border-none"></td>
                    </tr> --}}

                    {{-- bill number --}}
                    {{-- <tr>
                        <td colspan="3" class="border-none"></td>
                        <td class="border-none"></td>
                        <td colspan="1" class="text-center border-none" style="background: white">
                            <div class="bill-no"><small><span style="font-weight: 600">Order Id:
                                    </span>{{ $booking->order_id }}</small></div>
                        </td>
                        <td class="border-none"></td>
                    </tr> --}}

                    <tr>
                        <td colspan="6" class="border-none bill_details" style="width: 100%;">
                            <div class="invoice-details">
                                <div class="invoice-bill-to text-start" style="line-height: 20px;">
                                    <h5 style="font-weight: 600; font-size: 24px">BILL TO:</h5>
                                    <br>
                                    <span style="font-size: 17px; font-weight: 600"><strong>Order Id:</strong>
                                        {{ $booking->order_id }}</span>
                                    <br>
                                    <span style="font-size: 18px; font-weight: 600">Payment Status:
                                        <span
                                            class="btn
    @if ($booking->status == 'Processing') bg-warning
    @elseif($booking->status == 'Awaiting') bg-secondary
    @elseif($booking->status == 'Paid') bg-success
    @elseif($booking->status == 'Cancelled') bg-danger
    @else bg-dark @endif"
                                            style="font-size: 14px; font-weight: 600; padding: 8px 12px;">
                                            {{ $booking->status }}
                                        </span>
                                    </span>

                                    <br>
                                    <span>Name: {{ $booking->customer->name }}</span>
                                    <br>
                                    <span>Email: {{ $booking->customer->email }}</span>
                                    @if ($booking->customer->phone)
                                        <br>
                                        <span>Phone: {{ $booking->customer->phone }}</span>
                                        <br>
                                    @endif
                                </div>
                            </div>
                        </td>
                    </tr>

                    {{-- bill to and details --}}
                    {{-- <tr>
                        <td colspan="6" class="border-none bill_details" style="width: 100%;">
                            <div class="invoice-details" style="width: 100%;">
                                <div class="invoice-bill-to text-start" style="line-height: 20px; width: 100%;">
                                    <span style="font-size: 17px; font-weight: 600"><strong>Order Id:</strong>
                                        {{ $booking->order_id }}</span>
                                    <br>
                                    <span style="font-size: 18px; font-weight: 600">Payment Status:
                                        <span
                                            class="btn
                        @if ($booking->status == 'Processing') bg-warning
                        @elseif($booking->status == 'Awaiting') bg-secondary
                        @elseif($booking->status == 'Paid') bg-success
                        @elseif($booking->status == 'Cancelled') bg-danger
                        @else bg-dark @endif"
                                            style="font-size: 14px; font-weight: 600; padding: 8px 12px;">
                                            {{ $booking->status }}
                                        </span>
                                    </span>
                                    <br>
                                    <span>Name: {{ $booking->customer->name }}</span>
                                    <br>
                                    <span>Email: {{ $booking->customer->email }}</span>
                                    @if ($booking->customer->phone)
                                        <br>
                                        <span>Phone: {{ $booking->customer->phone }}</span>
                                        <br>
                                    @endif
                                    <span>Address: {{ $booking->customer->address }}</span>
                                </div>

                                <div class="invoice-bill-to text-end"
                                    style="line-height: 20px; float: right; width: 50%;">
                                    <span style="font-weight: bold">Company Details:</span>
                                    <br>
                                    <span>Phone: {{ $details->help_number }}</span>
                                    <br>
                                    <span>Email: {{ $details->email }}</span>
                                    <br>
                                    <span>Address: {{ $details->location }}</span>
                                </div>
                            </div>
                        </td>
                    </tr> --}}

                    <tr>
                        <td colspan="6" class="border-none">
                            <div class="invoice-date text-end bill_time">
                                <p class="fw-300 m-0">
                                    Date:{{ date('d F Y', strtotime($booking->created_at)) }}</p>
                            </div>
                        </td>
                    </tr>

                    {{-- amount chart --}}
                    <tr class="thead border-none">
                        <th colspan="3" class="p-td border-none">Description</th>
                        <th class="border-none p-td">Quantity</th>
                        <th class="border-none p-td" style="white-space: nowrap;">Unit Price</th>
                        <th class="border-none p-td">Total</th>
                    </tr>


                    @foreach (json_decode($booking->products, true) as $product)
                        @php
                            $unitPrice = $product['price'] / $product['quantity'];
                            $startDate = isset($product['startDate'])
                                ? date('d-l-Y', strtotime($product['startDate']))
                                : null;
                            $endDate = isset($product['endDate'])
                                ? date('d-l-Y', strtotime($product['endDate']))
                                : null;
                        @endphp
                        <tr>
                            <td class="border-none p-td text-start" style="padding: 10px" colspan="3">
                                <strong>{{ $product['title'] }}</strong>
                                @if ($startDate || $endDate)
                                    <small> ({{ $startDate ?: '' }} -
                                        {{ $endDate ?: '' }})</small>
                                @endif
                                @if ($product['day'])
                                    <small> | Total Days: {{ $product['day'] }}</small>
                                @endif
                                <br>
                                @if (!empty($product['services']))
                                    <strong><small>Services:</small></strong>
                                    <ul class="list-unstyled">
                                        @foreach ($product['services'] as $service)
                                            @if ($service['title'] !== '')
                                                <li class="d-flex justify-content-between">
                                                    <span>{{ $service['title'] }}</span>
                                                    <span>(x{{ $service['quantity'] }})</span>
                                                    {{-- <span>{{ number_format($service['price'] * $service['quantity'], 2) }}
                                                    €</span> --}}
                                                </li>
                                            @else
                                                <li>
                                                    <span>N/A</span>
                                                </li>
                                            @endif
                                        @endforeach
                                    </ul>
                                @endif
                                {{-- <br> --}}
                                @if (!empty($product['extra_services']))
                                    <strong><small>Location Shop:</small></strong>
                                    <ul class="list-unstyled">
                                        @foreach ($product['extra_services'] as $extra_service)
                                            @if ($extra_service['title'] !== '' || ($extra_service['title'] !== '' && $extra_service['price'] !== 0))
                                                <li class="d-flex justify-content-between">
                                                    <span>{{ $extra_service['title'] }}</span>
                                                    {{-- <span>{{ number_format($extra_service['price'], 2) }} €</span> --}}
                                                </li>
                                            @else
                                                <li>
                                                    <span>N/A</span>
                                                </li>
                                            @endif
                                        @endforeach
                                    </ul>
                                @endif
                            </td>
                            <td class="border-none p-td">{{ $product['quantity'] }}</td>
                            <td class="border-none p-td" style="white-space: nowrap;">
                                {{ number_format($unitPrice, 2) }} €</td>
                            <td class="border-none p-td" style="white-space: nowrap;">
                                {{ number_format($product['price'], 2) }} €</td>
                        </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    {{-- sub total --}}
                    <tr>
                        <td class="border-none p-td text-start" style="padding: 10px" colspan="3">
                            Note: {{ $booking->order_note }}
                        </td>
                        <td class="border-none p-td"></td>
                        <th class="text-success p-td">Sub Total</th>
                        <th class="total text-success p-td">{{ $booking->price + $booking->discounted_price }} €</th>
                    </tr>

                    {{-- discount --}}
                    <tr>
                        <td class="border-none p-td" colspan="3"></td>
                        <td class="border-none p-td"></td>
                        <th class="text-danger p-td">Discount</th>
                        <th class="total text-danger p-td">-
                            {{ $booking->discounted_price ?? 0 }}
                            €
                        </th>
                    </tr>

                    {{-- total --}}
                    <tr>
                        <td class="border-none p-td" colspan="3"></td>
                        <td class="border-none p-td"></td>
                        <th class="text-success p-td" style="color:#5cb85c">Total</th>
                        <th class="total text-success p-td" style="color:#5cb85c">{{ $booking->price }} €</th>
                    </tr>


                    {{-- total bill on words --}}
                    {{-- <tr>
                        <th class="text-start border-none" colspan="6" style="padding-top: 10px">
                            @if (Str::length($booking->total_bill) <= 10)
                                <p class="fw-bold">Total Bill In Word:
                                    {{ Str::ucfirst(NumConvert::word($booking->total_bill)) }} Taka Only</p>
                            @endif
                        </th>
                    </tr> --}}
                </tfoot>
            </table>
            {{-- <table>
            <tr class="border-none">
                <td class="border-none text-start" colspan="2" style="padding-top: 40px">
                    <span style="font-weight: bold">Company Details:</span>
                    <br>
                    <span>Phone: {{ $details->help_number }}</span>
                    <br>
                    <span>Email: {{ $details->email }}</span>
                    <br>
                    <span>Address: {{ $details->location }}</span>
                </td>
                <td class="border-none" colspan="2" style="padding-top: 40px"></td>
                <td class="border-none" colspan="2" style="padding-top: 40px"></td>
            </tr>
            </table> --}}
            {{-- <br> --}}
            {{-- <table>
                <tr>
                    <small style="color: green">Thanks, {{ $booking->customer->name }} For Doing Business With
                        {{ config('app.name') }}
                    </small>
                </tr>
            </table> --}}

            <table class="pdf-second">
                <tr>
                    <td style="padding: 30px 0px;" class="border-none">
                        <a href="https://toursandorra.com"
                            style="display: block; text-decoration: none; color: inherit;">
                            <table class="footer text-center"
                                style="width: 100%; border-collapse: collapse; position: relative; z-index: 1;">
                                <tr>
                                    <td style="width: 50%; padding: 5px;" class="border-none">
                                        <a href="https://toursandorra.com" style="display: block;">
                                            <img src="{{ public_path($header->dark_logo) }}" alt="Tours Andorra Logo"
                                                class="footer-logo">
                                        </a>
                                    </td>
                                    <td class="border-none text-center" style="width: 50%; padding: 5px;">
                                        <a href="https://toursandorra.com" target="_blank"
                                            class="footer-text">TOURSANDORRA.COM</a>
                                        <a href="mailto:info@toursandorra.com" target="_blank" class="footer-text"
                                            style="font-size: 16px">info@toursandorra.com</a>
                                    </td>

                                    {{-- <td class="border-none" style="width: 30%; text-align: right; padding: 5px;">
                                        <a href="https://toursandorra.com" style="display: block;">
                                            <img src="{{ public_path('image/qr-code.jpg') }}" alt="QR Code"
                                                class="footer-qr">
                                        </a>
                                    </td> --}}
                                </tr>
                            </table>
                        </a>
                    </td>
                </tr>
            </table>

            <div class="page-break"></div>

            {{-- <table class="pdf-second">
                <tr class="border-none">
                <td class="header border-none" style="padding-top: 20px">
                    <h2 class="title-blue">Descubre las mejores</h2>
                    <h1 class="title-large">
                        <span class="title-dark">EXPERIENCIAS DE</span>
                        <span class="title-blue-text">INVIERNO</span>
                    </h1>
                </td>
                </tr>

                <tr>
                    <td class="border-none">
                        <table class="activities-table">
                            <tr>
                                <td class="border-none">
                                    <div class="activity-card">
                                        <a href="https://tickets.toursandorra.com/entradas-a-caldea" target="_blank">
                                            <img src="{{ public_path('image/grids/1.png') }}" alt="CALDEA">
                                        </a>
                                        <div class="activity-overlay"></div>
                                        <div class="activity-title">CALDEA</div>
                                    </div>
                                </td>
                                <td class="border-none">
                                    <div class="activity-card">
                                        <a href="https://toursandorra.com/product/packs-de-actividades"
                                            target="_blank">
                                            <img src="{{ public_path('image/grids/2.png') }}"
                                                alt="PACK PERSONALIZADO">
                                        </a>
                                        <div class="activity-overlay"></div>
                                        <div class="activity-title">PACK<br>PERSONALIZADO</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="border-none">
                                    <div class="activity-card">
                                        <a href="https://toursandorra.com/product/mushing" target="_blank">
                                            <img src="{{ public_path('image/grids/3.png') }}" alt="MUSHING">
                                        </a>
                                        <div class="activity-overlay"></div>
                                        <div class="activity-title">MUSHING</div>
                                    </div>
                                </td>
                                <td class="border-none">
                                    <div class="activity-card">
                                        <a href="https://toursandorra.com/alquiler-ropa-esqui" target="_blank">
                                            <img src="{{ public_path('image/grids/4.png') }}" alt="ALQUILER ROPA">
                                        </a>
                                        <div class="activity-overlay"></div>
                                        <div class="activity-title">ALQUILER ROPA</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="border-none">
                                    <div class="activity-card">
                                        <a href="https://toursandorra.com/product/motos-de-nieve/" target="_blank">
                                            <img src="{{ public_path('image/grids/5.png') }}" alt="MOTOS DE NIEVE">
                                        </a>
                                        <div class="activity-overlay"></div>
                                        <div class="activity-title">MOTOS DE NIEVE</div>
                                    </div>
                                </td>
                                <td class="border-none">
                                    <div class="activity-card">
                                        <a href="https://tickets.toursandorra.com/entradas-aventura" target="_blank">
                                            <img src="{{ public_path('image/grids/6.png') }}" alt="NATURLAND">
                                        </a>
                                        <div class="activity-overlay"></div>
                                        <div class="activity-title">NATURLAND</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="border-none">
                                    <div class="activity-card">
                                        <a href="https://toursandorra.com/product/actividades-nocturnas"
                                            target="_blank">
                                            <img src="{{ public_path('image/grids/7.png') }}"
                                                alt="ACTIVIDADES NOCTURNAS">
                                        </a>
                                        <div class="activity-overlay"></div>
                                        <div class="activity-title">ACTIVIDADES<br>NOCTURNAS</div>
                                    </div>
                                </td>
                                <td class="border-none">
                                    <div class="activity-card">
                                        <a href="https://toursandorra.com/product/raquetas/" target="_blank">
                                            <img src="{{ public_path('image/grids/8.png') }}" alt="RAQUETAS">
                                        </a>
                                        <div class="activity-overlay"></div>
                                        <div class="activity-title">RAQUETAS</div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td style="padding: 0px 30px;" class="border-none">
                        <a href="https://toursandorra.com"
                            style="display: block; text-decoration: none; color: inherit;">
                            <table class="footer"
                                style="width: 100%; border-collapse: collapse; position: relative; z-index: 1;">
                                <tr>
                                    <td style="width: 35%; padding: 5px;" class="border-none">
                                        <a href="https://toursandorra.com" style="display: block;">
                                            <img src="{{ public_path('image/logo.png') }}" alt="Tours Andorra Logo"
                                                class="footer-logo">
                                        </a>
                                    </td>
                                    <td class="border-none" style="width: 35%; padding: 5px;">
                                        <a href="https://toursandorra.com" class="footer-text">TOURSANDORRA.COM</span>
                                    </td>
                                    <td class="border-none" style="width: 30%; text-align: right; padding: 5px;">
                                        <a href="https://toursandorra.com" style="display: block;">
                                            <img src="{{ public_path('image/qr-code.jpg') }}" alt="QR Code"
                                                class="footer-qr">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </td>
                </tr>
            </table> --}}

            <table class="pdf-second" style="width: 100%; text-align: center; border-collapse: collapse;">
                <tr>
                    <td class="border-none" style="text-align: center; vertical-align: middle; padding: 30px;">
                        <div style="display: inline-block; position: relative; max-width: 800px; width: 100%;">
                            <a href="https://toursandorra.com" target="_blank"
                                style="display: block; width: 100%; height: auto; position: relative;">
                                <img src="{{ public_path($promotions->image) }}"
                                    style="max-width: 100%; height: auto; display: block; margin: 0 auto; border-radius: 10px;"
                                    alt="Promotion">
                            </a>
                        </div>
                    </td>
                </tr>
            </table>

            </section>
        </div>
        {{-- <script>
            // Disable right-click
            document.addEventListener('contextmenu', (e) => e.preventDefault());

            function ctrlShiftKey(e, keyCode) {
                return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
            }

            document.onkeydown = (e) => {
                // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
                if (
                    event.keyCode === 123 ||
                    ctrlShiftKey(e, 'I') ||
                    ctrlShiftKey(e, 'J') ||
                    ctrlShiftKey(e, 'C') ||
                    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
                )
                    return false;
            };
        </script> --}}
</body>

</html>
