'use client';
import Fetch from "@/helper/Fetch";
import { ChangeEvent, useEffect, useState } from "react";
export interface HotelData {
	map(arg0: (hotel: any) => import("react").JSX.Element): import("react").ReactNode
	id: number;
	top_title: string;
	top_sub_title: string;
	tag_title: string;
	tag_slug: string;
	tag: string;
	image: string;
	title: string;
	slug: string;
	sub_title: string;
	link: string;
	hotels: {
		current_page: number;
		data: HotelsType[];
		first_page_url: string;
		from?: string | number;
		last_page: number;
		last_page_url: string;
		links: linksType[];
		next_page_url: null,
		path: string,
		per_page: number,
		prev_page_url: string,
		to: null | number | string,
		total: number
	};
}


export interface linksType {
	url: string;
	label: string;
	active: boolean | string;
}
export interface HotelsType {
	id: number;
	categorie_id: number;
	photo: string;
	photo_one: string;
	photo_two: string;
	photo_three: string;
	review: string;
	total_review: string;
	title: string;
	slug: string;
	location: string;
	map_location: string;
	tag: string;
	hotel_link: string;
	description: string;
	price: number; // Add this if needed
	hotelType: string; // Add this if needed
	amenities: string[]; // Add this if needed
	rating: number; // Add this if needed
}

export interface locationBase {
	location: string;
	count: number
}

export interface hotelTypeBase {
	hotel_type: string;
	count: number
}
export interface reviewsBase {
	review: string;
	count: number
}

export interface HotesDataType {
	hotelData: HotelData;
	slug: string;
	locationBase: locationBase[];
	hotelTypeBase: hotelTypeBase[];
	reviewsBase: reviewsBase[];
}

export interface Hotel {
	id: number;
	title: string;
	location: string;
	photo: string;
	rating: number;
	price: number;
	hotelType: string;
	review: string;
	total_review: string;
	map_location: string;
	tag: string;
	hotel_link: string;
	description: string;
}
export interface FilterByType {
	hotel_type: string[]; // Array of hotel types
}

export interface params {
	page: number;
	per_page: number;
	sort_by?: string;
	hotel_type?: [] | string;
	location?: string;
	review?: string;
}

// The main hook
const useTopFilter = (hotelData: HotelData, slug:string) => {
	const [hotelsData, setHotelsData] = useState<HotelData>(hotelData);
	const [perPage, setPerPage] = useState<number>(10);
	const [sortedBy, setSortedBy] = useState<string>("");
	const [filterByType, setFilterByType] = useState("");
	const [filterByLocation, setFilterByLocation] = useState("");
	const [filterByReview, setFilterByReview] = useState("");

    useEffect(() => {
		const getPrPageData = async () => {
			const params: params = {
				page: 1,
				per_page: perPage
			};
			if (sortedBy) {
				params.sort_by = sortedBy;
			}
			if (filterByType) {
				params.hotel_type = filterByType;
			}
			if (filterByLocation) {
				params.location = filterByLocation;
			}
			if (filterByReview) {
				params.review = filterByReview;
			}

			const response = await Fetch.get(`top-hotels/${slug}`, { params });
			setHotelsData(response?.data?.data?.category || []);
		}
		getPrPageData();
	}, [perPage, sortedBy, filterByType, filterByLocation, filterByReview])

	const handleClearFilters = () => {
		setPerPage(10);
		setSortedBy("title");
		setFilterByType("");
	}

	const handleCheckboxChange = (hotelType: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		if (checked) {
			setFilterByType(hotelType);
		} else {
			setFilterByType("");
		}
	};

	const handleLocationCheckboxChange = (location: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		if (checked) {
			setFilterByLocation(location);
		} else {
			setFilterByLocation("");
		}
	};

	const handleReviewCheckboxChange = (review: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		if (checked) {
			setFilterByReview(review);
		} else {
			setFilterByReview("");
		}
	};

    return {
        hotelsData,
        perPage, 
        setPerPage,
        sortedBy, 
        setSortedBy,
        filterByType,
        setFilterByType,
        filterByLocation, 
        setFilterByLocation,
        filterByReview,
        setFilterByReview,
        handleClearFilters,
        handleCheckboxChange,
        handleLocationCheckboxChange,
        handleReviewCheckboxChange
    };
};

export default useTopFilter;

