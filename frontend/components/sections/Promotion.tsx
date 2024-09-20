"use server"
import Fetch from "@/helper/Fetch";
import Payments2 from "./Payments2";
const getData = async () => {
    const res = await Fetch.get("/advertisements")
    return res.data?.data
}
export default async function Promotion(){
    const data = await getData();
    return (
        <Payments2 promotionData={data}/>
    )
}