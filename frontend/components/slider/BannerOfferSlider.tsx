'use client'
import { swiperBannerOffer } from "@/util/swiperOption"
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react"

export default function BannerOfferSlider() {
	return (
		<>
			<Swiper {...swiperBannerOffer}>
				<SwiperSlide>
                <div className="card-banner">
                                <div className="card-image"> <img src="/assets/imgs/page/homepage2/banner1.png" alt="Travila" />
                                </div>
                                <div className="card-info">
                                    <h4>Waking up <br className="d-none d-md-block" />in a far <br className="d-none d-md-block" />away
                                        place</h4><Link className="btn btn-brand-secondary" href="#">View More
                                        <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        </svg></Link>
                                </div>
                            </div>
				</SwiperSlide>
				<SwiperSlide>
                <div className="card-banner">
                                <div className="card-image"> <img src="/assets/imgs/page/homepage2/banner2.png" alt="Travila" />
                                </div>
                                <div className="card-info">
                                    <h5>Big promotion <br className="d-none d-md-block" />at the end of <br className="d-none d-md-block" />the year</h5><Link className="btn btn-brand-secondary" href="#">View More
                                        <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        </svg></Link>
                                </div>
                            </div>
				</SwiperSlide>
                <SwiperSlide>
                <div className="card-banner">
                                <div className="card-image"> <img src="/assets/imgs/page/homepage2/banner2.png" alt="Travila" />
                                </div>
                                <div className="card-info">
                                    <h5>Big promotion <br className="d-none d-md-block" />at the end of <br className="d-none d-md-block" />the year</h5><Link className="btn btn-brand-secondary" href="#">View More
                                        <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        </svg></Link>
                                </div>
                            </div>
				</SwiperSlide>
			</Swiper>
		</>
	)
}
