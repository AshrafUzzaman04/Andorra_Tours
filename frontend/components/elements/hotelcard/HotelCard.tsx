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
                    {/* <Link className="wish" href="#">
                        <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                    </Link> */}
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
