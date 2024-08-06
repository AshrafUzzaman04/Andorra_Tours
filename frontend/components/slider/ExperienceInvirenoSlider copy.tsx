'use client'
import { swiperGroup3 } from "@/util/swiperOption"
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react"

export default function ExperienceInvirenoSlider() {
	return (
		<>
			<Swiper {...swiperGroup3}>
				<SwiperSlide>

					<div className="card-spot background-card hover-up">
						<div className="card-image"> <Link href="/destination-4"><img src="/assets/imgs/page/homepage4/spot.png" alt="Travila" /></Link></div>
						<div className="card-info background-card">
							<div className="card-left">
								<div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/destination-4">Venice</Link></div>
								<div className="card-desc"> <Link className="text-sm neutral-500" href="/destination-4">356 Tours,</Link><Link className="text-sm neutral-500" href="/destination-4">248 Activities</Link></div>
							</div>
							<div className="card-right">
								<div className="card-button"> <Link href="/destination-4">
									<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
										<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
									</svg></Link></div>
							</div>
						</div>
					</div>

				</SwiperSlide>
				<SwiperSlide>
					<div className="card-spot background-card fadeInUp hover-up">
						<div className="card-image"> <Link href="/destination-4"><img src="/assets/imgs/page/homepage4/spot2.png" alt="Travila" /></Link></div>
						<div className="card-info background-card">
							<div className="card-left">
								<div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/destination-4">New York</Link></div>
								<div className="card-desc"> <Link className="text-sm neutral-500" href="/destination-4">356 Tours,</Link><Link className="text-sm neutral-500" href="/destination-4">248 Activities</Link></div>
							</div>
							<div className="card-right">
								<div className="card-button"> <Link href="/destination-4">
									<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
										<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
									</svg></Link></div>
							</div>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="card-spot background-card fadeInUp hover-up">
						<div className="card-image"> <Link href="/destination-4"><img src="/assets/imgs/page/homepage4/spot3.png" alt="Travila" /></Link></div>
						<div className="card-info background-card">
							<div className="card-left">
								<div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/destination-4">Amsterdam</Link></div>
								<div className="card-desc"> <Link className="text-sm neutral-500" href="/destination-4">356 Tours,</Link><Link className="text-sm neutral-500" href="/destination-4">248 Activities</Link></div>
							</div>
							<div className="card-right">
								<div className="card-button"> <Link href="/destination-4">
									<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
										<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
									</svg></Link></div>
							</div>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>

					<div className="card-spot background-card fadeInUp hover-up">
						<div className="card-image"> <Link href="/destination-4"><img src="/assets/imgs/page/homepage4/spot4.png" alt="Travila" /></Link></div>
						<div className="card-info background-card">
							<div className="card-left">
								<div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/destination-4">Budapest</Link></div>
								<div className="card-desc"> <Link className="text-sm neutral-500" href="/destination-4">356 Tours,</Link><Link className="text-sm neutral-500" href="/destination-4">248 Activities</Link></div>
							</div>
							<div className="card-right">
								<div className="card-button"> <Link href="/destination-4">
									<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
										<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
									</svg></Link></div>
							</div>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="card-spot background-card fadeInUp hover-up">
						<div className="card-image"> <Link href="/destination-4"><img src="/assets/imgs/page/homepage4/spot5.png" alt="Travila" /></Link></div>
						<div className="card-info background-card">
							<div className="card-left">
								<div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/destination-4">Lisbon</Link></div>
								<div className="card-desc"> <Link className="text-sm neutral-500" href="/destination-4">356 Tours,</Link><Link className="text-sm neutral-500" href="/destination-4">248 Activities</Link></div>
							</div>
							<div className="card-right">
								<div className="card-button"> <Link href="/destination-4">
									<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
										<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
									</svg></Link></div>
							</div>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</>
	)
}


