import MasterLayout from "@/components/layout/MasterLayout";
import "../../globals.css";
import BookingPaymentFrom from "@/components/sections/Payment/BookingPayment";
import { Metadata } from 'next'
import Fetch from "@/helper/Fetch";
import { redirect } from 'next/navigation'
export const metadata: Metadata = {
    title: 'Checkout',
    description: 'Complete your order',
}

async function getCheckoutData(orderId: string) {
    const res = await Fetch.get(`booking/${orderId}`)
    if (res?.statusText !== "OK") redirect("/")
    return res?.data?.data;
}

export default async function BookingPayment({params}:{params:{orderId:string}}) {
    const booking = await getCheckoutData(params?.orderId)
    return (
        <>
            <MasterLayout>
                <div className="background-body">
                    <BookingPaymentFrom booking={booking} totalAmount={0} />
                </div>
            </MasterLayout>
        </>
    )
}
