<?php

namespace App\Http\Controllers;

use App\Http\Requests\CouponCodeRequest;
use App\Models\CuponCode;
use Illuminate\Http\Request;

class CuponCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $coupons = CuponCode::paginate(10);
        return response()->json(['message' => "success", "data" => $coupons]);
    }

    public function verifyCouponCode(string $slug)
    {
        try {
            $couponCode = CuponCode::select(['id', 'code', 'percentage'])->where("code", $slug)->first();

            if ($couponCode) {
                return response()->json(['message' => "success", "data" => $couponCode], 200);
            }

            return response()->json(['message' => "Coupon is not valid!"], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An unexpected error occurred.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CouponCodeRequest $request)
    {
        $data = $request->validated();
        $couponCreate = CuponCode::create($data);
        if ($couponCreate) {
            return response()->json(['message' => "Coupon create successfully",], 201);
        } else {
            return response()->json(['message' => "Coupon Code generate failed!"], 501);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $coupon = CuponCode::find($id);
        if (!$coupon) {
            return response()->json(["message" => "Coupon not found",], 422);
        }
        return response()->json(['message' => "success", "data" => $coupon], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CuponCode $cuponCode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CouponCodeRequest $request, int $id)
    {
        $couponCode = CuponCode::find($id);
        if ($couponCode) {
            $data = $request->validated();
            $couponCode->update($data);

            return response()->json(["message" => "Coupon details update successfully!"], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $coupon = CuponCode::find($id);
        if (!$coupon) {
            return response()->json(["message" => "Coupon not found",], 422);
        }
        $coupon->delete();

        return response()->json(['message' => "Coupon delete successfully"], 200);
    }
}