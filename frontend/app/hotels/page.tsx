import MasterLayout from "@/components/layout/MasterLayout";
import Banner from "@/components/sections/Banner";
import ExclusiveService from "@/components/sections/ExclusiveService";
import HotelsCategory from "@/components/sections/HotelsCategory";
import Axios from "@/helper/axios";
const hotelData = async () => {
  const res = await Axios.get("/cardCategory")
  const data = res?.data?.data
  const heading = res?.data?.heading
  return {data,heading};
};
export default async function Hotels() {
  const {data,heading} = await hotelData();
  return (
    <MasterLayout>
        <HotelsCategory data={data} headingData={heading}/>
        <ExclusiveService/>
        <Banner/>
    </MasterLayout>
  )
}
