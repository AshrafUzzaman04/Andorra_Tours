import MasterLayout from "@/components/layout/MasterLayout";
import TourDetail4 from "../../tour-detail-4/page";
import Fetch from "@/helper/Fetch";
const getData = async ({params}:{params:{slug:string}}) =>{
    const res = await Fetch("/verano/"+params?.slug)
    return res?.data?.data;
}
export default async function Verano({params}:{params:{slug:string}}){
    const details = await getData({params});
    return (
        <MasterLayout>
            <TourDetail4 details={details}/>
        </MasterLayout>
    )
}