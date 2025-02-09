"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { swiperGroupAnimate } from "@/util/swiperOption"
import Link from "next/link"

export interface VeranoDataItem {
    id: number;
    label: string;
    reviews: string;
    total_reviews: string;
    reviews_link: string;
    title: string;
    price: string;
    booking_link: string;
    slug: string;
    photo: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface HeadingDataItem {
    id: number;
    heading_for: string;
    heading: string;
    sub_heading: string;
}

// Define the prop type for your component
export interface ExperienceVeranoSliderProps {
    veranoData: VeranoDataItem[];
    headingData: HeadingDataItem;
}

export default function ExperienceVeranoSlider({ veranoData ,headingData }: ExperienceVeranoSliderProps) {
    return (
        <>

            <section className="section-box box-our-featured background-body pt-60">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="text-center col-12 col-lg-12 mb-30 text-lg-start wow fadeInUp">
                            {headingData?.heading && <h2 className="text-center neutral-1000">{headingData?.heading}</h2>}
                            {headingData?.heading && <p className="text-center text-xl-medium neutral-500">{headingData?.sub_heading}</p>}
                        </div>
                    </div>
                </div>
                <div className="container-slider box-swiper-padding">
                    <div className="box-swiper mt-30">
                        <div className="pb-0 swiper-container swiper-group-animate swiper-group-journey">
                            <Swiper {...swiperGroupAnimate}>
                                {
                                    veranoData && veranoData?.map((verano, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="card-journey-small background-card">
                                                <div className="card-image"> <Link className={verano?.label === "Top Rated" ? "label":verano?.label === "Best Sale" ? "label bestsale":"label saleoff"} href="#">{verano?.label}</Link><Link className="wish" href="#">
                                                    <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                    </svg></Link><img src={process?.env?.NEXT_PUBLIC_STORAGE_URL+verano?.photo} alt="Travila" />
                                                </div>
                                                <div className="card-info background-card">
                                                    <div className="card-rating">
                                                        <div className="card-left"> </div>
                                                        <div className="card-right"> <span className="rating">{verano?.reviews} <span className="text-sm-medium neutral-500">({verano?.total_reviews} reviews)</span></span>
                                                        </div>
                                                    </div>
                                                    <div className="card-title"> <Link className="heading-6 neutral-1000" href={"/summer/"+verano?.slug}>{verano?.title}</Link>
                                                    </div>
                                                    <div className="card-program">
                                                        <div className="card-duration-tour">

                                                        </div>
                                                        <div className="endtime">
                                                            <div className="card-price">
                                                                <p className="text-md-medium neutral-500 me-2"> Desde / </p>
                                                                <h6 className="heading-6 neutral-1000"> {verano?.price} € </h6>
                                                            </div>
                                                            <div className="card-button"> <Link className="btn btn-gray" target="_blank" href={"/summer/"+verano?.slug}>Book Now</Link></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}