import MasterLayout from "@/components/layout/MasterLayout";
import TourDetails from "@/components/sections/TourDetsils";
import Fetch from "@/helper/Fetch";
const getData = async ({params}:{params:{slug:string}}) =>{
    const res = await Fetch("/inverano/"+params?.slug+"?for=verano")
    const details = res?.data?.data;
    const popular_tours = res?.data?.popular_tours;
    const promotionData = res?.data?.offerBanner;
    return {details, popular_tours, promotionData};
}
export default async function Inverano({params}:{params:{slug:string}}){
    const {details, popular_tours, promotionData} = await getData({params});
    return (
        <MasterLayout>
            <TourDetails details={details} popular_tours={popular_tours} promotionData={promotionData}/>
        </MasterLayout>
    )
}