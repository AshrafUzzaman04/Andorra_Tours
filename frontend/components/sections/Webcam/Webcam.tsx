"use client";
import React, { useState } from "react";
import { Snowflake } from 'lucide-react'
import Link from "next/link";
import WebcamViewer from "./WebcamViewer";
export interface WebcamsType {
    id: number;
    name: string;
    logo: string;
    webcams: {
        id: number;
        provider_id: number;
        webcams: string
    }
}

export interface WebcamsTypes {
    webcamsData: WebcamsType[];
    map: string
}
export default function Webcam({ webcamsData, map }: WebcamsTypes) {
    const [hoveredLocation, setHoveredLocation] = useState(0);
    return (
        <div className="min-vh-100 py-5">
            <div className="container">
                {webcamsData?.map((webcams, index) => (
                    <div
                        key={webcams.id}
                        className={`card pricing-card h-100 mb-5 fade-in-up p-4`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                    >
                        <div className="card-header text-center border-0 bg-transparent pt-4 py-4">
                            <img
                                src={process.env.NEXT_PUBLIC_STORAGE_URL + webcams?.logo}
                                alt={webcams?.name}
                                className="img-fluid resort-logo mx-auto d-block"
                                style={{ maxWidth: "300px" }}
                            />
                        </div>
                        <div className="card-body rounded">
                            <h2 className="text-center mb-4 neutral-1000">{webcams?.name}</h2>
                            {JSON.parse(webcams?.webcams?.webcams || '[]').length > 0 && (
                                <div className="row g-3">
                                    {JSON.parse(webcams?.webcams?.webcams || '[]')?.map((webcam: any, index: number) => (
                                        <div key={index} className="col-sm-6 col-md-4">
                                            {webcams?.name === "Andorra" ? (
                                                <Link href={webcam?.webcam}
                                                    className={`btn btn-outline-primary w-100 position-relative text-start custom-btn ${hoveredLocation === webcam?.name ? "hovered" : ""
                                                        }`}
                                                    onMouseEnter={() => setHoveredLocation(index + 1)}
                                                    onMouseLeave={() => setHoveredLocation(0)}
                                                    style={{ animationDelay: `${index * 0.1}s` }}
                                                >
                                                    <Snowflake className="position-absolute snowflake-icon" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                                                    <span className="ms-4 location-text">{webcam?.name}</span>
                                                    <div className="hover-bg"></div>
                                                </Link>
                                            ) : <WebcamViewer webcam={webcam} />}


                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
