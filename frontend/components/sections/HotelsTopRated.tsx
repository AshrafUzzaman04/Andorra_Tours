import Axios from "@/helper/axios";
import TopRatedHotels from "./TopRatedHotels";
const hotelData = async () => {
    const res = await Axios.get("/cardCategory")
    return res?.data?.data
};
export default async function HotelesTopRated(){
    const data = await hotelData();
    return (
        <TopRatedHotels data={data}/>
    )
}