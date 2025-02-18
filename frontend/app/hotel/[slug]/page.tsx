import MasterLayout from "@/components/layout/MasterLayout";
import CategoryWiseHotels from "@/components/sections/CategoryWiseHotels";
import Fetch from "@/helper/Fetch";
import { Metadata } from "next";
const getData = async (slug: string) => {
  const response = await Fetch("hotel/" + slug);
  return response?.data?.data;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const response = await Fetch("hotel/" + params?.slug);
  const hotel = response?.data?.data || [];
  const title = hotel?.meta_title ?? "Tours Andorra";
  const description =
    hotel?.meta_description ??
    "Portal de Actividades / Experiencias #1 en Andorra";
  const image = process.env.NEXT_PUBLIC_STORAGE_URL + hotel?.photo;
  return {
    title: title,
    description: description,
    keywords:
      hotel?.meta_tags ??
      "tours andorra, andorra tours, travel andorra, travel, explore andorra,",
    openGraph: {
      title: title,
      description: description,
      images: [image],
      url: "https://andorra-tours.vercel.app/",
    },
    twitter: {
      title: title,
      description: description,
      images: [image],
      card: "summary",
    },
  };
}
export default async function HotelDetails({
  params,
}: {
  params: { slug: string };
}) {
  const hotel = await getData(params?.slug);
  return (
    <MasterLayout headerStyle={1} footerStyle={5}>
      <CategoryWiseHotels hotel={hotel} />
    </MasterLayout>
  );
}
