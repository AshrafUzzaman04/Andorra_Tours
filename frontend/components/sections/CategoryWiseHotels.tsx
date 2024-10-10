'use client'
import { swiperGroup1 } from "@/util/swiperOption"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
export default function CategoryWiseHotels() {
    return (
        <main className="main">
            <section className="box-section box-breadcrumb background-body">
                <div className="container">
                    <ul className="breadcrumbs">
                        <li> <Link href="/">Home</Link><span className="arrow-right">
                            <svg width={7} height={12} viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 11L6 6L1 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg></span></li>
                        <li> <Link href="/destination">Hotel</Link><span className="arrow-right">
                            <svg width={7} height={12} viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 11L6 6L1 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg></span></li>
                        <li> <span className="text-breadcrumb">Hotel Le Meurice</span></li>
                    </ul>
                </div>
            </section>
            <section className="section-box box-banner-home3 box-banner-hotel-detail background-body">
                <div className="container">
                    <div className="box-swiper mt-0">
                        <div className="swiper-container swiper-group-1">
                            <Swiper {...swiperGroup1}>
                                <SwiperSlide>
                                    <div className="item-banner-box" style={{ backgroundImage: 'url(https://api.ownchoose.com/storage/card-image/960baKebMIICiRNACIfXSr5IXXvBWZ4AVrjp7UW8.png)' }}>
                                        <div className="item-banner-box-inner"> <span className="btn btn-white-sm"><img src="/assets/imgs/page/tour-detail/star-big.svg" alt="Travila" /><img src="/assets/imgs/page/tour-detail/star-big.svg" alt="Travila" /><img src="/assets/imgs/page/tour-detail/star-big.svg" alt="Travila" /><img src="/assets/imgs/page/tour-detail/star-big.svg" alt="Travila" /><img src="/assets/imgs/page/tour-detail/star-big.svg" alt="Travila" /></span>
                                            <h1 className="mt-20 mb-20 color-white">Welcom to<br className="d-none d-lg-block" />Le Meurice Hotel</h1>
                                            <ul className="list-disc">
                                                <li>Spacious and Well-Appointed Rooms</li>
                                                <li>Fine Dining Restaurants</li>
                                                <li>Exclusive Spa and Wellness Facilities</li>
                                            </ul>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item-banner-box" style={{ backgroundImage: 'url(https://api.ownchoose.com/storage/card-image/960baKebMIICiRNACIfXSr5IXXvBWZ4AVrjp7UW8.png)' }}>
                                        <div className="item-banner-box-inner"> <span className="btn btn-white-sm"><img src="/assets/imgs/page/tour-detail/star-big.svg" alt="Travila" /><img src="/assets/imgs/page/tour-detail/star-big.svg" alt="Travila" /><img src="/assets/imgs/page/tour-detail/star-big.svg" alt="Travila" /><img src="/assets/imgs/page/tour-detail/star-big.svg" alt="Travila" /><img src="/assets/imgs/page/tour-detail/star-big.svg" alt="Travila" /></span>
                                            <h1 className="mt-20 mb-20 color-white">Welcom to<br className="d-none d-lg-block" />Le Meurice Hotel</h1>
                                            <ul className="list-disc">
                                                <li>Spacious and Well-Appointed Rooms</li>
                                                <li>Fine Dining Restaurants</li>
                                                <li>Exclusive Spa and Wellness Facilities</li>
                                            </ul>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                            <div className="swiper-pagination swiper-pagination-group-1 swiper-pagination-style-1" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-box box-partners box-hotel-facilities-list background-body"></section>
            <section className="section-box box-payments box-vision background-body">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-30">
                            <div className="box-right-payment"><span className="btn btn-brand-secondary">Welcome to Le Meurice Hotel</span>
                                <h2 className="title-why mb-25 mt-10 neutral-1000">A New Vision of Luxury</h2>
                                <p className="text-lg-medium neutral-500 mb-35">Le Meurice is an iconic luxury hotel situated in the heart of Paris, France, renowned for its elegance, sophistication, and rich history. Nestled on the Rue de Rivoli, overlooking the splendid Tuileries Garden and just steps away from the Louvre Museum, this esteemed establishment has been a beacon of opulence and hospitality since its inception in 1835.</p>
                                <div className="box-telephone-booking">
                                    <div className="box-tel-left">

                                    </div>
                                    <div className="box-tel-right">
                                        <Link className="btn btn-tag" href="#">Availability Rooms
                                            <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-6 mb-30 text-center text-lg-end">
                            <div className="box-image-vision"> <img className="w-100" src="/assets/imgs/page/hotel/img-vision.png" alt="Travila" />
                                <div className="image-vision-1"><img className="w-100 mb-15" src="/assets/imgs/page/hotel/img-vision2.png" alt="Travila" /></div>
                                <div className="image-vision-2"><img className="w-100" src="/assets/imgs/page/hotel/img-vision3.png" alt="Travila" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-box box-top-rated-3 box-nearby best-room-hotel background-body">
                <div className="container">
                    <h2 className="neutral-1000 wow fadeInUp">Our Best Rooms</h2>
                    <p className="text-xl-medium neutral-500 wow fadeInUp">Book online today and look forward to a relaxing stay with usQ</p>
                    <div className="box-button-tabs wow fadeInUp"> <Link className="btn btn-white" href="#">All</Link><Link className="btn btn-white" href="#">Luxury</Link><Link className="btn btn-white" href="#">Standard</Link><Link className="btn btn-white" href="#">Economy</Link><Link className="btn btn-white" href="#">Business</Link><Link className="btn btn-white" href="#">Royal Class</Link><Link className="btn btn-white" href="#">Superior</Link></div>
                    <div className="row mt-65">
                        <div className="col-lg-4 col-md-6 wow fadeInUp">
                            <div className="card-journey-small card-journey-small-type-3 background-card">
                                <div className="card-image"> <Link className="wish" href="#">
                                    <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg></Link><Link href="/room-detail"><img src="/assets/imgs/page/hotel/room.png" alt="Travila" /></Link></div>
                                <div className="card-info">
                                    <div className="card-rating">
                                        <div className="card-left"> </div>
                                        <div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
                                    </div>
                                    <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/room-detail">Deluxe Queen Room</Link></div>
                                    <div className="card-program">
                                        <div className="card-facilities">
                                            <div className="item-facilities">
                                                <p className="pax text-md-medium neutral-1000">2 adults </p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="size text-md-medium neutral-1000">35 sqm</p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="bed text-md-medium neutral-1000">2 Beds</p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="bathroom text-md-medium neutral-1000">1 Bathrooms</p>
                                            </div>
                                        </div>
                                        <div className="endtime">
                                            <div className="card-price">
                                                <h6 className="heading-6 neutral-1000">$48.25</h6>
                                                <p className="text-md-medium neutral-500">/ night</p>
                                            </div>
                                            <div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp">
                            <div className="card-journey-small card-journey-small-type-3 background-card">
                                <div className="card-image"> <Link className="wish" href="#">
                                    <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg></Link><Link href="/room-detail"><img src="/assets/imgs/page/hotel/room2.png" alt="Travila" /></Link></div>
                                <div className="card-info">
                                    <div className="card-rating">
                                        <div className="card-left"> </div>
                                        <div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
                                    </div>
                                    <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/room-detail">King Ensuite Room</Link></div>
                                    <div className="card-program">
                                        <div className="card-facilities">
                                            <div className="item-facilities">
                                                <p className="pax text-md-medium neutral-1000">2 adults </p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="size text-md-medium neutral-1000">35 sqm</p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="bed text-md-medium neutral-1000">2 Beds</p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="bathroom text-md-medium neutral-1000">1 Bathrooms</p>
                                            </div>
                                        </div>
                                        <div className="endtime">
                                            <div className="card-price">
                                                <h6 className="heading-6 neutral-1000">$17.32</h6>
                                                <p className="text-md-medium neutral-500">/ night</p>
                                            </div>
                                            <div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp">
                            <div className="card-journey-small card-journey-small-type-3 background-card">
                                <div className="card-image"> <Link className="wish" href="#">
                                    <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg></Link><Link href="/room-detail"><img src="/assets/imgs/page/hotel/room3.png" alt="Travila" /></Link></div>
                                <div className="card-info">
                                    <div className="card-rating">
                                        <div className="card-left"> </div>
                                        <div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
                                    </div>
                                    <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/room-detail">Deluxe Ensuite Room</Link></div>
                                    <div className="card-program">
                                        <div className="card-facilities">
                                            <div className="item-facilities">
                                                <p className="pax text-md-medium neutral-1000">2 adults </p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="size text-md-medium neutral-1000">35 sqm</p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="bed text-md-medium neutral-1000">2 Beds</p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="bathroom text-md-medium neutral-1000">1 Bathrooms</p>
                                            </div>
                                        </div>
                                        <div className="endtime">
                                            <div className="card-price">
                                                <h6 className="heading-6 neutral-1000">$15.63</h6>
                                                <p className="text-md-medium neutral-500">/ night</p>
                                            </div>
                                            <div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp">
                            <div className="card-journey-small card-journey-small-type-3 background-card">
                                <div className="card-image"> <Link className="wish" href="#">
                                    <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg></Link><Link href="/room-detail"><img src="/assets/imgs/page/hotel/room4.png" alt="Travila" /></Link></div>
                                <div className="card-info">
                                    <div className="card-rating">
                                        <div className="card-left"> </div>
                                        <div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
                                    </div>
                                    <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/room-detail">Deluxe Queen Room</Link></div>
                                    <div className="card-program">
                                        <div className="card-facilities">
                                            <div className="item-facilities">
                                                <p className="pax text-md-medium neutral-1000">2 adults </p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="size text-md-medium neutral-1000">35 sqm</p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="bed text-md-medium neutral-1000">2 Beds</p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="bathroom text-md-medium neutral-1000">1 Bathrooms</p>
                                            </div>
                                        </div>
                                        <div className="endtime">
                                            <div className="card-price">
                                                <h6 className="heading-6 neutral-1000">$48.25</h6>
                                                <p className="text-md-medium neutral-500">/ night</p>
                                            </div>
                                            <div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp">
                            <div className="card-journey-small card-journey-small-type-3 background-card">
                                <div className="card-image"> <Link className="wish" href="#">
                                    <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg></Link><Link href="/room-detail"><img src="/assets/imgs/page/hotel/room5.png" alt="Travila" /></Link></div>
                                <div className="card-info">
                                    <div className="card-rating">
                                        <div className="card-left"> </div>
                                        <div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
                                    </div>
                                    <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/room-detail">Deluxe Queen Room</Link></div>
                                    <div className="card-program">
                                        <div className="card-facilities">
                                            <div className="item-facilities">
                                                <p className="pax text-md-medium neutral-1000">2 adults </p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="size text-md-medium neutral-1000">35 sqm</p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="bed text-md-medium neutral-1000">2 Beds</p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="bathroom text-md-medium neutral-1000">1 Bathrooms</p>
                                            </div>
                                        </div>
                                        <div className="endtime">
                                            <div className="card-price">
                                                <h6 className="heading-6 neutral-1000">$17.32</h6>
                                                <p className="text-md-medium neutral-500">/ night</p>
                                            </div>
                                            <div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp">
                            <div className="card-journey-small card-journey-small-type-3 background-card">
                                <div className="card-image"> <Link className="wish" href="#">
                                    <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg></Link><Link href="/room-detail"><img src="/assets/imgs/page/hotel/room6.png" alt="Travila" /></Link></div>
                                <div className="card-info">
                                    <div className="card-rating">
                                        <div className="card-left"> </div>
                                        <div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
                                    </div>
                                    <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/room-detail">Deluxe Queen Room</Link></div>
                                    <div className="card-program">
                                        <div className="card-facilities">
                                            <div className="item-facilities">
                                                <p className="pax text-md-medium neutral-1000">2 adults </p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="size text-md-medium neutral-1000">35 sqm</p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="bed text-md-medium neutral-1000">2 Beds</p>
                                            </div>
                                            <div className="item-facilities">
                                                <p className="bathroom text-md-medium neutral-1000">1 Bathrooms</p>
                                            </div>
                                        </div>
                                        <div className="endtime">
                                            <div className="card-price">
                                                <h6 className="heading-6 neutral-1000">$15.63</h6>
                                                <p className="text-md-medium neutral-500">/ night</p>
                                            </div>
                                            <div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}
