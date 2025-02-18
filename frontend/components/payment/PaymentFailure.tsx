"use client";
import { useState, useEffect } from "react";
import {
  XCircle,
  RefreshCcw,
  ArrowLeft,
  AlertTriangle,
  ShieldOff,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { NumericFormat } from "react-number-format";
import Fetch from "@/helper/Fetch";
interface MerchantParameters {
  Ds_Date: string;
  Ds_Hour: string;
  Ds_SecurePayment: string;
  Ds_Amount: string;
  Ds_Currency: string;
  Ds_Order: string;
  Ds_MerchantCode: string;
  Ds_Terminal: string;
  Ds_Response: string;
  Ds_TransactionType: string;
  Ds_MerchantData: string;
  Ds_AuthorisationCode: string;
  Ds_ConsumerLanguage: string;
  [key: string]: string; // Allow additional dynamic properties
}
export default function PaymentFailure() {
  const [shake, setShake] = useState(false);
  const searchParams = useSearchParams();
  const [showConfetti, setShowConfetti] = useState(false);
  const [merchantParameters, setMerchantParameters] =
    useState<MerchantParameters | null>(null);
  const [signature, setSignature] = useState<string>("");
  const [signatureVersion, setSignatureVersion] = useState<string>("");
  const Ds_SignatureVersion = searchParams.get("Ds_SignatureVersion");
  const Ds_MerchantParameters = searchParams.get("Ds_MerchantParameters");
  const Ds_Signature = searchParams.get("Ds_Signature");
  useEffect(() => {
    if (searchParams?.size > 0) {
      if (Ds_SignatureVersion) setSignatureVersion(Ds_SignatureVersion);
      if (Ds_Signature) setSignature(Ds_Signature);

      // Optional: Decode and parse the Ds_MerchantParameters
      if (Ds_MerchantParameters) {
        try {
          const decodedParams = JSON.parse(
            atob(Ds_MerchantParameters)
          ) as MerchantParameters;
          Fetch.post("booking/status/" + decodedParams?.Ds_Order, {
            status: "Cancelled",
          }).then((res) => {
            // console.log(res)
          });
          setMerchantParameters(decodedParams);
        } catch (error) {
          console.error("Error decoding Ds_MerchantParameters:", error);
        }
      }
    }
  }, [searchParams]);
  useEffect(() => {
    setShake(true);
    const timer = setTimeout(() => setShake(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-red-400 to-purple-500">
      <div className="w-full max-w-md overflow-hidden rounded-lg shadow-2xl bg-white/90 backdrop-blur-sm">
        <div className="relative p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-red-300 to-purple-300"></div>
          <h2 className="relative z-10 text-3xl font-bold text-center text-gray-800">
            Payment Failed
          </h2>
        </div>
        <div className="flex flex-col items-center p-6 space-y-6">
          <div
            className={`relative transition-transform ${
              shake ? "animate-shake" : ""
            }`}
          >
            <XCircle className="w-24 h-24 text-red-500" />
            <AlertTriangle className="absolute w-8 h-8 text-yellow-500 -top-2 -right-2" />
          </div>
          <p className="text-lg text-center text-gray-600">
            ¡Algo salió mal con tu pago! “No hemos podido procesar tu pago. Por
            favor, revisa los detalles de tu tarjeta.
          </p>
          <div className="w-full p-6 space-y-4 rounded-lg bg-gradient-to-r from-red-100 to-purple-100">
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              Error Details:
            </h3>
            <div className="flex items-center space-x-3">
              <ShieldOff className="text-red-500" />
              <p className="text-gray-700">Error Code: PAY_001</p>
            </div>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="text-yellow-500" />
              <p className="text-gray-700">Message: Invalid card information</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-6 space-x-4">
          <button className="flex items-center px-6 py-3 font-semibold text-purple-500 transition-all duration-300 border-2 border-purple-500 rounded-full hover:bg-purple-50">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
