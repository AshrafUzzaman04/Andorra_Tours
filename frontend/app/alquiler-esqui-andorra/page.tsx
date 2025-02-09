import MasterLayout from "@/components/layout/MasterLayout";
import React from "react";
import ExclusiveService from "@/components/sections/ExclusiveService";
import Iframe from "@/components/sections/Iframe";
import SkirentalBottom from "@/components/sections/SkiRentalBottom";
import SkiRentalDesc from "@/components/sections/SkiRentalDesc";
import SkiRentalHeroBanner from "@/components/sections/SkiRentalHeroBanner";
import Fetch from "@/helper/Fetch";

export async function generateMetadata() {
    // Fetch dynamic SEO data (replace with your actual API endpoint)
    const response = await Fetch.get("/seo-settings/pagename/ski-rental");
    const seoData = await response?.data?.data || {};

    return {
        title: seoData.seo_title || "Tours Andorra",
        description: seoData.meta_description || "Portal de Actividades / Experiencias #1 en Andorra",
        keywords: seoData.meta_tags || "tours andorra, andorra tours, travel andorra, travel, explore andorra,",
        openGraph: {
            title: seoData.seo_title || "Tours Andorra",
            description: seoData.meta_description || "Portal de Actividades / Experiencias #1 en Andorra",
            images: ["https://api.ownchoose.com/storage/logos/UVjUj1HNq6CfrXQU57QINTJH8abBZ1dxpF7DqNQo.png"],
            url: "https://andorra-tours.vercel.app/",
        },
        twitter: {
            title: seoData.seo_title || "Tours Andorra",
            description: seoData.meta_description || "Portal de Actividades / Experiencias #1 en Andorra",
            images:["https://api.ownchoose.com/storage/logos/UVjUj1HNq6CfrXQU57QINTJH8abBZ1dxpF7DqNQo.png"],
            card: "summary_large_image",
            creator: "Seba Diaz",
        }
    };
}

export default async function SkiRental() {
  return (
      <MasterLayout>
        {/* <SkiRentalHeroBanner /> */}
        <Iframe />
        <SkiRentalDesc />
        {/* Passing details as a prop */}
        {/* <SkirentalBottom /> */}
        <ExclusiveService />
      </MasterLayout>
  );
}
