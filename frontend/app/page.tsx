import Banner from "@/components/sections/Banner";
import BannerHome1 from "@/components/sections/BannerHome1";
import Payments2 from "@/components/sections/Payments2";
import WhyTravelUs from "@/components/sections/WhyTravelUs";
import ExclusiveService from "@/components/sections/ExclusiveService";
import { ExperienceInverano } from "@/components/sections/ExperienceInverano";
import { ExperienceVerano } from "@/components/sections/ExperienceVerano";
import MasterLayout from "@/components/layout/MasterLayout";
import HotelesTopRated from "@/components/sections/HotelsTopRated";
import Iframe from "@/components/sections/Iframe";
import Testimonial from "@/components/sections/Testimonial";

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
        <Payments2 />
        <WhyTravelUs />
        <Testimonial />
      </MasterLayout>
    </>
  );
}
