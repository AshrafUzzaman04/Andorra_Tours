import Axios from "@/helper/axios";
import TopRatedHotels from "./TopRatedHotels";
const hotelData = async () => {
    const res = await Axios.get("/cardCategory")
    const data = res?.data?.data
    const heading = res?.data?.heading
    return {data, heading}
};
export default async function HotelesTopRated(){
    const {data,heading} = await hotelData();
    return (
        <TopRatedHotels data={data} headingData={heading}/>
    )
}