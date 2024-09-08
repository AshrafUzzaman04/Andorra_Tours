import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/Banner";
import BannerHome1 from "@/components/sections/BannerHome1";
import News2 from "@/components/sections/News2";
import Payments2 from "@/components/sections/Payments2";
import Testimonials2 from "@/components/sections/Testimonials2";
import WhyTravelUs from "@/components/sections/WhyTravelUs";
import ExclusiveService from "@/components/sections/ExclusiveService";
import TopRatedHotels from "@/components/sections/TopRatedHotels";
import { ExperienceInverano } from "@/components/sections/ExperienceInverano";
import { ExperienceVerano } from "@/components/sections/ExperienceVerano";
import Header from "@/components/layout/header/Header";
import MasterLayout from "@/components/layout/MasterLayout";

export default function Home() {
  return (
    <>
      <MasterLayout headerStyle={1} footerStyle={5}>
        <BannerHome1 />
        <ExperienceVerano />
        <ExperienceInverano />
        {/* <ExperienceInvirenoSlider /> */}
        <Banner />
        <ExclusiveService />
        <TopRatedHotels />
        <Payments2 />
        <WhyTravelUs />
        {/* <RecentLauchedCar /> */}
        <Testimonials2 />
        {/* <News2 /> */}
      </MasterLayout>
    </>
  );
}
