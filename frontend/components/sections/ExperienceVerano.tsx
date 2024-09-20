import ExperienceVeranoSlider from "../slider/ExperienceVeranoSlider";
import Axios from "@/helper/axios";
const getVeranoData = async () =>{
    const res = await Axios.get("/verano");
    const veranoData = res?.data?.data;
    const heading = res?.data?.heading;
    return {veranoData, heading};
}
export async function ExperienceVerano(){
    const {veranoData,heading} = await getVeranoData();
    return (
        <ExperienceVeranoSlider veranoData={veranoData} headingData={heading}/>
    )
}