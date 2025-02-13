"use server";
import CartPage from "@/components/sections/Cart/Cart";
import "../globals.css";
import MasterLayout from "@/components/layout/MasterLayout";
export default async function CheckOut() {
  return (
    <>
      <MasterLayout>
        <div className="background-body">
          <CartPage />
        </div>
      </MasterLayout>
    </>
  );
}
