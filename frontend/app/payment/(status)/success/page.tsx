"use server"
import MasterLayout from "@/components/layout/MasterLayout";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import "../../../globals.css";

export default async function Success() {

  return (
    <MasterLayout>
        <PaymentSuccess/>
    </MasterLayout>
  )
}
