'use client'
import { footerLogosSlider } from "@/util/swiperOption"
import { Swiper, SwiperSlide } from "swiper/react"
export default function FooterLogoSlider() {
    return (
        <>
            <section className=" ">
                <div className="container wow fadeInUp">
                    <div className="box-swiper mt-30">
                        <div className="swiper-container swiper-group-payment-7">
                            <Swiper {...footerLogosSlider}>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/paypal.png" alt="Travila" /></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/stripe.png" alt="Travila" /></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/payoneer.png" alt="Travila" /></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/visa.png" alt="Travila" /></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/cashapp.png" alt="Travila" /></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/bitcoin.png" alt="Travila" /></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/discover.png" alt="Travila" /></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/paypal.png" alt="Travila" /></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/stripe.png" alt="Travila" /></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/payoneer.png" alt="Travila" /></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/visa.png" alt="Travila" /></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/cashapp.png" alt="Travila" /></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/bitcoin.png" alt="Travila" /></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-logo-payment"> <img src="/assets/imgs/page/destination/discover.png" alt="Travila" /></div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}