import MasterLayout from "@/components/layout/MasterLayout";
import TourDetails from "@/components/sections/TourDetsils";
import Fetch from "@/helper/Fetch";
const getData = async ({params}:{params:{slug:string}}) =>{
    const res = await Fetch("/verano/"+params?.slug)
    return res?.data?.data;
}
export default async function Verano({params}:{params:{slug:string}}){
    const details = await getData({params});
    return (
        <MasterLayout>
            <TourDetails details={details}/>
        </MasterLayout>
    )
}