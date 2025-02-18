import MasterLayout from "@/components/layout/MasterLayout";
import PaymentFailure from "@/components/payment/PaymentFailure";
import "../../../globals.css";
export default function Failure() {
  return (
    <MasterLayout>
      <PaymentFailure />
    </MasterLayout>
  );
}
