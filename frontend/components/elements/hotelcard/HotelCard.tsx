"use client"
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
    return (
        <>
            <div className="card-journey-small background-card">
                <div className="card-image"> <Link className="label" href="#">{hotel?.tag}</Link>
                    <Link href="/hotel-detail">
                        <img src={process.env.NEXT_PUBLIC_STORAGE_URL + hotel?.photo} alt="Travila" />
                    </Link>
                </div>
                <div className="card-info">
                    <div className="card-rating">
                        <div className="card-left"> </div>
                        <div className="card-right"> <span className="rating">{hotel?.review} <span className="text-sm-medium neutral-500">({hotel?.total_review} reviews)</span></span></div>
                    </div>
                    <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/hotel-detail">{hotel?.title}</Link></div>
                    <div className="card-program">
                        <div className="card-location">
                            <Link href={hotel?.map_location}><p className="text-location text-sm-medium neutral-500">{hotel?.location}</p></Link>
                            <p className="text-star"> <img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="Travila" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="Travila" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="Travila" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="Travila" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="Travila" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="Travila" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="Travila" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="Travila" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="Travila" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="Travila" /></p>
                        </div>
                        <div className="endtime w-100">
                            <div className="card-button w-100"> <Link className="btn btn-gray w-100" href="#">Book Now</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
