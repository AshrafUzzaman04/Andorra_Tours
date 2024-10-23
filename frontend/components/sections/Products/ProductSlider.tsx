'use client'
import { swipeProducts, swiperGroup3 } from "@/util/swiperOption"
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react"
import ProductsCard from "./ProductsCard";
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
    verano?:{
        id: number;
        slug: string;
    }
    inverano?:{
        id: number;
        slug: string;
    }
}

export interface ProductDetailsType {
    PopularProducts: Product[];
}
export default function ProductSlider({ PopularProducts }: ProductDetailsType) {
    return (
        <>
            <Swiper {...swipeProducts}>
                {
                    PopularProducts?.map((product, index) => (
                        <SwiperSlide key={index}>
                            <ProductsCard product={product} parentSlug={product?.inverano?.slug} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    )
}

