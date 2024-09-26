import Banner from "@/components/sections/Banner";
import BannerHome1 from "@/components/sections/BannerHome1";
import WhyTravelUs from "@/components/sections/WhyTravelUs";
import ExclusiveService from "@/components/sections/ExclusiveService";
import { ExperienceInverano } from "@/components/sections/ExperienceInverano";
import { ExperienceVerano } from "@/components/sections/ExperienceVerano";
import MasterLayout from "@/components/layout/MasterLayout";
import HotelesTopRated from "@/components/sections/HotelsTopRated";
import Iframe from "@/components/sections/Iframe";
import Testimonial from "@/components/sections/Testimonial";
import Promotion from "@/components/sections/Promotion";

export default function Home() {
  return (
    <>
      <MasterLayout headerStyle={1} footerStyle={5}>
        <BannerHome1 />
        <Iframe />
        <ExperienceVerano />
        <ExperienceInverano />
        <Banner />
        <ExclusiveService />
        <HotelesTopRated />
        {/* <Payments2 /> */}
        <Promotion/>
        <WhyTravelUs />
        <Testimonial />
      </MasterLayout>
    </>
  );
}
