"use client"
import React from 'react'
import Link from 'next/link'
import { MountainSnow } from 'lucide-react';
export interface ResortsCardType {
    id: number;
    name: string;
    photo: string;
    country: string;
    provider_id: number;
    slug: string;
    height: string;
}
export default function ResortsCard({ resort }: { resort: ResortsCardType }) {
    return (
        <Link href={"/resorts/" + resort?.slug}>
            <div className="card-journey-big background-card">
                <div className="card-image">
                    <div className="text-lg-bold neutral-1000">
                        <img src={process.env.NEXT_PUBLIC_STORAGE_URL + resort?.photo} alt={resort?.name} />
                    </div>
                </div>
                <div className="card-info background-card py-3 text-start">
                    <div className="card-program text-start">
                        <div className="endtime w-100">
                            <div className="card-price mb-2">
                                <div className="d-flex align-items-center gap-2">
                                    <h6 className="text-lg-bold neutral-1000">{resort?.name} </h6>
                                    <h6 className="neutral-1000" >-</h6>
                                    <p className="text-muted fw-bold">{resort?.country}</p>
                                </div>
                                <div className=" d-flex align-items-center gap-2 mt-2">
                                    <img className="img-fluid" style={{width:"30px"}} src="/assets/imgs/mountain.png"/>
                                    <p className="text-muted fw-bold">{resort?.height}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
