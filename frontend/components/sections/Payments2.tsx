"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { swiperGroupAnimate } from "@/util/swiperOption"
import Link from "next/link";
export interface PromotionData {
    id: number;
    banner_color: string;
    button_text: string;
    button_text_color: string;
    button_link: string;
    title: string;
    company_logo:string;
    description: string;
    image_one: string;
    image_two: string;
    image_three: string;
    image_four: string;
    image_five: string;
    status: string;
    created_at: string;
    updated_at: string;
}
export interface PromotionDataTypes {
    promotionData: PromotionData[];
}
export default function Payments2({ promotionData }: PromotionDataTypes) {
    return (
        <>

            <section className="section-box box-payments box-payments-2 background-body">
                <div className="container-slider box-swiper-padding">
                    <div className="container overflow-hidden">
                        <Swiper {...swiperGroupAnimate}>
                            {
                                promotionData && promotionData?.map((promotion, index) => (
                                    <SwiperSlide key={index}>
                                        <div className={`box-payment-style-2 light-mode`} style={{ backgroundColor: promotion?.banner_color }}>
                                            <div className="row align-items-center">
                                                <div className="col-lg-6 mb-30">
                                                    <div className="box-left-payment">
                                                        <div className="">
                                                            <img className="bdrd8 w-50" src={process.env.NEXT_PUBLIC_STORAGE_URL +promotion?.company_logo} alt="" />
                                                        </div>
                                                        <h4 className="mb-25 neutral-1000">{promotion?.title}</h4>
                                                        <p className="text-xl-medium neutral-500 mb-35 promotion-desc">{promotion?.description}</p>
                                                        <div className="d-flex align-items-center">
                                                            <Link href="#"><span className="btn btn-tag-white">{promotion?.button_text}</span></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="box-image-payment-2">
                                                        <div className="row align-items-center">
                                                            <div className="col-sm-4 mb-30">
                                                                <img className="bdrd8 w-100" src={process.env.NEXT_PUBLIC_STORAGE_URL + promotion?.image_one} alt="image-one" />
                                                            </div>
                                                            <div className="col-sm-4 mb-30">
                                                                <img className="bdrd8 w-100 mb-15" src={process.env.NEXT_PUBLIC_STORAGE_URL + promotion?.image_two} alt="image_two" />
                                                                <img className="bdrd8 w-100 mb-15" src={process.env.NEXT_PUBLIC_STORAGE_URL + promotion?.image_three} alt="image_three" />
                                                            </div>
                                                            <div className="col-sm-4 mb-30">
                                                                <img className="bdrd8 w-100" src={process.env.NEXT_PUBLIC_STORAGE_URL + promotion?.image_four} alt="image_four" />
                                                                <img className="bdrd8 w-100" src={process.env.NEXT_PUBLIC_STORAGE_URL + promotion?.image_five} alt="image_five" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`box-payment-style-2 dark-mode background-${index + 1}`}>
                                            <div className="row align-items-center">
                                                <div className="col-lg-6 mb-30">
                                                    <div className="box-left-payment">
                                                        <div className="">
                                                            <img className="bdrd8 w-50" src={process.env.NEXT_PUBLIC_STORAGE_URL +promotion?.company_logo} alt="" />
                                                        </div>
                                                        <h4 className="mb-25 neutral-1000">{promotion?.title}</h4>
                                                        <p className="text-xl-medium neutral-500 mb-35 promotion-desc">{promotion?.description}</p>
                                                        <div className="d-flex align-items-center">
                                                            <Link href={promotion?.button_link}><span className="btn btn-tag-white">{promotion?.button_text}</span></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="box-image-payment-2">
                                                        <div className="row align-items-center">
                                                            <div className="col-sm-4 mb-30">
                                                                <img className="bdrd8 w-100" src={process.env.NEXT_PUBLIC_STORAGE_URL + promotion?.image_one} alt="image-one" />
                                                            </div>
                                                            <div className="col-sm-4 mb-30">
                                                                <img className="bdrd8 w-100 mb-15" src={process.env.NEXT_PUBLIC_STORAGE_URL + promotion?.image_two} alt="image_two" />
                                                                <img className="bdrd8 w-100 mb-15" src={process.env.NEXT_PUBLIC_STORAGE_URL + promotion?.image_three} alt="image_three" />
                                                            </div>
                                                            <div className="col-sm-4 mb-30">
                                                                <img className="bdrd8 w-100" src={process.env.NEXT_PUBLIC_STORAGE_URL + promotion?.image_four} alt="image_four" />
                                                                <img className="bdrd8 w-100" src={process.env.NEXT_PUBLIC_STORAGE_URL + promotion?.image_five} alt="image_five" />
                                                            </div>
                                                        </div>
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

            </section>

        </>
    )
}
