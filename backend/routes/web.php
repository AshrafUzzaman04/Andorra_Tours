<?php

use Illuminate\Support\Facades\Route;
use Barryvdh\DomPDF\Facade\Pdf;

Route::get('/', function () {
    return view('welcome');
});

Route::get("/invoice", function () {
    return view("invoice");
});

Route::get("/invoice/download", function () {
    $pdf = Pdf::loadView('invoice');
    return $pdf->download('invoices.pdf');
});