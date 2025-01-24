'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, AlertCircle, Check, Search, ShoppingCart, Minus, Plus, XCircle, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { NumericFormat } from 'react-number-format'
import formatDate from '@/util/formatDate'
import { initiatePayment } from '@/app/payment/redsys/actions'
import { useRouter } from 'next/navigation'
import Fetch from '@/helper/Fetch'

const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia",
    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Holy See", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
    "Oman",
    "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar",
    "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan",
    "Vanuatu", "Venezuela", "Vietnam",
    "Yemen",
    "Zambia", "Zimbabwe"
]
interface ErrosTypes{
    name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
    country: string,
    company: null | string,
}
export default function CheckOutPage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [couponDiscountPrice, setCouponDiscountPrice] = useState(0);
    const [couponVisible, setCouponVisible] = useState(false)
    const [couponCode, setCouponCode] = useState('')
    const [couponError, setCouponError] = useState('')
    const [couponSuccess, setCouponSuccess] = useState(false)
    const [countrySearch, setCountrySearch] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
    const countryDropdownRef = useRef<HTMLDivElement>(null)
    const [agreed, setAgreed] = useState(false)
    const [errors, setErrors] = useState<ErrosTypes>();
    const [formData, setFormData] = useState({
        price: totalPrice,
        name: '',
        last_name: '',
        company: '',
        country: '',
        address: '',
        email: '',
        phone: '',
        order_note: '',
        products: '',
        coupon_id: '',
        discounted_price: 0,
    });
    const [paymentData, setPaymentData] = useState<null | {
        url: string;
        params: {
            Ds_SignatureVersion: string;
            Ds_MerchantParameters: string;
            Ds_Signature: string;
        };
    }>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const filteredCountries = countries.filter(country =>
        country.toLowerCase().includes(countrySearch.toLowerCase())
    )
    const [placeOrder, setPlaceOrder] = useState(false);
    function removeItems(indexToRemove: number) {
        const items = products?.filter((_: any, index: number) => index !== indexToRemove);
        setProducts(items);
        localStorage.setItem("bookingReantData", JSON.stringify(items)); // update localStorage if needed
        setFormData({ ...formData, products: JSON.stringify(items) })
    }
    useEffect(() => {
        const total = products.reduce((sum: any, product: { price: any }) => sum + product.price, 0);
        setTotalPrice(total);
        setFormData({ ...formData, price: total })
    }, [products]);

    useEffect(() => {
        // Ensure this runs only in the browser
        if (typeof window !== "undefined") {
            const storedData = localStorage.getItem("bookingReantData");
            const parsedData = JSON.parse(storedData || '[]')
            setProducts(parsedData);
            setFormData({ ...formData, products: JSON.stringify(parsedData) })
        }
    }, [router]);


    const handleCouponSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // if (couponCode === '2151323') {
        //     setCouponError('Coupon "2151323" does not exist!')
        //     setCouponSuccess(false)
        // } else if (couponCode) {
        //     setCouponError('')
        //     setCouponSuccess(true)
        // }

        Fetch.get("coupons/" + couponCode + "/check")
            .then(async (res) => {
                if (res?.status === 200) {
                    const couponId = res?.data?.data?.id;
                    const discountPercentage = res?.data?.data?.percentage;
                    setCouponDiscountPrice(discountPercentage);

                    // Calculate the final price after applying the coupon
                    const discountPrice = totalPrice * (discountPercentage / 100);

                    const finalPrice = totalPrice - discountPrice;

                    // Update formData with the final price
                    setFormData({ ...formData, coupon_id: couponId, discounted_price: discountPrice,  price: finalPrice });

                setCouponError('')
                setCouponSuccess(true)
            }
        })
        .catch((error) => {
            if (error?.response?.status === 404) {
                setCouponError('Coupon is not valid!');
                setCouponDiscountPrice(0)
            } else if (error?.response?.status === 500) {
                setCouponError('An unexpected error occurred. Please try again later.');
            } else {
                setCouponError('Unexpected error occurred.');
            }
            setFormData({ ...formData, price: totalPrice });
            setCouponSuccess(false);
        });
    }

    const handleCountrySelect = (country: string) => {
        setSelectedCountry(country)
        setCountrySearch('')
        setIsCountryDropdownOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
                setIsCountryDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    async function handleSubmit() {
        setPlaceOrder(true)
        Fetch.post("bookings", formData)
        .then(async (res) => {
            if (res?.status === 200 && res?.data?.order_id) {
                try {
                    // const result = await initiatePayment(totalPrice, res?.data?.order_id);
                    // if (result.success && result.url) {
                    //     setPaymentData(result); // Store payment data for further use
                    // } else {
                    //     alert(`Error initiating payment: ${result.error}`);
                    //     setPlaceOrder(false); // Reset placeOrder state
                    //     return; // Exit early if payment fails
                    // }
                    // router.push(res?.data?.whatsappLink)

                    router.push('/booking-payment/' + res?.data?.order_id);
                } catch (paymentError) {
                    console.error("Payment initiation failed:", paymentError);
                    setPlaceOrder(false);
                    return;
                }
            }
            setPlaceOrder(false); // Reset placeOrder state
        })
        .catch((error) => {
            if (error?.response?.status === 422) {
                setErrors(error?.response?.data?.errors); // Handle validation errors
            } else {
                console.error("Unexpected error:", error.message); // Handle other errors
            }
            setPlaceOrder(false); // Reset placeOrder state
        });

    }
    useEffect(() => {
        if (paymentData && formRef.current) {
            localStorage.removeItem("bookingReantData");
            formRef.current.submit()
        }
    }, [paymentData])
    return (
        <div className="min-h-screen py-12">
            <div className="mx-auto sm:px-0 lg:px-20 ">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overflow-hidden background-body rounded-2xl"
                >
                    <div className="p-6 text-primary-foreground">
                        <h1 className="text-3xl font-bold neutral-1000">Checkout</h1>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                            {/* Billing Information */}
                            <div className="p-3 space-y-6 lg:col-span-2 card pricing-card">
                                <h2 className="text-2xl font-semibold">Billing Details</h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 neutral-1000">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formData?.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className={`mt-1 block w-full px-3 py-2 border ${errors?.name ? "!border-red-500 ring-1 !ring-red-500":"border-gray-300"} neutral-1000 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                                        />
                                        {errors?.name && <label htmlFor="firstName" className="text-red-500">{errors?.name}</label>}
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 neutral-1000">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData?.last_name}
                                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                            required
                                            className={`mt-1 block w-full px-3 py-2 border ${errors?.last_name ? "!border-red-500 ring-1 !ring-red-500":"border-gray-300"} neutral-1000 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                                        />
                                        {errors?.last_name && <label htmlFor="firstName" className="text-red-500">{errors?.last_name}</label>}
                                    </div>
                                </div>
                                <div >
                                    {/* <div>
                                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 neutral-1000">
                                            Company name (optional)
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            placeholder="Enter company name"
                                            value={formData?.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className={`mt-1 block w-full px-3 py-2 border ${errors?.company ? "!border-red-500 ring-1 !ring-red-500":"border-gray-300"} neutral-1000 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                                        />
                                        {errors?.company && <label htmlFor="firstName" className="text-red-500">{errors?.company}</label>}
                                    </div> */}
                                    <div className="relative" ref={countryDropdownRef}>
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 neutral-1000">
                                            Country / Region *
                                        </label>
                                        <div
                                            className="relative mt-1"
                                            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                        >
                                            <input
                                                type="text"
                                                id="country"
                                                name="country"
                                                required
                                                value={selectedCountry || countrySearch}
                                                onChange={(e) => {
                                                    setCountrySearch(e.target.value)
                                                    setIsCountryDropdownOpen(true)
                                                    setFormData({ ...formData, country: e.target.value })
                                                }}
                                                className={`block w-full px-3 py-2 neutral-1000 border ${errors?.country ? "!border-red-500 ring-1 !ring-red-500":"border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                                                placeholder="Search for a country"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                <ChevronDown className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>
                                        {errors?.country && <label htmlFor="firstName" className="text-red-500">{errors?.country}</label>}
                                        {isCountryDropdownOpen && (
                                            <div className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg background-body max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {filteredCountries.map((country) => (
                                                    <div
                                                        key={country}
                                                        className="relative py-2 pl-3 duration-300 ease-in-out rounded-md cursor-pointer select-none pr-9 hover:bg-gray-800"
                                                        onClick={() => handleCountrySelect(country)}
                                                    >
                                                        {country}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* <div>
                                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 neutral-1000">
                                        Street address *
                                    </label>
                                    <input
                                        type="text"
                                        id="street"
                                        name="street"
                                        required
                                        value={formData?.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="House number and street name"
                                        className={`mt-1 block w-full px-3 py-2 border ${errors?.address ? "!border-red-500 ring-1 !ring-red-500":"border-gray-300"} neutral-1000 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                                    />
                                    {errors?.address && <label htmlFor="firstName" className="text-red-500">{errors?.address}</label>}
                                </div> */}

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 neutral-1000">
                                            Email address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email address"
                                            value={formData?.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className={`mt-1 block w-full px-3 py-2 border ${errors?.email ? "!border-red-500 ring-1 !ring-red-500":"border-gray-300"} neutral-1000 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                                        />
                                        {errors?.email && <label htmlFor="firstName" className="text-red-500">{errors?.email}</label>}
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 neutral-1000">
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="Phone number"
                                            value={formData?.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                            className={`mt-1 block w-full px-3 py-2 border ${errors?.email ? "!border-red-500 ring-1 !ring-red-500":"border-gray-300"} neutral-1000 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                                        />
                                        {errors?.phone && <label htmlFor="firstName" className="text-red-500">{errors?.phone}</label>}
                                    </div>

                                </div>



                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 neutral-1000">
                                        Order notes (optional)
                                    </label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows={3}
                                        cols={2}
                                        placeholder="Notes about your order, e.g. special notes for delivery"
                                        value={formData?.order_note}
                                        onChange={(e) => setFormData({ ...formData, order_note: e.target.value })}
                                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm neutral-1000 background-body focus:outline-none focus:ring-primary focus:border-primary"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-2">
                                <div className="p-6 rounded-lg shadow-md background-body card pricing-card">
                                    <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
                                    <div className="space-y-4">
                                        {
                                            products?.length > 0 && products?.map((product: any, index: number) => (
                                                <div key={index} className="relative flex items-center justify-between p-2 rounded bg-white/5">
                                                    <div className="">
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium text-gray-100">Start Date: {formatDate(product?.startDate)}</p>
                                                            {product?.endDate && <p className="font-medium text-gray-100">End Date: {formatDate(product?.endDate)}</p>}
                                                        </div>
                                                        <p className="mt-2 font-medium text-gray-100">{product?.title}</p>
                                                        {
                                                            product?.services?.map((service: any, index: number) => (
                                                                <div key={index} className="flex items-center gap-2">
                                                                    <p className="font-medium text-gray-100">{service?.quantity}.</p>
                                                                    <p className="font-medium text-gray-100">{service?.title}</p>
                                                                    {/* <div className="flex items-center gap-2 mt-1 text-gray-100">
                                                                        <div className="p-1 bg-gray-800 rounded cursor-pointer ">
                                                                            <Minus className="size-4" />
                                                                        </div>
                                                                        <p className="bg-gray-800 px-3 py-0.5 rounded cursor-pointer">{service?.quantity}</p>
                                                                        <div className="p-1 bg-gray-800 rounded cursor-pointer">
                                                                            <Plus className=" size-4" />
                                                                        </div>
                                                                    </div> */}
                                                                </div>
                                                            ))
                                                        }
                                                        {product?.extra_services?.length > 0 && <p className="mt-2 font-medium text-gray-100">Extra Services:</p>}
                                                        {
                                                            product?.extra_services?.map((service: any, index: number) => (
                                                                <p key={index} className="font-medium text-gray-100">{service?.title}</p>
                                                            ))
                                                        }
                                                    </div>

                                                    <span className="font-semibold text-gray-100">
                                                        <NumericFormat
                                                            value={Number(product?.price)}
                                                            displayType="text"
                                                            thousandSeparator={","}
                                                            decimalSeparator="."
                                                            decimalScale={2}
                                                            fixedDecimalScale
                                                            suffix=' €'
                                                        />
                                                    </span>
                                                    <div onClick={() => removeItems(index)} className="absolute cursor-pointer right-1 top-1">
                                                        <XCircle className="text-red-600 size-5" />
                                                    </div>
                                                </div>
                                            ))
                                        }

                                        {/* <div className="flex items-center justify-between text-sm text-gray-600">
                                            <span className="text-muted">Subtotal</span>
                                            <span className="text-muted">95.00 €</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <span className="text-muted">Shipping</span>
                                            <span className="text-muted">Free shipping</span>
                                        </div> */}

                                        <div className="!border-t !border-indigo-500 pt-4 flex flex-col justify-between items-center font-semibold">
                                            <div className="flex items-center justify-between w-100">
                                            <span className="font-semibold text-muted">Total</span>
                                            <span className="text-xl font-semibold text-muted">
                                                <NumericFormat
                                                    value={Number(totalPrice)}
                                                    displayType="text"
                                                    thousandSeparator={","}
                                                    decimalSeparator="."
                                                    decimalScale={2}
                                                    fixedDecimalScale
                                                    suffix=' €'
                                                />
                                            </span>
                                            </div>

                                            {/* Discounted Price */}
                                            {couponDiscountPrice > 0 ? (
                                                <div className="flex items-center justify-between w-100">
                                                    <span className="font-semibold text-muted">Discount</span>
                                                    <span className="text-xl font-semibold text-red-500">-
                                                        <NumericFormat
                                                            value={Number(totalPrice * (couponDiscountPrice / 100))}
                                                            displayType="text"
                                                            thousandSeparator={","}
                                                            decimalSeparator="."
                                                            decimalScale={2}
                                                            fixedDecimalScale
                                                            suffix=' €'
                                                        />
                                                    </span>
                                                </div>
                                            ) : null}


                                            {/* Final Price After Discount */}
                                            {couponDiscountPrice > 0 ? (
                                            <div className="flex items-center justify-between w-100">
                                                <span className="font-semibold text-muted">Final Price</span>
                                                <span className="text-xl font-semibold text-green-500">
                                                    <NumericFormat
                                                        value={Number(totalPrice - (totalPrice * (couponDiscountPrice / 100)))}
                                                        displayType="text"
                                                        thousandSeparator={","}
                                                        decimalSeparator="."
                                                        decimalScale={2}
                                                        fixedDecimalScale
                                                        suffix=' €'
                                                    />
                                                </span>
                                            </div>
                                        ) : null}
                                        </div>

                                    </div>

                                    {/* Coupon Code Section */}
                                    <div className="mt-6">
                                        <button
                                            onClick={() => setCouponVisible(!couponVisible)}
                                            className="flex items-center text-sm font-medium transition-colors text-primary hover:text-primary/80"
                                        >
                                            {couponVisible ? 'Hide coupon code' : 'Have a coupon code?'}
                                            <ChevronDown
                                                size={16}
                                                className={`ml-1 transition-transform ${couponVisible ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {couponVisible && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <form onSubmit={handleCouponSubmit} className="mt-4 space-y-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter coupon code"
                                                            value={couponCode}
                                                            onChange={(e) => setCouponCode(e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="w-full px-4 py-2 font-semibold text-white transition-colors bg-red-500 rounded-md text-primary-foreground hover:bg-primary/90"
                                                        >
                                                            Apply Coupon
                                                        </button>
                                                        {couponError && (
                                                            <p className="flex items-center text-sm text-red-500">
                                                                <AlertCircle size={16} className="mr-1" /> {couponError}
                                                            </p>
                                                        )}
                                                        {couponSuccess && (
                                                            <p className="flex items-center text-sm text-green-500">
                                                                <Check size={16} className="mr-1" /> Coupon applied successfully!
                                                            </p>
                                                        )}
                                                    </form>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Place Order Button */}
                                    <div className="mt-3 box-remember-forgot">
                                        <div className="form-group">
                                            <div className="remeber-me">
                                                <label className="text-sm-medium neutral-500">
                                                    <input
                                                        checked={agreed}
                                                        onChange={(e) => setAgreed(e.target.checked)}
                                                        className="mt-1 cb-remember"
                                                        type="checkbox" />
                                                    I have read and agree to the website{' '}
                                                    <Link href="#" className="text-primary hover:text-primary/80">
                                                        terms and conditions
                                                    </Link>{' '}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <motion.button
                                        onClick={handleSubmit}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className={`w-full py-2 rounded-lg font-semibold d-flex items-center justify-center transition-colors ${agreed && !placeOrder ? 'bg-green-500 hover:bg-green-400 text-white cursor-pointer' : 'bg-green-200 text-[#000] cursor-not-allowed'
                                            }`}
                                        disabled={(!agreed || placeOrder)}
                                    >
                                        {
                                            placeOrder && <LoaderCircle className=" animate-spin" />
                                        }
                                        {
                                            !placeOrder && (
                                                <span className="flex items-center justify-center">
                                                    <ShoppingCart className="mr-2" />
                                                    Place order
                                                </span>
                                            )
                                        }

                                    </motion.button>
                                    {paymentData && (
                                        <form ref={formRef} method="POST" action={paymentData.url} className="hidden">
                                            <input type="hidden" name="Ds_SignatureVersion" value={paymentData.params.Ds_SignatureVersion} />
                                            <input type="hidden" name="Ds_MerchantParameters" value={paymentData.params.Ds_MerchantParameters} />
                                            <input type="hidden" name="Ds_Signature" value={paymentData.params.Ds_Signature} />
                                        </form>
                                    )}
                                    {/* WhatsApp Availability Check */}
                                    <div className="flex items-center mt-6 text-sm text-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5 mr-2 text-green-500"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Check availability via WhatsApp
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}