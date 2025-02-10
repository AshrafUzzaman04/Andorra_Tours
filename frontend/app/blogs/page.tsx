import MasterLayout from "@/components/layout/MasterLayout";
import BlogsChild from "@/components/sections/Blogs/BlogsChild";
import Fetch from "@/helper/Fetch";
import { Metadata } from "next";
async function getBlog() {
  const res = await Fetch(`/blogs`);
  return res?.data?.data;
}

export async function generateMetadata(): Promise<Metadata> {
  // Fetch dynamic SEO data (replace with your actual API endpoint)
  const response = await Fetch.get("/seo-settings/pagename/blogs");
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
export default async function Blogs() {
  const blogs = await getBlog();
  return (
    <MasterLayout>
      <BlogsChild blogs={blogs} />
    </MasterLayout>
  );
}
