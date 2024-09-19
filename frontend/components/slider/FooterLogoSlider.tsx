'use client'
import { footerLogosSlider } from "@/util/swiperOption"
import { Swiper, SwiperSlide } from "swiper/react"
export interface PartnerData {
    id: number;
    partner_name: string;
    partner_logo: string;
    status: string;
    created_at: string;
    updated_at: string;
}
export interface Partners {
    partners: PartnerData[];
}
export default function FooterLogoSlider({ partners }: Partners) {
    return (
        <>
            <section className=" ">
                <div className="container wow fadeInUp">
                    <div className="box-swiper mt-30">
                        <div className="swiper-container swiper-group-payment-7">
                            <Swiper {...footerLogosSlider}>
                                {
                                    partners && partners?.map((partner, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="item-logo-payment"> <img src={process.env.NEXT_PUBLIC_STORAGE_URL+partner?.partner_logo} alt="Travila" /></div>
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