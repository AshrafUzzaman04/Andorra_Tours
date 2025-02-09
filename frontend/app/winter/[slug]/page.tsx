import MasterLayout from "@/components/layout/MasterLayout";
import TourDetails from "@/components/sections/TourDetsils";
import Fetch from "@/helper/Fetch";
import { Metadata } from "next";
const getData = async ({params}:{params:{slug:string}}) =>{
    const res = await Fetch("/inverano/"+params?.slug+"?for=verano")
    const details = res?.data?.data;
    const popular_tours = res?.data?.popular_tours;
    const promotionData = res?.data?.offerBanner;
    return {details, popular_tours, promotionData};
}

const stripHtml = (html?: string) => {
    return html ? html.replace(/<\/?[^>]+(>|$)/g, "") : "";
};

export async function generateMetadata({params}:{params:{slug:string}}): Promise<Metadata> {
    const response = await Fetch("/inverano/"+params?.slug+"?for=verano");
    const inverano = response?.data?.data || [];
    const title = inverano?.title ?? ""

    const detailsArray =
    inverano.details?.details
    ? (Array.isArray(JSON.parse(inverano.details.details)) ? JSON.parse(inverano.details.details) : [])
    : [];
    const rawDescription = detailsArray.length > 0 ? detailsArray[0]?.description : "";
    const description = stripHtml(rawDescription) || "Portal de Actividades / Experiencias #1 en Andorra";

    const image = process.env.NEXT_PUBLIC_STORAGE_URL + inverano?.photo
    return {
        title: title,
        description: description,
        keywords:"tours andorra, andorra tours, travel andorra, travel, explore andorra,",
        openGraph:{
            title: title,
            description: description,
            images: [image],
            url:"https://andorra-tours.vercel.app/"
        },
        twitter:{
            title: title,
            description: description,
            images: [image],
            card:"summary"
        }
    }
  }
export default async function Inverano({params}:{params:{slug:string}}){
    const {details, popular_tours, promotionData} = await getData({params});
    return (
        <MasterLayout>
            <TourDetails details={details} popular_tours={popular_tours} promotionData={promotionData}/>
        </MasterLayout>
    )
}