import MasterLayout from "@/components/layout/MasterLayout";
import TourDetails from "@/components/sections/TourDetsils";
import Fetch from "@/helper/Fetch";
const getData = async ({params}:{params:{slug:string}}) =>{
    const res = await Fetch("/inverano/"+params?.slug+"?for=verano")
    return res?.data?.data;
}
export default async function Inverano({params}:{params:{slug:string}}){
    const details = await getData({params});
    return (
        <MasterLayout>
            <TourDetails details={details}/>
        </MasterLayout>
    )
}