'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { swiperGroupAnimate } from "@/util/swiperOption"
import Link from "next/link"

export interface HotelesDataItems {
    id: number;
    top_title: string;
    top_sub_title: string;
    tag: string;
    image: string;
    title: string;
    sub_title: string;
    link: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface TopRatedHotelsTypes {
    data: HotelesDataItems[]
}

export default function TopRatedHotels({ data }: TopRatedHotelsTypes) {
    return (
        <>

            <section className="section-box box-top-rated background-1">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-md-9">
                            <h2 className="neutral-1000">Leo que no te puedes perdert</h2>
                            <p className="text-xl-medium neutral-500">Quality as judged by customers. Book at the ideal price!
                            </p>
                        </div>
                        <div className="col-md-3 position-relative mb-30">
                            <div className="box-button-slider box-button-slider-team justify-content-end">
                                <div className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-animate">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" >
                                        <path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="swiper-button-next swiper-button-next-style-1 swiper-button-next-animate">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" >
                                        <path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-slider box-swiper-padding">
                    <div className="box-swiper mt-30">
                        <div className="swiper-container swiper-group-animate swiper-group-journey">
                            <Swiper {...swiperGroupAnimate}>
                                {
                                    data && data?.map((hotel, index) => (
                                        <SwiperSlide>
                                            <div className=" card-journey-small hotel-card-info background-card px-3 py-3 mb-3 text-center">
                                                <div className="card-left">
                                                    <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/destination-4">{hotel?.top_title}</Link></div>
                                                    <div className="card-desc"> <Link className="text-sm neutral-500" href="/destination-4">{hotel?.top_sub_title}</Link></div>
                                                </div>

                                            </div>
                                            <div className="card-journey-small background-card">
                                                <div className="card-image"> <Link className="hotelsTag" href="#">
                                                    <img width={50} height={50} className="" src={process?.env?.NEXT_PUBLIC_STORAGE_URL + hotel?.tag} alt="Travila" />
                                                </Link><img src={process?.env?.NEXT_PUBLIC_STORAGE_URL + hotel?.image} alt="Travila" />
                                                </div>
                                                <div className="card-info">
                                                    <div className="hotel-card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail-2">{hotel?.title}
                                                    </Link>
                                                    </div>
                                                    <div className="card-program">
                                                        <div className="card-location">
                                                            <p className="text-description text-md-medium neutral-500">{hotel?.sub_title}

                                                            </p>
                                                        </div>
                                                        <div className="buttonendtime">
                                                            <div className="card-button w-100"> <Link className="btn btn-gray w-100" href="/hotel-detail-2">A por ello</Link></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }

                                {/* <SwiperSlide>
                                    <div className=" card-journey-small hotel-card-info background-card px-3 py-3 mb-3 text-center">
                                        <div className="card-left">
                                            <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/destination-4">Comprar</Link></div>
                                            <div className="card-desc"> <Link className="text-sm neutral-500" href="/destination-4">La moda a tu alcance</Link></div>
                                        </div>

                                    </div>
                                    <div className="card-journey-small background-card">
                                        <div className="card-image"> <Link className="hotelsTag" href="#">
                                            <img width={50} height={50} className="" src="https://toursandorra.com/wp-content/uploads/elementor/thumbs/top10-q5j5ryqrfybvcdvorz8mowj7d2mi4mlfa9j0ev9drc.png" alt="Travila" />
                                        </Link><img src="/assets/imgs/page/homepage1/journey3.png" alt="Travila" />
                                        </div>
                                        <div className="card-info">
                                            <div className="hotel-card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail-2">Moda & Fashion</Link></div>
                                            <div className="card-program">
                                                <div className="card-location">
                                                    <p className="text-description text-md-medium neutral-500">Descubre los top 25 hoteles que no puedes dejar escapar.

                                                    </p>
                                                </div>
                                                <div className="buttonendtime">
                                                    <div className="card-button w-100"> <Link className="btn btn-gray w-100" href="/hotel-detail-2">A por ello</Link></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className=" card-journey-small hotel-card-info background-card px-3 py-3 mb-3 text-center">
                                        <div className="card-left">
                                            <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/destination-4">Degusta</Link></div>
                                            <div className="card-desc"> <Link className="text-sm neutral-500" href="/destination-4">La mejor gastonomia</Link></div>
                                        </div>

                                    </div>
                                    <div className="card-journey-small background-card">
                                        <div className="card-image"> <Link className="hotelsTag" href="#">
                                            <img width={50} height={50} className="" src="https://toursandorra.com/wp-content/uploads/elementor/thumbs/top25-q5uixw12nehhz5ucd2iiduwnv8p96fdhsmerrz1yp4.png" alt="Travila" />
                                        </Link><img src="/assets/imgs/page/homepage1/journey4.png" alt="Travila" />
                                        </div>
                                        <div className="card-info">
                                            <div className="hotel-card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail-2">Restaurantes</Link></div>
                                            <div className="card-program">
                                                <div className="card-location">
                                                    <p className="text-description text-md-medium neutral-500">Te enseñamos los 25 sitios favoritos que tienes que deleitar.

                                                    </p>
                                                </div>
                                                <div className="buttonendtime">
                                                    <div className="card-button w-100"> <Link className="btn btn-gray w-100" href="/hotel-detail-2">A por ello</Link></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className=" card-journey-small hotel-card-info background-card px-3 py-3 mb-3 text-center">
                                        <div className="card-left">
                                            <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/destination-4">Experimenta</Link></div>
                                            <div className="card-desc"> <Link className="text-sm neutral-500" href="/destination-4">Hacer deporte esta a tu alcance</Link></div>
                                        </div>

                                    </div>
                                    <div className="card-journey-small background-card">
                                        <div className="card-image"> <Link className="hotelsTag" href="#">
                                            <img width={50} height={50} className="" src="https://toursandorra.com/wp-content/uploads/elementor/thumbs/top10-q5j5ryqrfybvcdvorz8mowj7d2mi4mlfa9j0ev9drc.png" alt="Travila" />
                                        </Link><img src="/assets/imgs/page/homepage1/journey2.png" alt="Travila" />
                                        </div>
                                        <div className="card-info">
                                            <div className="hotel-card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail-2">Deportes</Link></div>
                                            <div className="card-program">
                                                <div className="card-location">
                                                    <p className="text-description text-md-medium neutral-500">Descubre las top 10 tiendas de deportes. que no puedes dejar escapar.

                                                    </p>
                                                </div>
                                                <div className="buttonendtime">
                                                    <div className="card-button w-100"> <Link className="btn btn-gray w-100" href="/hotel-detail-2">A por ello</Link></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className=" card-journey-small hotel-card-info background-card px-3 py-3 mb-3 text-center">
                                        <div className="card-left">
                                            <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/destination-4">Relájate</Link></div>
                                            <div className="card-desc"> <Link className="text-sm neutral-500" href="/destination-4">Donde relajarte</Link></div>
                                        </div>

                                    </div>
                                    <div className="card-journey-small background-card">
                                        <div className="card-image"> <Link className="hotelsTag" href="#">
                                            <img width={50} height={50} className="" src="https://toursandorra.com/wp-content/uploads/elementor/thumbs/top10-q5j5ryqrfybvcdvorz8mowj7d2mi4mlfa9j0ev9drc.png" alt="Travila" />
                                        </Link><img src="/assets/imgs/page/homepage1/journey3.png" alt="Travila" />
                                        </div>
                                        <div className="card-info">
                                            <div className="hotel-card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail-2">Wellness</Link></div>
                                            <div className="card-program">
                                                <div className="card-location">
                                                    <p className="text-description text-md-medium neutral-500">Descubre sitios para tormarte un tiempo para ti.

                                                    </p>
                                                </div>
                                                <div className="buttonendtime">
                                                    <div className="card-button w-100"> <Link className="btn btn-gray w-100" href="/hotel-detail-2">A por ello</Link></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className=" card-journey-small hotel-card-info background-card px-3 py-3 mb-3 text-center">
                                        <div className="card-left">
                                            <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/destination-4">Visita</Link></div>
                                            <div className="card-desc"> <Link className="text-sm neutral-500" href="/destination-4">Los mejores sitios</Link></div>
                                        </div>

                                    </div>
                                    <div className="card-journey-small background-card">
                                        <div className="card-image"><Link className="hotelsTag" href="#">
                                            <img width={50} height={50} className="" src="https://toursandorra.com/wp-content/uploads/elementor/thumbs/top10-q5j5ryqrfybvcdvorz8mowj7d2mi4mlfa9j0ev9drc.png" alt="Travila" />
                                        </Link><img src="/assets/imgs/page/homepage1/journey4.png" alt="Travila" />
                                        </div>
                                        <div className="card-info">
                                            <div className="hotel-card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail-2">Sitios de interés</Link></div>
                                            <div className="card-program">
                                                <div className="card-location">
                                                    <p className="text-description text-md-medium neutral-500">
                                                        Descubre los top 10 sitios que no puedes dejar de visitar!

                                                    </p>
                                                </div>
                                                <div className="buttonendtime">
                                                    <div className="card-button w-100"> <Link className="btn btn-gray w-100" href="/hotel-detail-2">A por ello</Link></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide> */}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}