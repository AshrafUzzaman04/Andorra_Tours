"use server"
import Link from "next/link"
import BannerMainSlider from '../slider/BannerMainSlider'

import SearchFilterBottom from '@/components/elements/SearchFilterBottom'
import Axios from "@/helper/axios"

const getData = async () => {
	const res = await Axios.get("/hero-sliders");
	return res.data;
}

export default async function BannerHome1() {
	const data = await getData();
	return (
		<>

			<section className="section-box box-banner-home2 background-body">
				<div className="container-top">
					<div className="container" />
				</div>
				<div className="container-banner">
					<BannerMainSlider data={data} />
				</div>
			</section>
		</>
	)
}
