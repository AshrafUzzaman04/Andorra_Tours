<?php

namespace App\Http\Controllers;

use App\Exports\BookingsExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class BookingExportController extends Controller
{
    public function export()
    {
        return Excel::download(new BookingsExport, 'bookings.xlsx');
    }
}