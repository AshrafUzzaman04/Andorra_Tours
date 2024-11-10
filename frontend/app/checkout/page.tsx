"use server"
import CheckOutPage from "@/components/sections/CheckOut/CheckOut";
import "../globals.css";
import MasterLayout from "@/components/layout/MasterLayout";
export default async function CheckOut() {
  return (
    <>
        <MasterLayout>
            <div className="background-body">
                <CheckOutPage/>
            </div>
        </MasterLayout>
    </>
  )
}
