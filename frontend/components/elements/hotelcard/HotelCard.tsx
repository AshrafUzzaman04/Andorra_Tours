"use client"
import useReview from '@/util/useReview';
import { HotelsType, linksType } from '@/util/useTopFilter';
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

export interface HotelData {
    map(arg0: (hotel: any) => import("react").JSX.Element): import("react").ReactNode
    id: number;
    top_title: string;
    top_sub_title: string;
    tag_title: string;
    tag_slug: string;
    tag: string;
    image: string;
    title: string;
    slug: string;
    sub_title: string;
    link: string;
    hotels: {
        current_page: number;
        data: HotelsType[];
        first_page_url: string;
        from?: string | number;
        last_page: number;
        last_page_url: string;
        links: linksType[];
        next_page_url: null,
        path: string,
        per_page: number,
        prev_page_url: string,
        to: null | number | string,
        total: number
    };
}
export default function HotelCard({ hotel, hotelsData }: { hotel: Hotel, hotelsData: HotelData}) {
  const stars = useReview(hotel?.review, 18, 18);
  return (
    <>
      <div className="card-journey-small background-card">
        <div className="card-image">
          {" "}
          <Link
            className="label z-2"
            href={"/shop/" + hotelsData.slug + "/" + hotel?.slug}
          >
            {hotel?.tag}
          </Link>
          <Link href={"/shop/" + hotelsData.slug + "/" + hotel?.slug}>
            <img
              src={process.env.NEXT_PUBLIC_STORAGE_URL + hotel?.photo}
              alt="Travila"
            />
          </Link>
        </div>
        <div className="card-info">
          <div className="card-rating z-2">
            <div className="card-left"> </div>
            <div className="card-right">
              {" "}
              <span className="rating">
                {hotel?.review}{" "}
                <span className="text-sm-medium neutral-500">
                  ({hotel?.total_review} reviews)
                </span>
              </span>
            </div>
          </div>
          <div className="card-title">
            {" "}
            <Link
              className="text-lg-bold neutral-1000"
              href={"/shop/" + hotelsData.slug + "/" + hotel?.slug}
            >
              {hotel?.title}
            </Link>
          </div>
          <div className="card-program">
            <div className="card-location">
              <Link href={hotel?.map_location}>
                <p className="text-location text-sm-medium neutral-500">
                  {hotel?.location}
                </p>
              </Link>
              <p className="text-star z-2">{stars}</p>
            </div>
            <div className="endtime w-100">
              <div className="card-button w-100">
                {" "}
                <Link
                  className="btn btn-gray w-100"
                  href={"/hotel/" + hotel?.slug}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
