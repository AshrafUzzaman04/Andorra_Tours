"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import "flatpickr/dist/themes/dark.css";
import flatpickr from "flatpickr";
import Fetch from "@/helper/Fetch";
import { NumericFormat } from "react-number-format";
import { useRouter } from "next/navigation";
export interface VeranoDetailsType {
    id: number;
    inverano_id: number | null;
    verano_id: number | null;
    product_for: string;
    title: string;
    slug: string;
    photos: string;
    description: string;
    pricing: string;
    form_title: string;
    service_title: string;
    services: string;
    extra_service_title: string;
    extra_services: string;
}

export interface TimeSlot {
	id: number;
	time: string;
}

export interface ServiceItem {
	id: number;
	service_name: string;
	price: string;
	quantity: string;
}

export interface ExtraService {
	id: number;
	extra_service_name: string;
	price: string;
	service_name: string;
}

export interface FromDataPriceTypes {
	FormData: VeranoDetailsType,
	price: string;
	bookingLink: string | null;
}


interface DayPrice {
	id: number;
	day: string;
	shop_price: string;
	online_price: string;
}

interface DayPrices {
	[key: string]: DayPrice; // Assuming prices are indexed by day or id
}

export default function BookingForm({ FormData, price, bookingLink }: FromDataPriceTypes) {
	const router = useRouter();
	const parsedServices: ServiceItem[] = JSON.parse(FormData?.services || '[]');
	const parsedAddExtras: ExtraService[] = JSON.parse(FormData?.extra_services || '[]');
	const pricing = JSON.parse(FormData?.pricing || '[]');
	const addDays = (pricing?.length === 1 || pricing?.length === 0) ? 9 : pricing.length - 1;
	const [quantities, setQuantities] = useState(parsedServices?.map(() => 0));
	const [dayPrices, setDayPrices] = useState<DayPrices>({});
	const [selectedExtras, setSelectedExtras] = useState(parsedAddExtras?.map(() => false));
	const [selectedDates, setSelectedDates] = useState<Date[]>([]);
	const [minDate, setMinDate] = useState<Date | null>(null);
	const [maxDate, setMaxDate] = useState<Date | null>(null);
	const [bookingData, setBookingData] = useState({
		time: "",
		day: 0,
		services: [{ title: "", price: 0, quantity: 0 }],
		extra_services: [{ title: "", price: 0 }],
		price: 0,
		product_id: FormData?.id,
		product_photo: FormData?.photos,
		title: FormData?.title
	});

	async function handleBooking() {
		try {
			// Retrieve the existing cart items from localStorage
			const cartData = JSON.parse(localStorage.getItem("bookingData") || "[]");

			// Find if a product with the same product_id exists in the cart
			const existingProductIndex = cartData.findIndex(
				(item: { product_id: number; }) => item.product_id === bookingData.product_id
			);

			if (existingProductIndex !== -1) {
				// If a matching product_id is found, check services for merging
				const existingProduct = cartData[existingProductIndex];

				// Initialize a flag to check if all services match
				let allServicesMatch = true;

				// Iterate over the new services in bookingData
				bookingData.services.forEach((newService) => {
					const existingServiceIndex = existingProduct.services.findIndex(
						(service: { title: string; }) => service.title === newService.title
					);

					if (existingServiceIndex !== -1) {
						// If the service already exists, update quantity and price
						existingProduct.services[existingServiceIndex].quantity += newService.quantity;
						existingProduct.services[existingServiceIndex].price += newService.price;
					} else {
						// If even one service doesn't match, mark the item as not fully matching
						allServicesMatch = false;
					}
				});

				if (allServicesMatch) {
					// If all services matched, update the main price and quantity
					existingProduct.price += bookingData.price;
					existingProduct.quantity = (existingProduct.quantity || 1) + 1;
					cartData[existingProductIndex] = existingProduct;
				} else {
					// If services didn't fully match, treat as a new product and add to the cart
					cartData.push({ ...bookingData, quantity: 1 });
				}
			} else {
				// If no match, add the new product as a new item in the cart
				cartData.push({ ...bookingData, quantity: 1 });
			}

			// Save the updated cart back to localStorage
			localStorage.setItem("bookingData", JSON.stringify(cartData));

			// Update the state to reflect the updated cart
			// setProducts(cartData);

			// Redirect to checkout if the total price of the cart is greater than 0
			if (bookingData.price > 0) {
				// Uncomment the following line when ready to use router
				await router.push("/checkout");
			}
		} catch (error) {
			console.error("Error in handleBooking:", error);
			alert("An error occurred during booking.");
		}
	}

	useEffect(() => {
		flatpickr(".mydatepicker", {
			dateFormat: "Y/m/d",
			mode: (pricing?.length === 1 || pricing?.length === 0) ? "single" : "range",
			inline: true,
			onChange: (dates: Date[]) => {
				setSelectedDates(dates);
				if (dates.length > 0) {
					const earliestDate = new Date(Math.min(...dates.map(date => date.getTime())));
					const latestDate = new Date(earliestDate);
					latestDate.setDate(earliestDate.getDate() + addDays);

					setMinDate(earliestDate);
					setMaxDate(latestDate);
				} else {
					setMinDate(null);
					setMaxDate(null);
				}
			},
			disable: [(date: Date) => {
				if (minDate) {
					const endDate = new Date(minDate);
					endDate.setDate(endDate.getDate() + addDays);

					return date < minDate || date > endDate;
				}
				return false;
			}],
			disableMobile: false
		});

	}, [minDate, maxDate, addDays]);


	useEffect(() => {
		if (selectedDates?.length === 0) return;
		const calculateDayCount = async () => {
			const startDate = selectedDates[0];
			const endDate = selectedDates[1];

			if (!startDate) {
				console.error("No start date selected.");
				return;
			}

			const timeDifference = endDate
				? Math.abs(endDate.getTime() - startDate.getTime())
				: 0;

			const day = endDate ? Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1 : 1;

			const res = await Fetch.post("/product/price", { id: FormData?.id, for: FormData?.product_for, day: day });
			const price = res?.data;
			setDayPrices(price);

			setBookingData(prev => ({
				...prev,
				day: day,
				price: Number(price?.online_price) + calculateTotalPrice(),
				startDate: startDate, // Set startDate in bookingData
				endDate: endDate      // Set endDate in bookingData
			}));
		};
		calculateDayCount()
	}, [selectedDates]);

	useEffect(() => {
		if ((bookingLink === "null" || bookingLink === null) && selectedDates?.length === 0) {
			const calculateDayCount = async () => {
				const day = 1
				const res = await Fetch.post("/product/price", { id: FormData?.id, for: FormData?.product_for, day: day });
				const price = res?.data;
				setDayPrices(price);
				setBookingData(prev => ({
					...prev,
					day: day,
					price: price?.online_price ? Number(price?.online_price) : 0 + calculateTotalPrice()
				}));
			};
			calculateDayCount()
		}
	}, [quantities, selectedExtras])

	// Function to handle quantity input change
	const handleQuantityChange = (i: number, value: number) => {
		const updatedQuantities = [...quantities];
		updatedQuantities[i] = value;
		setQuantities(updatedQuantities);
		const newTotalPrice = calculateTotalPrice(updatedQuantities, selectedExtras);

		setBookingData(prev => ({
			...prev,
			services: parsedServices
				.map((service, index) => ({
					title: service.service_name,
					price: Number(service.price),
					quantity: updatedQuantities[index],
				}))
				.filter(service => service.quantity > 0), // Only include items with quantity > 0
			price: newTotalPrice + (Number(dayPrices?.online_price) || 0),
		}));
	};

	// Function to handle checkbox change
	const handleExtraChange = (i: number) => {
		const updatedExtras = [...selectedExtras];
		updatedExtras[i] = !updatedExtras[i]; // Toggle the checkbox
		setSelectedExtras(updatedExtras);
		const newTotalPrice = calculateTotalPrice();
		
		setBookingData(prev => ({
			...prev,
			extra_services: parsedAddExtras.map((extra, index) => ({
				title: extra.service_name,
				price: Number(extra.price),
			})).filter((_, index) => updatedExtras[index]),
			price: newTotalPrice + (Number(dayPrices?.online_price) || 0),
		}));
	};

	// Function to calculate total price
	const calculateTotalPrice = (updatedQuantities = quantities, updatedSelectedExtras = selectedExtras) => {
		const serviceTotal = parsedServices?.reduce((sum, service, i) => {
			return sum + Number(service.price) * updatedQuantities[i];
		}, 0);

		const totalQuantity = updatedQuantities?.reduce((sum, quantity) => sum + quantity, 0);

		const extrasTotal = parsedAddExtras?.reduce((sum, extra, i) => {
			return totalQuantity !== 0
				? sum + (updatedSelectedExtras[i] ? Number(extra.price) * totalQuantity : 0)
				: sum + (updatedSelectedExtras[i] ? Number(extra.price) : 0);
		}, 0);

		return serviceTotal + extrasTotal;
	};


	return (
		<>
			<div className="content-booking-form">
				{
					(bookingLink === "null" || bookingLink === null) && (
						<>

							<div className="item-line-booking">
								<div className="box-tickets"><strong className="text-md-bold neutral-1000">{FormData?.service_title ? FormData?.service_title : ""}:</strong>
									{
										parsedServices && parsedServices.map((service: any, i: number) => (
											<div key={i} className="line-booking-tickets">
												<div className="item-ticket">
													<p className="text-md-medium neutral-500 mr-30">{service?.service_name}</p>
													<p className="text-md-medium neutral-500">{service?.price}€</p>
												</div>
												<input
													type="number"
													className="w-25 h-25 border-none text-md-medium neutral-500"
													defaultValue={0}
													min={0}
													onChange={(e) => handleQuantityChange(i, parseInt(e.target.value) || 0)}
												/>
											</div>
										))
									}
								</div>
							</div>
							<div className="item-line-booking">
								<div className="box-tickets"><strong className="text-md-bold neutral-1000">{FormData?.extra_service_title}:</strong>
									{
										parsedAddExtras && parsedAddExtras?.map((extra, i) => (
											<div key={i} className="line-booking-tickets">
												<div className="item-ticket">
													<ul className="list-filter-checkbox">
														<li>
															<label className="cb-container">
																<input
																	type="checkbox"
																	checked={selectedExtras[i]}
																	onChange={() => handleExtraChange(i)}
																/>
																<span className="text-sm-medium">{extra?.service_name} </span><span className="checkmark" />
															</label>
														</li>
													</ul>
												</div>
												<div className="include-price">
													<p className="text-md-bold neutral-1000">{extra?.price}€</p>
												</div>
											</div>
										))
									}
								</div>
							</div>
							<div className="item-line-booking">
								<input className="form-control mydatepicker hidden" type="text" />
							</div>
							<div className="item-line-booking last-item"> <strong className="text-md-bold neutral-1000">Total:</strong>
								<div className="line-booking-right">
									<p className="text-xl-bold neutral-1000">{dayPrices?.online_price ? <NumericFormat
                                        value={Number(dayPrices?.online_price) + calculateTotalPrice()}
                                        displayType="text"
                                        thousandSeparator={","}
                                        decimalSeparator="."
                                        decimalScale={2}
                                        fixedDecimalScale
                                        suffix='€'
                                    />:<NumericFormat
                                        value={bookingData?.price}
                                        displayType="text"
                                        thousandSeparator={","}
                                        decimalSeparator="."
                                        decimalScale={2}
                                        fixedDecimalScale
                                        suffix='€'
                                    />}</p>
								</div>
							</div>
						</>
					)
				}

				<div className="box-button-book" onClick={()=>{bookingLink === null && handleBooking()}}> <Link className="btn btn-book" href={bookingLink !== null ? bookingLink : "#"}>Book Now
					<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8 15L15 8L8 1M15 8L1 8" stroke='#0D0D0D' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg></Link></div>

			</div>

		</>
	)
}