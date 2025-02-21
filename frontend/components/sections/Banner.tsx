import Axios from "@/helper/axios";
import BannerOfferSlider from "../slider/BannerOfferSlider";
import Fetch from "@/helper/Fetch";
const getData = async () => {
  const res = await Fetch.get("/promotions");
  return res.data?.data;
};
export default async function Banner() {
  const promotionData = await getData();
  return (
    <>
      <section className="section-box box-2-banner background-body">
        <div className="container">
          <div className="pt-40 wow fadeInUp">
            <div className="box-swiper pt-30">
              <div className="swiper-container swiper-group-3">
                <BannerOfferSlider promotionData={promotionData} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
