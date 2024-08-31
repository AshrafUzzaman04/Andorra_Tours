import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/Banner"
import BannerHome1 from "@/components/sections/BannerHome1"
import News2 from "@/components/sections/News2"
import OurFeatured3 from "@/components/sections/OurFeatured3"
import Payments2 from "@/components/sections/Payments2"
import RecentLauchedCar from "@/components/sections/RecentLauchedCar"
import Testimonials2 from "@/components/sections/Testimonials2"
import TopCategory1 from "@/components/sections/TopCategory1"
import WhyTravelUs from "@/components/sections/WhyTravelUs"
import ExclusiveService from "@/components/sections/ExclusiveService"
import TopRatedHotels from "@/components/sections/TopRatedHotels"
import ExperienceVeranoSlider from "@/components/slider/ExperienceVeranoSlider"
import ExperienceInvirenoSlider from "@/components/slider/ExperienceInvirenoSlider"
import Axios from "@/helper/axios"
import { ExperienceInverano } from "@/components/sections/ExperienceInverano"
import axios from "axios"
import Fetch from "@/helper/Fetch"
const getHeaderData = async () => {
	const res = await Fetch.get('/header');
	return res?.data?.data;
}
const getVeranoData = async () =>{
    const res = await Fetch.get("/verano");
    return res?.data?.data;
}
export default async function Home() {
	const data = await getHeaderData();
	const veranoData = await getVeranoData();
	return (
		<>

			<Layout data={data} headerStyle={1} footerStyle={5}>

				<BannerHome1 />
				<ExperienceVeranoSlider veranoData={veranoData} />
				<ExperienceInverano/>
				{/* <ExperienceInvirenoSlider /> */}
				<Banner />
				<ExclusiveService />
				<TopRatedHotels />
				<Payments2 />
				<WhyTravelUs />
				{/* <RecentLauchedCar /> */}
				<Testimonials2 />
				<News2 />
			</Layout>
		</>
	)
}