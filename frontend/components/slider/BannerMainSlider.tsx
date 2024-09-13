'use client'
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Slider from "react-slick"

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
	<button
		{...props}
		className={
			"slick-prev slick-arrow" +
			(currentSlide === 0 ? " slick-disabled" : "")
		}
		type="button"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="" strokeLinecap="round" strokeLinejoin="round"></path></svg>
	</button>
)
const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
	<button
		{...props}
		className={
			"slick-next slick-arrow" +
			(currentSlide === slideCount - 1 ? " slick-disabled" : "")
		}
		type="button"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="" strokeLinecap="round" strokeLinejoin="round"> </path></svg>
	</button>
)

export interface BannerData {
	data: {
		data: Array<{
			id: number;
			title: string;
			title_color: string;
			button_text: string;
			button_text_color: string;
			button_color: string;
			button_link: string;
			slider_image: string;
			thumnail_image: string;
			description: string;
			description_text_color: string;
			status: string;
			created_at: string;
			updated_at: string;
		}>;
		thumbnails: string[];
	}
}

export default function BannerMainSlider({ data }: BannerData) {
	const slider1 = useRef<Slider | null>(null)
	const slider2 = useRef<Slider | null>(null)
	const [nav1, setNav1] = useState<Slider | undefined>(undefined)
	const [nav2, setNav2] = useState<Slider | undefined>(undefined)
	useEffect(() => {
		setNav1(slider1.current ?? undefined)
		setNav2(slider2.current ?? undefined)
	}, [])
	const settingsMain = {
		asNavFor: nav2,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: false,
		prevArrow: <SlickArrowLeft />,
		nextArrow: <SlickArrowRight />,
	}

	const settingsThumbs = {
		asNavFor: nav1,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		focusOnSelect: true,
		vertical: true,
		beforeChange: (oldIndex: number, newIndex: number) => {
			if (slider1.current) {
				slider1.current.slickGoTo(newIndex);
			}
		}
	}
	return (
		<>

			<Slider {...settingsMain} ref={slider1} className="banner-main">
				{
					data && data?.data?.map((slider, index) => (
						<div key={index} className="banner-slide">
							<div className="banner-image" style={{
								backgroundImage: `url(${process?.env?.NEXT_PUBLIC_STORAGE_URL+slider?.slider_image})`,
								backgroundSize: 'cover',  // Adjust the size as needed
								backgroundPosition: 'center',  // Adjust the position as needed
								backgroundRepeat: 'no-repeat',  // Prevent the image from repeating
								width: '100%',  // Example width
								height: '100%',  // Example height
							}}>
								<div className="container">
									<Link href={slider?.button_link}><span className="btn rounded-pill fw-semibold" style={{backgroundColor:slider?.button_color, color:slider?.button_text_color}}>{slider?.button_text}</span></Link>
									<h1 className="mt-20 mb-20" style={{color:slider?.title_color}}>{slider?.title}</h1>
									<h6 className="heading-6-medium" style={{color:slider?.description_text_color}}>{slider?.description}</h6>
								</div>
							</div>
						</div>
					))
				}

				{/* <div className="banner-slide">
					<div className="banner-image" style={{
						backgroundImage: 'url(/assets/imgs/page/homepage2/thumb2.png)',
						backgroundSize: 'cover',  // Adjust the size as needed
						backgroundPosition: 'center',  // Adjust the position as needed
						backgroundRepeat: 'no-repeat',  // Prevent the image from repeating
						width: '100%',  // Example width
						height: '100%',  // Example height
					}}>
						<div className="container"><span className="btn btn-brand-secondary">Discovery the World</span>
							<h1 className="mt-20 mb-20">Unleash Your Wanderlust<br className="d-none d-lg-block" />Book Your
								Next Journey</h1>
							<h6 className="heading-6-medium">Crafting Exceptional Journeys: Your Global Escape Planner.
								Unleash Your Wanderlust: Seamless Travel, Extraordinary Adventures</h6>
						</div>
					</div>
				</div>
				<div className="banner-slide">
					<div className="banner-image" style={{
						backgroundImage: 'url(/assets/imgs/page/homepage2/thumb3.png)',
						backgroundSize: 'cover',  // Adjust the size as needed
						backgroundPosition: 'center',  // Adjust the position as needed
						backgroundRepeat: 'no-repeat',  // Prevent the image from repeating
						width: '100%',  // Example width
						height: '100%',  // Example height
					}}>
						<div className="container"><span className="btn btn-brand-secondary">Discovery the World</span>
							<h1 className="mt-20 mb-20">Unleash Your Wanderlust<br className="d-none d-lg-block" />Book Your
								Next Journey</h1>
							<h6 className="heading-6-medium">Crafting Exceptional Journeys: Your Global Escape Planner.
								Unleash Your Wanderlust: Seamless Travel, Extraordinary Adventures</h6>
						</div>
					</div>
				</div>
				<div className="banner-slide" style={{
					backgroundImage: 'url(/assets/imgs/page/homepage2/banner.png)',
					backgroundSize: 'cover',  // Adjust the size as needed
					backgroundPosition: 'center',  // Adjust the position as needed
					backgroundRepeat: 'no-repeat',  // Prevent the image from repeating
					width: '100%',  // Example width
					height: '100%',  // Example height
				}}>
					<div className="banner-image">
						<div className="container"><span className="btn btn-brand-secondary">Discovery the World</span>
							<h1 className="mt-20 mb-20">Unleash Your Wanderlust<br className="d-none d-lg-block" />Book Your
								Next Journey</h1>
							<h6 className="heading-6-medium">Crafting Exceptional Journeys: Your Global Escape Planner.
								Unleash Your Wanderlust: Seamless Travel, Extraordinary Adventures</h6>
						</div>
					</div>
				</div> */}
			</Slider>
			<div className="slider-thumnail">
				<Slider {...settingsThumbs} ref={slider2} className="slider-nav-thumbnails">
					{
						data && data?.thumbnails?.map((thumbnail, index)=>(
							<div key={index} className="banner-slide"><img src={process?.env?.NEXT_PUBLIC_STORAGE_URL+thumbnail} alt="Travila" /></div>
						))
					}
					{/* <div className="banner-slide"><img src="/assets/imgs/page/homepage2/thumb2.png" alt="Travila" /></div>
					<div className="banner-slide"><img src="/assets/imgs/page/homepage2/thumb3.png" alt="Travila" /></div>
					<div className="banner-slide"><img src="/assets/imgs/page/homepage2/banner.png" alt="Travila" /></div> */}
				</Slider>
			</div>
		</>
	)
}
