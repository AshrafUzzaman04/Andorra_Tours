'use client'
import ByHotelLocation from '@/components/Filter/ByHotelLocation'
import ByHotelPagination from '@/components/Filter/ByHotelPagination'
import ByTopHotelType from '@/components/Filter/ByTopHotelType'
import ByTopRating from '@/components/Filter/ByTopRating'
import HotelCard from '@/components/elements/hotelcard/HotelCard'
import { ChangeEvent } from 'react'
import SortTopHotelsFilter from '../elements/SortTopHotelsFilter'
import useTopFilter from '@/util/useTopFilter'

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

export default function HotelGrid({ hotelData, slug, locationBase, hotelTypeBase, reviewsBase }: HotesDataType) {
	const {
		hotelsData,
		page,
		setPage,
		perPage,
		setPerPage,
		sortedBy,
		setSortedBy,
		filterByType,
		filterByLocation,
		filterByReview,
		handleClearFilters,
		handleCheckboxChange,
		handleLocationCheckboxChange,
		handleReviewCheckboxChange
	} = useTopFilter(hotelData, slug)

	return (
		<>
			<main className="main">
				<section className="box-section block-banner-tourlist position-relative" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_STORAGE_URL + hotelData?.image})`, backgroundPosition: "center" }}>
					<img className="position-absolute end-0 top-0 z-2" src={process.env.NEXT_PUBLIC_STORAGE_URL + hotelData?.tag} alt={hotelData?.tag} />
					<div className="container text-center">
						<div className="text-center bg-black d-inline-block justify-items-center bg-opacity-25 rounded p-2">
							<h3 className="">{hotelData?.title}</h3>
							<h6 className="heading-6-medium text-white">{hotelData?.sub_title}</h6>
						</div>
					</div>
				</section>

				<section className="box-section block-content-tourlist background-body">
					<div className="container">
						<div className="box-content-main">
							<div className="content-right">
								<div className="box-filters mb-25 pb-5 border-bottom border-1">
									<SortTopHotelsFilter
										name={slug}
										sortCriteria={sortedBy}
										handleSortChange={(e: ChangeEvent<HTMLSelectElement>) => { setSortedBy(e.target.value) }}
										itemsPerPage={perPage}
										handleItemsPerPageChange={(e: ChangeEvent<HTMLSelectElement>) => { setPerPage(Number(e.target.value)) }}
										handleClearFilters={handleClearFilters}
										startItemIndex={hotelsData.hotels?.from}
										endItemIndex={hotelsData.hotels?.to}
										sortedHotels={hotelsData.hotels?.total}
									/>
								</div>
								<div className="box-grid-tours wow fadeIn">
									<div className="row">
										{hotelsData?.hotels?.data?.map((hotel) => (
											<div key={hotel.id} className="col-xl-4 col-lg-6 col-md-6">
												<HotelCard hotel={hotel} />
											</div>
										))}
									</div>
								</div>
								<ByHotelPagination
									handlePreviousPage={() => setPage(page - 1)}
									totalPages={hotelsData?.hotels?.last_page}
									currentPage={hotelsData?.hotels?.current_page}
									handleNextPage={() => setPage(page + 1)}
									page={page}
									handlePageChange={(page: number) => setPage(page)}
								/>
							</div>

							<div className="content-left order-lg-first">

								{/* <div className="sidebar-left border-1 background-body">
									<div className="box-filters-sidebar">
										<div className="block-filter border-1">
											<h6 className="text-lg-bold item-collapse neutral-1000">Hotel Type</h6>
											<ByTopHotelType
												uniqueHotelsType={hotelTypeBase}
												filter={hotelTypeBase}
												checked={filterByType}
												handleCheckboxChange={handleCheckboxChange}
											/>
										</div>
									</div>
								</div> */}

								{/* <div className="sidebar-left border-1 background-body">
									<div className="box-filters-sidebar">
										<div className="block-filter border-1">
											<h6 className="text-lg-bold item-collapse neutral-1000">Review Score </h6>
											<ByTopRating
												uniqueRatings={reviewsBase}
												filter={filterByReview}
												handleCheckboxChange={handleReviewCheckboxChange}
											/>
										</div>
									</div>
								</div> */}
								<div className="sidebar-left border-1 background-body">
									<div className="box-filters-sidebar">
										<div className="block-filter border-1 z-2">
											<h6 className="text-lg-bold item-collapse neutral-1000">Booking Location</h6>
											<ByHotelLocation
												uniqueLocations={locationBase}
												checked={filterByLocation}
												filter={locationBase}
												handleCheckboxChange={handleLocationCheckboxChange} />
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
					
					
				</section>

			</main>
		</>
	)
}