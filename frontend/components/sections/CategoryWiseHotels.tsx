'use client'
import { swiperGroup1 } from "@/util/swiperOption"
import useReview from "@/util/useReview";
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import parse from 'html-react-parser';
export interface Hotel {
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
    categorie:{
        id:number;
        slug:string;
        tag:string;
        tag_slug:string;
    }
}
export default function CategoryWiseHotels({hotel}:{hotel:Hotel}) {
    const stars = useReview(hotel?.review);
    return (
        <main className="main">
            <section className="box-section box-breadcrumb background-body">
                <div className="container">
                    <ul className="breadcrumbs">
                        <li> <Link href="/">Home</Link><span className="arrow-right">
                            <svg width={7} height={12} viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 11L6 6L1 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg></span></li>
                        <li> <Link href={"/"+hotel?.categorie?.tag_slug + "/" + hotel?.categorie?.slug}>Hotels</Link><span className="arrow-right">
                            <svg width={7} height={12} viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 11L6 6L1 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg></span></li>
                        <li> <span className="text-breadcrumb">{hotel?.title}</span></li>
                    </ul>
                </div>
            </section>
            <section className="section-box box-banner-home3 box-banner-hotel-detail background-body">
                <div className="container">
                    <div className="box-swiper mt-0">
                        <div className="swiper-container swiper-group-1">
                            <Swiper {...swiperGroup1}>
                                <SwiperSlide>
                                    <div className="item-banner-box position-relative" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_STORAGE_URL+hotel?.photo})` }}>
                                        <img className="position-absolute end-0 top-0 z-2" src={process.env.NEXT_PUBLIC_STORAGE_URL+hotel?.categorie?.tag} alt={hotel?.categorie?.tag} />
                                        <div className="item-banner-box-inner"> 
                                            <span className="btn btn-white-sm">
                                                {stars}
                                            </span>
                                            <h1 className="mt-20 mb-20 color-white">Welcom to<br className="d-none d-lg-block" />{hotel?.title}</h1>
                                            {/* <ul className="list-disc">
                                                <li>Spacious and Well-Appointed Rooms</li>
                                                <li>Fine Dining Restaurants</li>
                                                <li>Exclusive Spa and Wellness Facilities</li>
                                            </ul> */}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                            <div className="swiper-pagination swiper-pagination-group-1 swiper-pagination-style-1" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-box box-partners box-hotel-facilities-list background-body"></section>
            <section className="section-box box-payments box-vision background-body">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-30">
                            <div className="box-right-payment"><span className="btn btn-brand-secondary">Welcome to {hotel?.title}</span>
                                <h2 className="title-why mb-25 mt-10 neutral-1000">{hotel?.title}</h2>
                                <div className="text-lg-medium neutral-500 mb-35">
                                    {parse(hotel?.description)}
                                </div>
                                <div className="box-telephone-booking">
                                    <div className="box-tel-left">

                                    </div>
                                    <div className="box-tel-right">
                                        <Link className="btn btn-tag" href={hotel?.hotel_link}>Availability Rooms
                                            <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-6 mb-30 text-center text-lg-end">
                            <div className="box-image-vision"> <img className="w-100" src={process.env.NEXT_PUBLIC_STORAGE_URL+hotel?.photo_one} alt="Travila" />
                                <div className="image-vision-1"><img className="w-100 mb-15" src={process.env.NEXT_PUBLIC_STORAGE_URL+hotel?.photo_two} alt="Travila" /></div>
                                <div className="image-vision-2"><img className="w-100" src={process.env.NEXT_PUBLIC_STORAGE_URL+hotel?.photo_three} alt="Travila" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
           

        </main>
    )
}
