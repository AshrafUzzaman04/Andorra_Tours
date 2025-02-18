"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown,
  AlertCircle,
  Check,
  Search,
  ShoppingCart,
  Minus,
  Plus,
  XCircle,
  LoaderCircle,
} from "lucide-react";
import { NumericFormat } from "react-number-format";
import formatDate from "@/util/formatDate";
import { useRouter } from "next/navigation";

export default function CheckOutPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [paymentData, setPaymentData] = useState<null | {
    url: string;
    params: {
      Ds_SignatureVersion: string;
      Ds_MerchantParameters: string;
      Ds_Signature: string;
    };
  }>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [placeOrder, setPlaceOrder] = useState(false);

  function removeItems(indexToRemove: number) {
    const items = products?.filter(
      (_: any, index: number) => index !== indexToRemove
    );
    setProducts(items);
    localStorage.setItem("bookingData", JSON.stringify(items)); // update localStorage if needed
  }

  useEffect(() => {
    const total = products.reduce(
      (sum: any, product: { price: any }) => sum + product.price,
      0
    );
    setTotalPrice(total);
  }, [products]);

  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("bookingData");
      const parsedData = JSON.parse(storedData || "[]");
      setProducts(parsedData);
    }
  }, [router]);

  async function handleSubmit() {
    setPlaceOrder(true);

    router.push("/checkout");
  }

  useEffect(() => {
    if (paymentData && formRef.current) {
      localStorage.removeItem("bookingData");
      formRef.current.submit();
    }
  }, [paymentData]);

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto sm:px-0 lg:px-20 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden background-body rounded-2xl"
        >
          <div className="p-6 text-primary-foreground">
            <h1 className="text-3xl font-bold neutral-1000">Cart</h1>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Items Information */}
              <div className="p-3 space-y-6 lg:col-span-3 card pricing-card">
                <div className="flex justify-between gap-2">
                  <h2 className="text-2xl font-semibold">
                    Total Cart Items ({products?.length})
                  </h2>
                  <Link href="/winter">
                    <button
                      className="flex gap-3 px-3 py-2 md:py-2 md:px-4 rounded-pill fw-semibold align-items-center"
                      style={{
                        backgroundColor: "rgb(58, 67, 108)",
                        color: "white",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="24"
                        height="24"
                        style={{
                          color: "#fff",
                        }}
                      >
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                      </svg>
                      Go to About Page
                    </button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {products?.length > 0 &&
                    products?.map((product: any, index: number) => (
                      <div
                        key={index}
                        className="relative flex items-center justify-between p-2 rounded bg-white/5"
                      >
                        <div className="">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-100">
                              Start Date: {formatDate(product?.startDate)}
                            </p>
                            {product?.endDate && (
                              <p className="font-medium text-gray-100">
                                End Date: {formatDate(product?.endDate)}
                              </p>
                            )}
                          </div>
                          <p className="mt-2 font-medium text-gray-100">
                            {product?.title}
                          </p>
                          {product?.services?.map(
                            (service: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <p className="font-medium text-gray-100">
                                  {service?.quantity}.
                                </p>
                                <p className="font-medium text-gray-100">
                                  {service?.title}
                                </p>
                              </div>
                            )
                          )}
                          {product?.extra_services?.length > 0 && (
                            <p className="mt-2 font-medium text-gray-100">
                              Location:
                            </p>
                          )}
                          {product?.extra_services?.map(
                            (service: any, index: number) => (
                              <p
                                key={index}
                                className="font-medium text-gray-100"
                              >
                                {service?.title}
                              </p>
                            )
                          )}
                        </div>

                        <span className="font-semibold text-gray-100">
                          <NumericFormat
                            value={Number(product?.price)}
                            displayType="text"
                            thousandSeparator={","}
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale
                            suffix=" €"
                          />
                        </span>
                        <div
                          onClick={() => removeItems(index)}
                          className="absolute cursor-pointer right-1 top-1"
                        >
                          <XCircle className="text-red-600 size-5" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="p-6 rounded-lg shadow-md background-body card pricing-card">
                  <h2 className="mb-4 text-xl font-semibold">Summary</h2>
                  <div className="space-y-4">
                    <div className="!border-t !border-indigo-500 pt-4 flex flex-col justify-between items-center font-semibold">
                      <div className="flex items-center justify-between w-100">
                        <span className="font-semibold text-muted">
                          Sub Total
                        </span>
                        <span className="font-semibold text-muted">
                          <NumericFormat
                            value={Number(totalPrice)}
                            displayType="text"
                            thousandSeparator={","}
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale
                            suffix=" €"
                          />
                        </span>
                      </div>

                      {/* Discounted Price */}
                      <div className="flex items-center justify-between w-100">
                        <span className="font-semibold text-muted">
                          Discount
                        </span>
                        <span className="font-semibold text-muted">
                          <NumericFormat
                            value={0}
                            displayType="text"
                            thousandSeparator={","}
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale
                            suffix=" €"
                          />
                        </span>
                      </div>

                      {/* Final Price After Discount */}
                      <div className="flex items-center justify-between w-100">
                        <h5 className="mt-3 text-xl font-semibold text-muted">
                          Grand Total
                        </h5>
                        <span className="text-xl font-semibold text-green-500">
                          <NumericFormat
                            value={Number(totalPrice)}
                            displayType="text"
                            thousandSeparator={","}
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale
                            suffix=" €"
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full py-2 mt-3 rounded-lg font-semibold d-flex items-center justify-center transition-colors ${
                      !placeOrder
                        ? "bg-green-500 hover:bg-green-400 text-white cursor-pointer"
                        : "bg-green-200 text-[#000] cursor-not-allowed"
                    }`}
                    disabled={placeOrder}
                  >
                    {placeOrder && <LoaderCircle className=" animate-spin" />}
                    {!placeOrder && (
                      <span className="flex items-center justify-center">
                        <ShoppingCart className="mr-2" />
                        Checkout
                      </span>
                    )}
                  </motion.button>
                  {paymentData && (
                    <form
                      ref={formRef}
                      method="POST"
                      action={paymentData.url}
                      className="hidden"
                    >
                      <input
                        type="hidden"
                        name="Ds_SignatureVersion"
                        value={paymentData.params.Ds_SignatureVersion}
                      />
                      <input
                        type="hidden"
                        name="Ds_MerchantParameters"
                        value={paymentData.params.Ds_MerchantParameters}
                      />
                      <input
                        type="hidden"
                        name="Ds_Signature"
                        value={paymentData.params.Ds_Signature}
                      />
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
