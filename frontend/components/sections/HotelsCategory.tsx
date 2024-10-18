'use client'
import ByPagination from '@/components/Filter/ByPagination'
import CagegoryFilter2 from '@/components/elements/CagegoryFilter2'
import SearchFilterBottom from '@/components/elements/SearchFilterBottom'
import SortCarsFilter from '@/components/elements/SortCarsFilter'
import CarCard1 from '@/components/elements/carcard/CarCard1'
import Layout from "@/components/layout/Layout"
import rawCarsData from "@/util/cars.json"
import useCarFilter from '@/util/useCarFilter'
import Link from "next/link"
import HotelCategoryCard from '../elements/carcard/HotelCategoryCard'
const carsData = rawCarsData.map(car => ({
    ...car,
    rating: parseFloat(car.rating as string)
}))

export interface HotelesDataItems {
    tag_slug: string;
    slug: string;
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
export interface HeadingDataItem {
    id: number;
    heading_for: string;
    heading: string;
    sub_heading: string;
}


export interface TopRatedHotelsTypes {
    data: HotelesDataItems[]
    headingData: HeadingDataItem
}

export default function HotelsCategory({ data, headingData }: TopRatedHotelsTypes) {

    return (
        <>
            <main className="main">
                <section className="box-section block-banner-tourlist block-banner-hotel">
                    <div className="container z-3">
                        <div className="text-center">
                            <h3 className="mb-15">{headingData?.heading}</h3>
                            <h6 className="heading-6-medium">{headingData?.sub_heading}</h6>
                        </div>
                    </div>
                </section>

                <section className="box-section block-content-tourlist background-body">
                    <div className="container">
                        {/* <div className="text-center pt-50 hotel-heading">
                            <h3 className="mb-15">{headingData?.heading}</h3>
                            <h6 className="heading-6-medium">{headingData?.sub_heading}</h6>
                        </div> */}
                        <div className="box-content-main pt-40">
                            <div className="content-right">
                                <div className="box-grid-tours wow fadeIn">
                                    <div className="row">
                                        {data?.map((hotel, index) => (
                                            <div className="col-lg-3 col-md-6 wow fadeInUp" key={index}>
                                                <HotelCategoryCard key={index} hotel={hotel} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}
