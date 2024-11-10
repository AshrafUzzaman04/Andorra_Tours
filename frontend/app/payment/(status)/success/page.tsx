"use server"
import MasterLayout from "@/components/layout/MasterLayout";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import "../../../globals.css";
import { Suspense } from "react";

export default async function Success() {

  return (
    <MasterLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <PaymentSuccess/>
        </Suspense>
    </MasterLayout>
  )
}
