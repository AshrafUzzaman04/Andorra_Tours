import { CreditCard, Lock } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { CheckoutForm } from './CheckoutForm'

export interface Service {
    title: string;
    price: number;
    quantity: number;
  }
  
  export interface ExtraService {
    title: string;
    price: number;
  }
  
  export interface Product {
    time: string;
    day: number;
    services: Service[];
    extra_services: ExtraService[];
    price: number;
    product_id: number;
    product_photo: string;
    title: string;
    startDate: string; // ISO 8601 format
    quantity: number;
  }
  
  export interface BookingData {
    id: number;
    user_id: number;
    order_id: string;
    products: string; // JSON string of Product[]
    quantity: number | null;
    price: string;
    order_note: string | null;
    status: string;
    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
  }
export default function BookingPaymentFrom({booking,totalAmount,}: {booking: BookingData; totalAmount: number;}) {
    const productsData: Product[] = JSON.parse(booking?.products || `[]`);
    return (
        <>
            <div className="min-h-screen background-100 p-4 md:p-6 lg:p-8">
                <div className="mx-auto max-w-4xl background-body shadow-md rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Pay for order</h2>
                        <h2 className="text-2xl font-bold">#{booking?.order_id}</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left pb-2 w-[50%] neutral-1000">Product</th>
                                    <th className="text-left pb-2 neutral-1000">Qty</th>
                                    <th className="text-right pb-2 neutral-1000">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsData.map((item,index) => (
                                    <tr key={index} className="border-b border-gray-200">
                                        <td className="py-4">
                                            <div className="space-y-1">
                                                <div className="font-bold neutral-1000">{item.title}</div>
                                                <div className="space-y-1 mt-2">
                                                    {item.services.map((service, index) => (
                                                        <div key={index} className="text-sm neutral-1000">{service?.title}</div>
                                                    ))}
                                                </div>
                                                {/* <div className="text-sm neutral-1000">{item.description}</div>
                                                <div className="text-sm neutral-1000">Date: {item.date}</div> */}
                                                <div className="space-y-1 mt-2">
                                                    <div className="text-sm font-bold neutral-1000 pt-2">Extra Services:</div>
                                                    {item.extra_services.map((service, index) => (
                                                        <div key={index} className="text-sm neutral-1000">{service?.title}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 neutral-1000">× {item.quantity}</td>
                                        <td className="py-4 text-right neutral-1000">{item.price.toFixed(2)}€</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t border-gray-200">
                                    <td colSpan={2} className="py-2 neutral-1000 font-extrabold">Subtotal</td>
                                    <td className="py-2 text-right neutral-1000 font-extrabold">{Number(booking?.price).toFixed(2)}€</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="py-2 neutral-1000 font-extrabold">Payment method</td>
                                    <td className="py-2 text-right neutral-1000 font-extrabold">Redsys</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="py-2 font-extrabold neutral-1000">Total</td>
                                    <td className="py-2 text-right font-extrabold neutral-1000">{Number(booking?.price).toFixed(2)}€</td>
                                </tr>
                            </tfoot>
                        </table>

                        <div className="rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-blue-100 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h3 className="font-medium ">Secure Redsys Payment</h3>
                                    <p className="text-sm text-gray-600">Your payment is processed securely through Redsys</p>
                                </div>
                                <div className="flex items-center">
                                    <img src="/assets/imgs/redsys.png" alt="redsys" className="rounded-md" />
                                </div>
                            </div>
                        </div>

                        <CheckoutForm />
                    </div>
                    <div className="p-6 border-t border-gray-200">
                        <form action="/api/checkout" method="POST" className="w-full">
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                                Pay for order
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}