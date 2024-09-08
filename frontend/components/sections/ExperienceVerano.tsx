import ExperienceVeranoSlider from "../slider/ExperienceVeranoSlider";
import Axios from "@/helper/axios";
const getVeranoData = async () =>{
    const res = await Axios.get("/verano");
    return res?.data?.data || [];
}
export async function ExperienceVerano(){
    const veranoData = await getVeranoData();
    return (
        <ExperienceVeranoSlider veranoData={veranoData}/>
    )
}