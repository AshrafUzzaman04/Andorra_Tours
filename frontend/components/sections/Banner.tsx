import Axios from "@/helper/axios"
import BannerOfferSlider from "../slider/BannerOfferSlider"
const getData = async () =>{
    const res = await Axios.get("/promotions")
    return res.data?.data
}
export default async function Banner() {
    const promotionData = await getData();
    return (
        <>

            <section className="section-box box-2-banner background-body">
                <div className="container">
                    <div className="wow fadeInUp pt-40">
						<div className="box-swiper pt-30">
							<div className="swiper-container swiper-group-3">
                            <BannerOfferSlider promotionData={promotionData}/>
							</div>
						</div>
					</div>
                </div>
            </section>
        </>
    )
}
