import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function HotelCategoryCard({hotel, key}:any) {
    return (
        <>
            <div className=" card-journey-small hotel-card-info background-card px-3 py-3 mb-3 text-center">
                <div className="card-left">
                    <div className="card-title"> <Link className="text-lg-bold neutral-1000 text-truncate" href={"/" + hotel?.tag_slug + "/" + hotel?.slug}>{hotel?.top_title}</Link></div>
                    <div className="card-desc"> <Link className="text-sm neutral-500 text-truncate" href={"/" + hotel?.tag_slug + "/" + hotel?.slug}>{hotel?.top_sub_title}</Link></div>
                </div>

            </div>
            <div className="card-journey-small background-card">
                <div className="card-image"> <Link className="hotelsTag" href="#">
                    <img width={50} height={50} className="" src={process?.env?.NEXT_PUBLIC_STORAGE_URL + hotel?.tag} alt="Travila" />
                </Link><img src={process?.env?.NEXT_PUBLIC_STORAGE_URL + hotel?.image} alt="Travila" />
                </div>
                <div className="card-info">
                    <div className="hotel-card-title"> <Link className="heading-6 neutral-1000" href={"/" + hotel?.tag_slug + "/" + hotel?.slug}>{hotel?.title}
                    </Link>
                    </div>
                    <div className="card-program">
                        <div className="card-location">
                            <p className="text-description text-md-medium neutral-500 text-truncate">{hotel?.sub_title}

                            </p>
                        </div>
                        <div className="buttonendtime">
                            <div className="card-button w-100"> <Link className="btn btn-gray w-100" href={"/" + hotel?.tag_slug + "/" + hotel?.slug}>A por ello</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
