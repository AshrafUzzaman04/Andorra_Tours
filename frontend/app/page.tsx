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
import Fetch from "@/helper/Fetch";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // Fetch dynamic SEO data (replace with your actual API endpoint)
  const response = await Fetch.get("/seo-settings/pagename/home");
  const seoData = (await response?.data?.data) || {};

  return {
    title: seoData.seo_title || "Tours Andorra",
    description:
      seoData.meta_description ||
      "Portal de Actividades / Experiencias #1 en Andorra",
    keywords:
      seoData.meta_tags ||
      "tours andorra, andorra tours, travel andorra, travel, explore andorra,",
    openGraph: {
      title: seoData.seo_title || "Tours Andorra",
      description:
        seoData.meta_description ||
        "Portal de Actividades / Experiencias #1 en Andorra",
      images: [
        "https://api.ownchoose.com/storage/logos/UVjUj1HNq6CfrXQU57QINTJH8abBZ1dxpF7DqNQo.png",
      ],
      url: "https://andorra-tours.vercel.app/",
    },
    twitter: {
      title: seoData.seo_title || "Tours Andorra",
      description:
        seoData.meta_description ||
        "Portal de Actividades / Experiencias #1 en Andorra",
      images: [
        "https://api.ownchoose.com/storage/logos/UVjUj1HNq6CfrXQU57QINTJH8abBZ1dxpF7DqNQo.png",
      ],
      card: "summary_large_image",
      creator: "Seba Diaz",
    },
  };
}

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
        <Promotion />
        <WhyTravelUs />
        <Testimonial />
      </MasterLayout>
    </>
  );
}
