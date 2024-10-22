import React from 'react'
import Link from 'next/link'
import { NumericFormat } from 'react-number-format';
export interface Products {
    id: number;
    inverano_id: number;
    product_for: string;
    title: string;
    slug: string;
    photos: string;
    pricing: string;
}
export default function ProductsCard({ product, parentSlug }: { product: Products, parentSlug: string }) {
    const photo = product?.photos ? JSON.parse(product?.photos)[0] ?? "" : "";
    const priceObject = product?.pricing ? JSON.parse(product?.pricing)[0] : "";
    return (
        <>
            <div className="card-journey-big background-card">
                <div className="card-image">
                    <Link className="text-lg-bold neutral-1000" href={"/" + product?.product_for + "/" + parentSlug + "/product/" + product?.slug}>
                        <img src={process.env.NEXT_PUBLIC_STORAGE_URL + photo} alt={product?.title} />
                    </Link>
                </div>
                <div className="card-info background-card py-3">
                    <div className="card-title"> <Link className="text-lg-bold neutral-1000" href={"/" + product?.product_for + "/" + parentSlug + "/product/" + product?.slug}>{product?.title} </Link></div>
                    <div className="card-program">
                        <div className="endtime w-100">
                            <div className="card-price">
                                <h6 className="text-lg-bold neutral-1000">Desde: {" "}
                                    <NumericFormat
                                        value={priceObject?.online_price}
                                        displayType="text"
                                        thousandSeparator={","}
                                        decimalSeparator="."
                                        decimalScale={2}
                                        fixedDecimalScale
                                        suffix='€'
                                    /></h6>
                            </div>
                            <div className="card-button"> <Link className="btn btn-gray w-100 mt-3" href={"/" + product?.product_for + "/" + parentSlug + "/product/" + product?.slug}>Reant</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
