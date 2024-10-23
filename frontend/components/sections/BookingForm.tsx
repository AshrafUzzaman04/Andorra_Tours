"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import "flatpickr/dist/themes/dark.css";
import flatpickr from "flatpickr";
import Fetch from "@/helper/Fetch";
import { NumericFormat } from "react-number-format";

export interface VeranoDetailsType {
	for?: string;
	id: number;
	verano_id: number;
	duration: string;
	duration_title: string;
	group_size: string;
	group_size_title: string;
	tour_type: string;
	tour_type_title: string;
	language: string;
	language_title: string;
	details: string; // This is a string that will be parsed
	pricing: string;
	form_title: string;
	times: string; // This is a string that will be parsed
	service_title: string;
	services: string; // This is a string that will be parsed
	add_extra_title: string;
	add_extra: string; // This is a string that will be parsed
	question_title: string;
	answers: string; // This is a string that will be parsed
	status: string;
	created_at: string;
	updated_at: string;
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
	bookingLink: string
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
	const parsedTimes: TimeSlot[] = JSON.parse(FormData?.times || '[]');
	const parsedServices: ServiceItem[] = JSON.parse(FormData?.services || '[]');
	const parsedAddExtras: ExtraService[] = JSON.parse(FormData?.add_extra || '[]');
	const pricing = JSON.parse(FormData?.pricing || '[]');
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
		price: 0
	});
	const addDays = pricing.length === 0 ? pricing.length : pricing.length - 1;
	function handleBooking() {
		alert(JSON.stringify(bookingData, null, 2)); // Indentation of 2 spaces
	}
	useEffect(() => {
		flatpickr(".mydatepicker", {
			dateFormat: "Y/m/d",
			mode: "range", // Use range mode
			inline: true, // Keep the calendar always open
			onChange: (dates: Date[]) => {
				// Update selected dates
				setSelectedDates(dates);
				// Update min and max dates based on selection
				if (dates.length > 0) {
					const earliestDate = new Date(Math.min(...dates.map(date => date.getTime())));
					const latestDate = new Date(earliestDate);
					latestDate.setDate(earliestDate.getDate() + addDays); // Set max date as 10 days from the earliest date

					setMinDate(earliestDate);
					setMaxDate(latestDate);
				} else {
					setMinDate(null);
					setMaxDate(null);
				}
			},
			disable: [(date: Date) => {
				// Disable all dates outside the selected range (10 days from the earliest selected date)
				if (minDate) {
					const endDate = new Date(minDate);
					endDate.setDate(endDate.getDate() + addDays); // Calculate the end date as 10 days from minDate

					return date < minDate || date > endDate; // Disable dates outside the 10-day range
				}
				return false; // Enable all dates if no selection
			}],
			disableMobile: false
		});
		// Clean up the Flatpickr instance on component unmount
	}, [minDate, maxDate,addDays]);
	useEffect(() => {
		if (selectedDates?.length === 0) return;
		const calculateDayCount = async () => {
			const startDate = selectedDates[0]; // Start date
			const endDate = selectedDates[1]; // End date

			if (!startDate) {
				console.error("No start date selected.");
				return;
			}

			const timeDifference = endDate
				? Math.abs(endDate.getTime() - startDate.getTime())
				: 0;

			const day = endDate ? Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1 : 1;

			const res = await Fetch.post("/price", { id: FormData?.id, for: FormData?.for, day: day });
			const price = res?.data;
			setDayPrices(price);
			setBookingData(prev => ({
				...prev,
				day: day,
				price: Number(price?.online_price) + calculateTotalPrice()
			}));
		};
		calculateDayCount()
	}, [selectedDates]);

	useEffect(() => {
		if ((bookingLink === "null" || bookingLink === null) && selectedDates?.length === 0) {
			const calculateDayCount = async () => {
				const day = 1
				const res = await Fetch.post("/price", { id: FormData?.id, for: FormData?.for, day: day });
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
		const newTotalPrice = calculateTotalPrice();

		setBookingData(prev => ({
			...prev,
			services: parsedServices.map((service, index) => ({
				title: service.service_name,
				price: Number(service.price),
				quantity: updatedQuantities[index],
			})),
			price: newTotalPrice + (Number(dayPrices?.online_price) || 0), // Add online price if available
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
	const calculateTotalPrice = () => {
		const serviceTotal = parsedServices?.reduce((sum, service, i) => {
			return sum + Number(service.price) * quantities[i];
		}, 0);
		const totalSum = quantities?.reduce((sum, value) => sum + value, 0);
		const extrasTotal = parsedAddExtras?.reduce((sum, extra, i) => {
			return totalSum !== 0 ? sum + (selectedExtras[i] ? Number(extra.price) * totalSum : 0) : sum + (selectedExtras[i] ? Number(extra.price) : 0);
		}, 0);

		return serviceTotal + extrasTotal; // Combine both totals
	};

	const handleTimeChange = (event: { target: { value: any; }; }) => {
		const selectedTime = event.target.value;
		// Update the bookingData state with the selected time
		setBookingData((prevData) => ({
			...prevData,
			time: selectedTime
		}));
	};

	return (
		<>
			<div className="content-booking-form">
				{
					(bookingLink === "null" || bookingLink === null) && (
						<>

							<div className="item-line-booking">
								<div className="line-booking-right">
									<div className="row">
										{parsedTimes?.length !== 0 && <strong className="text-md-bold neutral-1000">Times:</strong>}
										{
											parsedTimes?.length !== 0 && parsedTimes?.map((time: any, i: any) => (
												<div key={i} className="col-md-3">
													<label className="ms-0">
														{time?.time && <input
															type="radio"
															name="time"
															value={time?.time} // Set the radio button value
															checked={bookingData.time === time?.time} // Reflect selected state
															onChange={handleTimeChange} // Update state on change
														/>}{time?.time}
													</label>
												</div>
											))
										}
									</div>
								</div>
							</div>
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
								<div className="box-tickets"><strong className="text-md-bold neutral-1000">{FormData?.add_extra_title}:</strong>
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
									/> : <NumericFormat
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

				<div className="box-button-book" onClick={() => { bookingLink === null && handleBooking() }}> <Link className="btn btn-book" href={bookingLink !== null ? bookingLink : "#"}>Book Now
					<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8 15L15 8L8 1M15 8L1 8" stroke='#0D0D0D' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg></Link></div>

			</div>

		</>
	)
}