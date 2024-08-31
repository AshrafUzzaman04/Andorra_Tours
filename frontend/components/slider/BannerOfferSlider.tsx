'use client'
import { swiperBannerOffer } from "@/util/swiperOption"
import { ArrowRightIcon } from "@heroicons/react/16/solid"
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react"
export interface promotionData {
    id: number,
    banner_title: string,
    banner_title_color: string,
    button_text: string,
    button_color: string,
    button_text_color: string,
    button_link: string,
    banner_image: string,
    status: string,
    created_at: string,
    updated_at: string
}
export interface promotionTypesData {
    promotionData: promotionData[]
}
export default function BannerOfferSlider({ promotionData }: promotionTypesData) {
    return (
        <>
            <Swiper {...swiperBannerOffer}>
                {
                    promotionData && promotionData?.map((promotion, index) => (
                        <SwiperSlide key={index}>
                            <div className="card-banner">
                                <div className="card-image"> <img src={process?.env?.NEXT_PUBLIC_STORAGE_URL + promotion?.banner_image} alt="Travila" />
                                </div>
                                <div className="card-info">
                                    <h4 style={{ width: "251px" }} className="fs-2">{promotion?.banner_title}</h4>
                                    <Link href={promotion?.button_link}>
                                        <button className="btn btn-secondary fw-bold fs-6 rounded-pill border-0" style={{backgroundColor:promotion?.button_color, color:promotion?.button_text_color}}>
                                            {promotion?.button_text}
                                            {/* <svg  width={16} height={16} color={promotion?.button_text_color} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                            </svg> */}
                                            <ArrowRightIcon width={16} height={16} className=" ms-2" />
                                        </button>
                                        
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </>
    )
}
