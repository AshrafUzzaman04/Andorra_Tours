"use client"
import useReview from '@/util/useReview';
import Link from 'next/link'
export interface Hotel {
    id: number;
	categorie_id: number;
	photo: string;
	photo_one: string;
	photo_two: string;
	photo_three: string;
	review: string;
	total_review: string;
	title: string;
	slug: string;
	location: string;
	map_location: string;
	tag: string;
	hotel_link: string;
	description: string;
}
export default function HotelCard({ hotel }: { hotel: Hotel }) {
    const stars = useReview(hotel?.review, 18,18);
    return (
        <>
            <div className="card-journey-small background-card">
                <div className="card-image"> <Link className="label z-2" href={"/hotel/"+hotel?.slug}>{hotel?.tag}</Link>
                    <Link href={"/hotel/"+hotel?.slug}>
                        <img src={process.env.NEXT_PUBLIC_STORAGE_URL + hotel?.photo} alt="Travila" />
                    </Link>
                </div>
                <div className="card-info">
                    <div className="card-rating z-2">
                        <div className="card-left"> </div>
                        <div className="card-right"> <span className="rating">{hotel?.review} <span className="text-sm-medium neutral-500">({hotel?.total_review} reviews)</span></span></div>
                    </div>
                    <div className="card-title"> <Link className="text-lg-bold neutral-1000" href={"/hotel/"+hotel?.slug}>{hotel?.title}</Link></div>
                    <div className="card-program">
                        <div className="card-location">
                            <Link href={hotel?.map_location}><p className="text-location text-sm-medium neutral-500">{hotel?.location}</p></Link>
                            <p className="text-star z-2"> 
                                {stars}
                            </p>
                        </div>
                        <div className="endtime w-100">
                            <div className="card-button w-100"> <Link className="btn btn-gray w-100" href={"/hotel/"+hotel?.slug}>Book Now</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
