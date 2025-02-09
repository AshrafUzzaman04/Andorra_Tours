import MasterLayout from "@/components/layout/MasterLayout";
import ExclusiveService from "@/components/sections/ExclusiveService";
import Summer from "@/components/sections/Summer";
import Fetch from "@/helper/Fetch";

const getVeranoData = async () => {
  const res = await Fetch.get("/verano");
  const veranoData = res?.data?.data;
  const heading = res?.data?.heading;
  return { veranoData, heading };
};

export async function generateMetadata() {
    // Fetch dynamic SEO data (replace with your actual API endpoint)
    const response = await Fetch.get("/seo-settings/pagename/summer");
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

export default async function Verano() {
  const { veranoData, heading } = await getVeranoData();
  return (
    <MasterLayout>
      <section className="section-box box-banner-hotel-detai-2">
        <div className="box-banner-hotel-detai-2-inner ">
          <div className="container pt-20 pb-20">
            <h2 className="mb-20 color-white">{heading?.heading}</h2>
            <h6 className="color-white">{heading?.sub_heading}</h6>
          </div>
        </div>
      </section>
      <Summer veranoData={veranoData} />
      <ExclusiveService />
    </MasterLayout>
  );
}
