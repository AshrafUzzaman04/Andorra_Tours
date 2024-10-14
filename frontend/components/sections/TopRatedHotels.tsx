'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { swiperGroupAnimate } from "@/util/swiperOption"
import Link from "next/link"

export interface HotelesDataItems {
    tag_slug: string;
    slug: string;
    id: number;
    top_title: string;
    top_sub_title: string;
    tag: string;
    image: string;
    title: string;
    sub_title: string;
    link: string;
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


export interface TopRatedHotelsTypes {
    data: HotelesDataItems[]
    headingData: HeadingDataItem
}

export default function TopRatedHotels({ data, headingData }: TopRatedHotelsTypes) {
    return (
        <>

            <section className="section-box box-top-rated background-1">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-md-9">
                        {headingData?.heading && <h2 className="neutral-1000">{headingData?.heading}</h2>}
                        {headingData?.heading && <p className="text-xl-medium neutral-500">{headingData?.sub_heading}</p>}
                        </div>
                        <div className="col-md-3 position-relative mb-30">
                            <div className="box-button-slider box-button-slider-team justify-content-end">
                                <div className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-animate">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" >
                                        <path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="swiper-button-next swiper-button-next-style-1 swiper-button-next-animate">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" >
                                        <path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-slider box-swiper-padding">
                    <div className="box-swiper mt-30">
                        <div className="swiper-container swiper-group-animate swiper-group-journey">
                            <Swiper {...swiperGroupAnimate}>
                                {
                                    data && data?.map((hotel, index) => (
                                        <SwiperSlide key={index}>
                                            <div className=" card-journey-small hotel-card-info background-card px-3 py-3 mb-3 text-center">
                                                <div className="card-left">
                                                    <div className="card-title"> <Link className="text-lg-bold neutral-1000" href={"/"+hotel?.tag_slug+"/"+hotel?.slug}>{hotel?.top_title}</Link></div>
                                                    <div className="card-desc"> <Link className="text-sm neutral-500" href={"/"+hotel?.tag_slug+"/"+hotel?.slug}>{hotel?.top_sub_title}</Link></div>
                                                </div>

                                            </div>
                                            <div className="card-journey-small background-card">
                                                <div className="card-image"> <Link className="hotelsTag" href="#">
                                                    <img width={50} height={50} className="" src={process?.env?.NEXT_PUBLIC_STORAGE_URL + hotel?.tag} alt="Travila" />
                                                </Link><img src={process?.env?.NEXT_PUBLIC_STORAGE_URL + hotel?.image} alt="Travila" />
                                                </div>
                                                <div className="card-info">
                                                    <div className="hotel-card-title"> <Link className="heading-6 neutral-1000" href={"/"+hotel?.tag_slug+"/"+hotel?.slug}>{hotel?.title}
                                                    </Link>
                                                    </div>
                                                    <div className="card-program">
                                                        <div className="card-location">
                                                            <p className="text-description text-md-medium neutral-500">{hotel?.sub_title}

                                                            </p>
                                                        </div>
                                                        <div className="buttonendtime">
                                                            <div className="card-button w-100"> <Link className="btn btn-gray w-100" href={"/"+hotel?.tag_slug+"/"+hotel?.slug}>A por ello</Link></div>
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