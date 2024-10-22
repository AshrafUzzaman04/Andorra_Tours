'use client'
import ByPagination from '@/components/Filter/ByPagination'
import SwiperGroup3Slider from '@/components/slider/SwiperGroup3Slider'
import rawToursData from "@/util/tours.json"
import useTourFilter from '@/util/useTourFilter'
import Link from "next/link"
import ProductsCard from './ProductsCard'
const toursData = rawToursData.map(tour => ({
    ...tour,
    duration: parseFloat(tour.duration as string),
    groupSize: parseInt(tour.groupSize as unknown as string),
    rating: parseFloat(tour.rating as string)
}))

export interface Products {
	id: number;
	inverano_id: number;
	product_for: string;
	title: string;
	slug: string;
	photos: string;
	pricing: string;
}

export interface ProductsType {
    products: Products[];
    parentSlug:string
}
export default function Products({products,parentSlug}:ProductsType) {
    return (
        <>
            <div>
                
                <section className="box-section block-content-tourlist box-border-bottom background-body">
                    <div className="container">
                        <div className="box-content-main">
                            <div className="content-right">
                                
                                <div className="box-grid-tours wow fadeIn">
                                    <div className="row">
                                        {products?.map((product) => (
                                            <div className="col-xl-3 col-lg-4 col-md-6" key={product.id}>
                                                <ProductsCard product={product} parentSlug={parentSlug} />
                                            </div>
                                        ))}
                                    </div>
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
                                    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg></Link></div>
                            </div>
                        </div>
                        <div className="box-list-news wow fadeInUp">
                            <div className="box-swiper mt-30">
                                <div className="swiper-container swiper-group-3">
                                    <SwiperGroup3Slider />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box box-media background-body">
                    <div className="container-media wow fadeInUp"> <img src="/assets/imgs/page/homepage5/media.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media2.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media3.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media4.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media5.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media6.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media7.png" alt="Travila" /></div>
                </section>
            </div>
        </>
    )
}
