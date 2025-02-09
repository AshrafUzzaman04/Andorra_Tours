'use client'
import BlogsLatestSlider from '@/components/slider/BlogsLatestSlider'
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Slider from "react-slick"
import BookingForm from './BookingForm'
import parse from 'html-react-parser';
import { usePathname } from 'next/navigation'
import ProductSlider from './ProductSlider'
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

export interface Product {
    id: number;
    inverano_id: number | null;
    verano_id: number | null;
    product_for: string;
    title: string;
    slug: string;
    photos: string;
    description: string;
    pricing: string;
    form_title: string;
    service_title: string;
    services: string;
    extra_service_title: string;
    extra_services: string;
}

export interface ProductDetailsType {
    product: Product;
    PopularProducts:Product[]
}
export default function ProductDetail({ product, PopularProducts}: ProductDetailsType) {
    const path = usePathname();
	const type = path.split('/')[1];
    const photos = product?.photos ? JSON.parse(product?.photos) : [];
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
        slidesToShow: 6,
        slidesToScroll: 1,
        dots: false,
        focusOnSelect: true,
        vertical: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2
                }
            }
        ],
        asNavFor: nav1,
    }

    const [isAccordion, setIsAccordion] = useState(null)

    const handleAccordion = (key: any) => {
        setIsAccordion(prevState => prevState === key ? null : key)
    }
    return (
        <>

            <main className="main">
                <section className="box-section box-breadcrumb background-body">
                    <div className="container">
                        <ul className="breadcrumbs">
                            <li> <Link href="/">Home</Link><span className="arrow-right">
                                <svg width={7} height={12} viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 11L6 6L1 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg></span></li>
                            <li> <Link href={"/"+type} className="text-capitalize">{type}</Link><span className="arrow-right">
                                <svg width={7} height={12} viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 11L6 6L1 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg></span></li>
                            <li> <span className="text-breadcrumb">{product?.title}</span></li>
                        </ul>
                    </div>
                </section>
                <section className="section-box box-banner-home2 background-body">
                    <div className="container">
                        <div className="container-banner-activities">
                            <div className="box-banner-activities" style={{height:"500px"}}>
                                <Slider {...settingsMain} ref={slider1} className="banner-activities-detail">
                                    {
                                        photos?.map((photo: any, index: number) => (
                                            <div key={index} className="banner-slide-activity">
                                                <img className="w-100" style={{height:"500px", objectFit:"contain"}} src={process.env.NEXT_PUBLIC_STORAGE_URL+photo} alt="Travila" />
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </div>
                            <div className="slider-thumnail-activities">
                                <Slider {...settingsThumbs} ref={slider2} className="slider-nav-thumbnails-activities-detail">
                                {
                                        photos?.map((photo: any, index: number) => (
                                            <div key={index} className="banner-slide">
                                                <img className="" style={{height: "124px",objectFit:"fill"}} src={process.env.NEXT_PUBLIC_STORAGE_URL+photo} alt="Travila" />
                                            </div>
                                        ))
                                }
								{photos?.length === 2 &&<div className="banner-slide"></div>}

                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="box-section box-content-tour-detail background-body">
                    <div className="container-lg">
                        <div className="tour-header">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="tour-title-main">
                                        <h4 className="neutral-1000">{product?.title}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-30">
                            <div className="col-lg-7">

                                <div className="box-collapse-expand">
                                    <div className="group-collapse-expand">
                                        <button className={isAccordion == 1 ? "btn btn-collapse collapsed" : "btn btn-collapse"} type="button" onClick={() => handleAccordion(1)}>
                                            <h6>Descripción</h6>
                                            <svg width={12} height={7} viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L6 6L11 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                            </svg>
                                        </button>
                                        <div className={isAccordion == 1 ? "collapse" : "collapse show"}>
                                            <div className="card card-body">
                                                {parse(product?.description)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="booking-form">
                                    <div className="head-booking-form">
                                        <p className="text-xl-bold neutral-1000">Booking Form</p>
                                    </div>
                                    <BookingForm FormData={product} price={''} bookingLink={null} />
                                </div>


                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box box-news background-body">
                    <div className="container">
                        <div className="row align-items-end">
                            <div className="mb-20 col-md-6 wow fadeInLeft">
                                <h2 className="neutral-1000">Related products</h2>
                                {/* <p className="text-xl-medium neutral-500">Favorite destinations based on customer reviews</p> */}
                            </div>
                        </div>
                        <div className="box-list-news wow fadeInUp">
                            <div className="box-swiper mt-30">
                                <div className="swiper-container swiper-group-3">
                                    <ProductSlider PopularProducts={PopularProducts}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box box-news background-body">
                    <div className="container">
                        <div className="row align-items-end">
                            <div className="col-md-6 mb-30 wow fadeInLeft">
                                <h2 className="neutral-1000">News, Tips  Guides</h2>
                                <p className="text-xl-medium neutral-500">Favorite destinations based on customer reviews</p>
                            </div>
                            <div className="col-md-6 mb-30 wow fadeInRight">
                                <div className="d-flex justify-content-center justify-content-md-end"><Link className="btn btn-black-lg" href="#">View More
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg></Link></div>
                            </div>
                        </div>
                        <div className="box-list-news wow fadeInUp">
                            <div className="box-swiper mt-30">
                                <div className="swiper-container swiper-group-3">
                                    <BlogsLatestSlider />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}
