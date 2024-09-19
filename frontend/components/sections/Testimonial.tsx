import Fetch from "@/helper/Fetch";
import Testimonials2 from "./Testimonials2";
const getTestimonialsData = async () =>{
    const res = await Fetch.get(`/testimonials`);
    return res?.data?.data
}
export default async function Testimonial(){
    const data = await getTestimonialsData();
    return (
        <Testimonials2 testimonials={data}/>
    )
}