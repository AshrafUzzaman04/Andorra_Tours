import Fetch from "@/helper/Fetch";
import Link from "next/link"
export interface whyTravel {
	id: number,
	title: string,
	background_color: string,
	description: string,
	logo: string,
	status: string,
	created_at: string,
	updated_at: string
}

const getData = async () => {
	const res = await Fetch.get("/why-travels");
	return res?.data?.data
}
export default async function WhyTravelUs() {
	const data = await getData();
	return (
		<>

			<section className="section-box box-why-travel-us background-body">
				<div className="container">
					<div className="text-center">
						<h2 className="neutral-1000">{data?.heading?.heading}</h2>
						{data?.heading?.sub_heading && <p className="text-xl-medium neutral-500">{data?.heading?.sub_heading}</p>}
					</div>
					<div className="row mt-55">
						{
							data?.whyTravels && data?.whyTravels?.map((whyTravel: whyTravel, index: number) => (
								<div key={index} className="col-lg-3 col-md-6">
									<div className="card-why-travel light-mode hover-up" style={{backgroundColor:whyTravel?.background_color}}>
										<div className="card-image"> <img src={process.env.NEXT_PUBLIC_STORAGE_URL+whyTravel?.logo} alt="Travila" />
										</div>
										<div className="card-info"> <Link className="text-xl-bold card-title dark-mode-text-black" href="#">{whyTravel?.title}</Link>
											<p className="text-sm-medium neutral-500 card-desc">{whyTravel?.description}</p>
										</div>
									</div>
									<div className={`card-why-travel dark-mode background-${index}  hover-up`} style={{backgroundColor:whyTravel?.background_color}}>
										<div className="card-image"> <img src={process.env.NEXT_PUBLIC_STORAGE_URL+whyTravel?.logo} alt="Travila" />
										</div>
										<div className="card-info"> <Link className="text-xl-bold card-title dark-mode-text-black" href="#">{whyTravel?.title}</Link>
											<p className="text-sm-medium neutral-500 card-desc">{whyTravel?.description}</p>
										</div>
									</div>
								</div>
							))
						}


					</div>
					{/* <div className="box-swiper mt-30">
						<div className="swiper-container swiper-group-payment-7">
							<SwiperGroupPayment7Slider />
						</div>
					</div> */}
				</div>
			</section>
		</>
	)
}
