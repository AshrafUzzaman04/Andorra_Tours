import MasterLayout from "@/components/layout/MasterLayout";
import Banner from "@/components/sections/Banner";
import ExclusiveService from "@/components/sections/ExclusiveService";
import HotelGrid from "@/components/sections/hotel-grid";
import Fetch from "@/helper/Fetch";
import { Metadata } from "next";
const getData = async (slug: string) => {
  const res = await Fetch.get("top-hotels/" + slug);
  const hotels = res?.data?.data?.category || [];
  const locationBase = res?.data?.data?.locations_count || [];
  const hotelTypeBase = res?.data?.data?.hotel_types_count || [];
  const reviewsBase = res?.data?.data?.reviews_count || [];
  return { hotels, locationBase, hotelTypeBase, reviewsBase };
};

export async function generateMetadata(): Promise<Metadata> {
  // Fetch dynamic SEO data (replace with your actual API endpoint)
  const response = await Fetch.get("/seo-settings/pagename/hotels");
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

export default async function SulgHotes({
  params,
}: {
  params: { slug: string };
}) {
  const { hotels, locationBase, hotelTypeBase, reviewsBase } = await getData(
    params?.slug
  );
  return (
    <MasterLayout headerStyle={1} footerStyle={5}>
      <HotelGrid
        hotelData={hotels}
        slug={params?.slug}
        locationBase={locationBase}
        hotelTypeBase={hotelTypeBase}
        reviewsBase={reviewsBase}
      />
      <ExclusiveService />
      <Banner />
    </MasterLayout>
  );
}
