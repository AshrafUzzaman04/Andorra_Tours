import Link from "next/link"
import BannerOfferSlider from "../slider/BannerOfferSlider"

export default function Banner() {
    return (
        <>

            <section className="section-box box-2-banner background-body">
                <div className="container">
                    <div className="wow fadeInUp pt-40">
						<div className="box-swiper pt-30">
							<div className="swiper-container swiper-group-3">
                            <BannerOfferSlider/>
							</div>
						</div>
					</div>
                </div>
            </section>
        </>
    )
}
