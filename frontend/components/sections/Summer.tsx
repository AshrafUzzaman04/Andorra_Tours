"use client"
import Link from "next/link"
import CategoryFilter from '../elements/CategoryFilter'
import { useState } from "react";
export interface VeranoDataItem {
    id: number;
    label: string;
    reviews: string;
    total_reviews: string;
    reviews_link: string;
    title: string;
    price: string;
    booking_link: string;
    slug: string;
    photo: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface HeadingDataItem {
    id: number;
    heading_for: string;
    heading: string;
    sub_heading: string;
}

// Define the prop type for your component
export interface ExperienceVeranoSliderProps {
    veranoData: VeranoDataItem[];
}
export default function Summer({ veranoData }: ExperienceVeranoSliderProps) {
    const [summers, setSummers] = useState<VeranoDataItem[]>(veranoData);
    return (
        <>

            <section className="section-box box-our-featured background-body">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-lg-6 mb-30 text-center text-lg-start wow fadeInUp">
                            {/* <h2 className="neutral-1000">Our Featured Tours</h2>
                            <p className="text-xl-medium neutral-500">Favorite destinations based on customer reviews</p> */}
                        </div>
                        <div className="col-lg-6 mb-30 wow fadeInUp">
                            {/* <CategoryFilter /> */}
                        </div>
                    </div>
                    <div className="box-list-featured">
                        <div className="row">
                            
                                {
                                    summers && summers?.map((verano, index) => (
                                        <div key={index} className="col-lg-4 col-md-6 wow fadeIn">
                                        <div className="card-journey-small background-card">
                                            <div className="card-image"> <Link className={verano?.label === "Top Rated" ? "label" : verano?.label === "Best Sale" ? "label bestsale" : "label saleoff"} href="#">{verano?.label}</Link><Link className="wish" href="#">
                                                <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                </svg></Link><img src={process?.env?.NEXT_PUBLIC_STORAGE_URL + verano?.photo} alt="Travila" />
                                            </div>
                                            <div className="card-info background-card">
                                                <div className="card-rating">
                                                    <div className="card-left"> </div>
                                                    <div className="card-right"> <span className="rating">{verano?.reviews} <span className="text-sm-medium neutral-500">({verano?.total_reviews} reviews)</span></span>
                                                    </div>
                                                </div>
                                                <div className="card-title"> <Link className="heading-6 neutral-1000" href={"/verano/" + verano?.slug}>{verano?.title}</Link>
                                                </div>
                                                <div className="card-program">
                                                    <div className="card-duration-tour">

                                                    </div>
                                                    <div className="endtime">
                                                        <div className="card-price">
                                                            <p className="text-md-medium neutral-500 me-2"> Desde / </p>
                                                            <h6 className="heading-6 neutral-1000"> {verano?.price} € </h6>
                                                        </div>
                                                        <div className="card-button"> <Link className="btn btn-gray" href={"/verano/" + verano?.slug}>Book Now</Link></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    ))
                                }
                            
                        </div>
                        {/* <div className="d-flex justify-content-center pb-20"><Link className="btn btn-black-lg" href="#">
                            <svg className="first" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.5 4H6.5V6H4.5V4Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M4.5 18H6.5V20H4.5V18Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M18.5 4H20.5V6H18.5V4Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M18.5 11H20.5V13H18.5V11Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M11.5 11H13.5V13H11.5V11Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M4.5 11H6.5V13H4.5V11Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M11.5 4H13.5V6H11.5V4Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M11.5 18H13.5V20H11.5V18Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M18.5 18H20.5V20H18.5V18Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>Load More</Link></div> */}
                    </div>
                </div>
            </section>
        </>
    )
}
