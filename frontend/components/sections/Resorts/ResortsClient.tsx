"use client"

import ResortsCard from "./RsortsCard";

export interface ResortsCardType {
    id: number;
    name: string;
    photo: string;
    country: string;
    provider_id: number;
    slug: string;
    height:string;
}
export interface Resorts {
    id: number;
    name: string;
    logo: string;
    resorts: ResortsCardType[];
}
export interface TypesData {
    resorts: Resorts[];
    map: {
        map_photo: string;
    }
}
export default function ResortsClient({ resorts, map }: TypesData) {
    console.log(resorts)
    return (
        <>
            {
                resorts && resorts?.map((resort: Resorts, index: number) => (
                    <div key={index} className="text-center wow fadeInUp my-5">
                        <div className="" >
                            <img className="img-fluid" style={{width:"550px"}} src={process.env.NEXT_PUBLIC_STORAGE_URL + resort?.logo} alt={resort?.name} />
                        </div>
                        {/* <h2 className="neutral-1000">{resort?.name}</h2> */}
                        <div className="row g-3">
                        {
                            resort?.resorts?.length > 0 && resort?.resorts?.map((resort,index) =>(
                                <div key={resort?.id + 1} className="col-md-4 my-5">
                                    <ResortsCard resort={resort}/>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    
                ))
            }
        </>
    )
}
