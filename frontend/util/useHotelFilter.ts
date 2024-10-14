'use client';
import { ChangeEvent, useState } from "react";

// Define the Hotel interface without nesting
export interface Hotel {
	id: number;
	title: string;
	location: string;
	photo: string;
	rating: number;
	price: number;
	hotelType: string;
	amenities: string[];
	review: string;
	total_review: string;
	map_location: string;
	tag: string;
	hotel_link: string;
	description: string;
}

// Define the Filter interface
export interface Filter {
    names: string[];
    roomStyle: string[];
    amenities: string[];
    locations: string[];
    priceRange: [number, number];
    ratings: number[];
    hotelType: string[];
}

// Define the SortCriteria type
type SortCriteria = "name" | "price" | "rating";

// The main hook
const useHotelFilter = (transformedHotels: Hotel[]) => {
    const [filter, setFilter] = useState<Filter>({
        names: [],
        roomStyle: [],
        amenities: [],
        locations: [],
        priceRange: [0, 500],
        ratings: [],
        hotelType: [],
    });
    
    const [sortCriteria, setSortCriteria] = useState<SortCriteria>("name");
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Unique values extraction
	//[...new Set(transformedHotels.map((hotel) => hotel.name))]
    const uniqueNames = 0;
	//[...new Set(transformedHotels.map((hotel) => hotel.roomStyle))]
    const uniqueRoomStyles = 0;
    const uniqueAmenities = [...new Set(transformedHotels.map((hotel) => hotel.amenities))];
    const uniqueLocations = [...new Set(transformedHotels.map((hotel) => hotel.location))];
    const uniqueRatings = [...new Set(transformedHotels.map((hotel) => hotel.rating))];
    const uniqueHotelsType = [...new Set(transformedHotels.map((hotel) => hotel.hotelType))];

    // Filtering hotels
    const filteredHotels = transformedHotels.filter((hotel) => {
        return (
            //(filter.names.length === 0 || filter.names.includes(hotel.name)) &&
            //(filter.roomStyle.length === 0 || filter.roomStyle.includes(hotel.roomStyle)) &&
            //(filter.amenities.length === 0 || filter.amenities.includes(hotel.amenities)) &&
            (filter.locations.length === 0 || filter.locations.includes(hotel.location)) &&
            (hotel.price >= filter.priceRange[0] && hotel.price <= filter.priceRange[1]) &&
            (filter.ratings.length === 0 || filter.ratings.includes(hotel.rating)) &&
            (filter.hotelType.length === 0 || filter.hotelType.includes(hotel.hotelType))
        );
    });

    // Sorting hotels
    const sortedHotels = [...filteredHotels].sort((a, b) => {
        if (sortCriteria === "name") {
            //return a.name.localeCompare(b.name);
        } else if (sortCriteria === "price") {
            return a.price - b.price;
        } else if (sortCriteria === "rating") {
            return b.rating - a.rating;
        }
        return 0;
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedHotels.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedHotels = sortedHotels.slice(startIndex, endIndex);

    // Handlers for filter checkboxes
    const handleCheckboxChange = (field: keyof Filter, value: string | number) => (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setFilter((prevFilter) => {
            const values = prevFilter[field] as (string | number)[];
            if (checked) {
                return { ...prevFilter, [field]: [...values, value] };
            } else {
                return {
                    ...prevFilter,
                    [field]: values.filter((item) => item !== value),
                };
            }
        });
    };

    // Sorting handler
    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortCriteria(e.target.value as SortCriteria);
    };

    // Price range change handler
    const handlePriceRangeChange = (values: [number, number]) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            priceRange: values,
        }));
    };

    // Items per page change handler
    const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page on items per page change
    };

    // Page change handler
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Previous page handler
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Next page handler
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Clear filters handler
    const handleClearFilters = () => {
        setFilter({
            names: [],
            roomStyle: [],
            amenities: [],
            locations: [],
            priceRange: [0, 500],
            ratings: [],
            hotelType: [],
        });
        setSortCriteria("name");
        setItemsPerPage(10); // Reset to default
        setCurrentPage(1);
    };

    // Indexes for pagination display
    const startItemIndex = (currentPage - 1) * itemsPerPage + 1;
    const endItemIndex = Math.min(startItemIndex + itemsPerPage - 1, sortedHotels.length);

    return {
        filter,
        setFilter,
        sortCriteria,
        setSortCriteria,
        itemsPerPage,
        setItemsPerPage,
        currentPage,
        setCurrentPage,
        uniqueNames,
        uniqueRoomStyles,
        uniqueAmenities,
        uniqueLocations,
        uniqueRatings,
        uniqueHotelsType,
        filteredHotels,
        sortedHotels,
        totalPages,
        startIndex,
        endIndex,
        paginatedHotels,
        handleCheckboxChange,
        handleSortChange,
        handlePriceRangeChange,
        handleItemsPerPageChange,
        handlePageChange,
        handlePreviousPage,
        handleNextPage,
        handleClearFilters,
        startItemIndex,
        endItemIndex,
    };
};

export default useHotelFilter;
