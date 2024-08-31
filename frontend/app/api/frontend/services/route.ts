import Axios from "@/helper/axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    try {
        const response = await Axios.get("/services");
        const services = response?.data?.data;
        return NextResponse.json({ message: "success", data: services },{status: 200})
    } catch (error) {
        return NextResponse.json({ message: "error", error: error?.message }, {status: 500})
    }
}