"use client";
import BlogsLatestSlider from "@/components/slider/BlogsLatestSlider";
import { swiperDetails, swiperGroup1 } from "@/util/swiperOption";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import parse from "html-react-parser";
import BookingForm from "@/components/sections/BookingForm";
import { NumericFormat } from "react-number-format";
import { usePathname } from "next/navigation";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import Products from "./Products/Products";
export interface VeranoData {
  id: number;
  type: string;
  label: string;
  reviews: string;
  total_reviews: string;
  reviews_link: string;
  title: string;
  price: string;
  booking_link: string;
  slug: string;
  photo: string;
  status: string;
  created_at: string;
  updated_at: string;
  details: VeranoDetails;
  products: Products[];
}

export interface Products {
  id: number;
  inverano_id: number;
  product_for: string;
  title: string;
  slug: string;
  photos: string;
  pricing: string;
}

export interface PopularTours {
  title: string;
  price: string;
  booking_link: string;
  slug: string;
  photo: string;
}

export interface PopularToursTypes {
  map: any;
  popular_tours: PopularTours[];
}

export interface VeranoDetails {
  id: number;
  verano_id: number;
  duration: string;
  duration_title: string;
  group_size: string;
  group_size_title: string;
  tour_type: string;
  tour_type_title: string;
  language: string;
  language_title: string;
  details: string; // This is a string that will be parsed
  form_title: string;
  times: string; // This is a string that will be parsed
  service_title: string;
  services: string; // This is a string that will be parsed
  add_extra_title: string;
  add_extra: string; // This is a string that will be parsed
  question_title: string;
  answers: string; // This is a string that will be parsed
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DetailItem {
  id: number;
  title: string;
  description: string;
}

export interface QuestionAnswer {
  id: number;
  question: string;
  answer: string;
}
export interface promotionData {
  id: number;
  banner_title: string;
  banner_title_color: string;
  button_text: string;
  button_color: string;
  button_text_color: string;
  button_link: string;
  banner_image: string;
  status: string;
  created_at: string;
  updated_at: string;
}
export interface promotionTypesData {
  map(
    arg0: (promotion: any, index: any) => import("react").JSX.Element
  ): import("react").ReactNode;
  promotionData: promotionData[];
}

export default function TourDetails({
  details,
  popular_tours,
  promotionData,
}: {
  details: VeranoData;
  popular_tours: PopularToursTypes;
  promotionData: promotionTypesData;
}) {
  const path = usePathname();
  const type = path.split("/")[1];
  const [isAccordion, setIsAccordion] = useState(0);
  const handleAccordion = (key: any) => {
    setIsAccordion(key);
  };
  const parsedDetails: DetailItem[] = JSON.parse(
    details?.details?.details || "[]"
  );
  const parsedAnswers: QuestionAnswer[] = JSON.parse(
    details?.details?.answers || "[]"
  );
  function isOdd(number: number) {
    return number % 2 !== 0;
  }
  return (
    <>
      <main className="main">
        <section className="box-section box-breadcrumb background-body">
          <div className="container">
            <ul className="breadcrumbs">
              <li>
                {" "}
                <Link href="/">Home</Link>
                <span className="arrow-right">
                  <svg
                    width={7}
                    height={12}
                    viewBox="0 0 7 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 11L6 6L1 1"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </li>
              <li className="text-capitalize">
                {" "}
                <Link href={"/" + type}>{type}</Link>
                <span className="arrow-right">
                  <svg
                    width={7}
                    height={12}
                    viewBox="0 0 7 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 11L6 6L1 1"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </li>
              <li>
                {" "}
                <span className="text-breadcrumb">
                  {details?.title ? details?.title : ""}
                </span>
              </li>
            </ul>
          </div>
        </section>
        <section className="box-section block-banner-tour-detail-4 background-card">
          <div className="box-banner-tour-detail-4">
            <div className="box-banner-tour-detail-4-inner">
              <div className="box-swiper">
                <div className="swiper-container swiper-group-1">
                  <Swiper {...swiperGroup1}>
                    <SwiperSlide>
                      <div
                        className="box-banner-tour-4"
                        style={{ height: "700px" }}
                      >
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          src={
                            process.env.NEXT_PUBLIC_STORAGE_URL + details?.photo
                          }
                          alt="Travile"
                        />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-group-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="swiper-button-next swiper-button-next-style-1 swiper-button-next-group-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                    </path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="box-header-on-top">
            <div className="container">
              <div className="tour-header tour-header-on-top">
                <div className="tour-rate">
                  <div className="rate-element">
                    <span className="rating">
                      {details?.reviews ? details?.reviews : 0}{" "}
                      <span className="text-sm-medium neutral-500">
                        ({details?.total_reviews ? details?.total_reviews : 0}{" "}
                        reviews)
                      </span>
                    </span>
                  </div>
                </div>
                <div className="tour-title-main">
                  <h4 className="color-white w-lg-75">
                    {details?.title ? details?.title : ""}
                  </h4>
                </div>
                <div className="tour-metas">
                  <div className="tour-meta-left">
                    {/* <p className="mr-20 text-md-medium color-white tour-location">
												<svg width={12} height={16} viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">
													<path d="M5.99967 0C2.80452 0 0.205078 2.59944 0.205078 5.79456C0.205078 9.75981 5.39067 15.581 5.61145 15.8269C5.81883 16.0579 6.18089 16.0575 6.38789 15.8269C6.60867 15.581 11.7943 9.75981 11.7943 5.79456C11.7942 2.59944 9.1948 0 5.99967 0ZM5.99967 8.70997C4.39211 8.70997 3.0843 7.40212 3.0843 5.79456C3.0843 4.187 4.39214 2.87919 5.99967 2.87919C7.6072 2.87919 8.91502 4.18703 8.91502 5.79459C8.91502 7.40216 7.6072 8.70997 5.99967 8.70997Z" />
												</svg>{details?. ? details?.title:""}
											</p><Link className="text-md-medium color-white mr-30" href="#">Show on map</Link> */}
                  </div>
                  <div className="tour-meta-right">
                    {/* <Link className="btn btn-share" href="#">
										<svg width={16} height={18} viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
											<path d="M13 11.5332C12.012 11.5332 11.1413 12.0193 10.5944 12.7584L5.86633 10.3374C5.94483 10.0698 6 9.79249 6 9.49989C6 9.10302 5.91863 8.72572 5.77807 8.37869L10.7262 5.40109C11.2769 6.04735 12.0863 6.46655 13 6.46655C14.6543 6.46655 16 5.12085 16 3.46655C16 1.81225 14.6543 0.466553 13 0.466553C11.3457 0.466553 10 1.81225 10 3.46655C10 3.84779 10.0785 4.20942 10.2087 4.54515L5.24583 7.53149C4.69563 6.90442 3.8979 6.49989 3 6.49989C1.3457 6.49989 0 7.84559 0 9.49989C0 11.1542 1.3457 12.4999 3 12.4999C4.00433 12.4999 4.8897 11.9996 5.4345 11.2397L10.147 13.6529C10.0602 13.9331 10 14.2249 10 14.5332C10 16.1875 11.3457 17.5332 13 17.5332C14.6543 17.5332 16 16.1875 16 14.5332C16 12.8789 14.6543 11.5332 13 11.5332Z" />
										</svg>Share</Link><Link className="btn btn-wishlish" href="#">
											<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M2.2222 2.3638C4.34203 0.243977 7.65342 0.0419426 10.0004 1.7577C12.3473 0.0419426 15.6587 0.243977 17.7786 2.3638C20.1217 4.70695 20.1217 8.50594 17.7786 10.8491L12.1217 16.5059C10.9501 17.6775 9.05063 17.6775 7.87906 16.5059L2.2222 10.8491C-0.120943 8.50594 -0.120943 4.70695 2.2222 2.3638Z" />
											</svg>Wishlish</Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {details && details?.type !== "multiple" && (
          <section className="box-section box-content-tour-detail background-body">
            <div className="px-2 px-md-5 container-fluid">
              <div className="row">
                <div className="col-lg-8">
                  <div className="box-collapse-expand">
                    {parsedDetails &&
                      parsedDetails?.map((details, i) => (
                        <div key={i} className="group-collapse-expand">
                          <button
                            className={
                              isAccordion === i + 1
                                ? "btn btn-collapse collapsed"
                                : "btn btn-collapse"
                            }
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOverview"
                            aria-expanded="false"
                            aria-controls="collapseOverview"
                            onClick={() => handleAccordion(i + 1)}
                          >
                            <h6>{details?.title}</h6>
                            <svg
                              width={12}
                              height={7}
                              viewBox="0 0 12 7"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1L6 6L11 1"
                                stroke=""
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                              />
                            </svg>
                          </button>
                          <div
                            className={
                              isAccordion === i + 1
                                ? "collapse"
                                : "collapse show"
                            }
                            id="collapseOverview"
                          >
                            <div className="card card-body">
                              {parse(details?.description)}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="booking-form">
                    {details?.booking_link === null && (
                      <div className="head-booking-form">
                        <p className="text-xl-bold neutral-1000">
                          {details?.details?.form_title}
                        </p>
                      </div>
                    )}
                    <BookingForm
                      bookingLink={details?.booking_link}
                      product={details}
                      FormData={details.details}
                    />
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <h6 className="text-lg-bold neutral-1000">Popular Tours</h6>
                    <div className="box-popular-posts box-popular-posts-md">
                      <ul>
                        {popular_tours &&
                          popular_tours?.map((tour: any, i: number) => (
                            <li key={i}>
                              <div className="card-post">
                                <div className="card-image">
                                  <Link href={"/" + type + "/" + tour?.slug}>
                                    <img
                                      src={
                                        process.env.NEXT_PUBLIC_STORAGE_URL +
                                        tour?.photo
                                      }
                                      alt="Travila"
                                    />
                                  </Link>
                                </div>
                                <div className="card-info">
                                  {" "}
                                  <Link
                                    className="text-xs-bold"
                                    href={"/" + type + "/" + tour?.slug}
                                  >
                                    {tour?.title}
                                  </Link>
                                  <span className="price text-sm-bold neutral-1000">
                                    <NumericFormat
                                      value={tour?.price}
                                      displayType="text"
                                      thousandSeparator={","}
                                      decimalSeparator="."
                                      decimalScale={2}
                                      fixedDecimalScale
                                      suffix="€"
                                    />
                                    {/* {tour?.price}€ */}
                                  </span>
                                </div>
                                {/* <span className="price-through text-sm-bold neutral-500">$60.75</span> */}
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  <div className="sidebar-banner">
                    <section className="section-box box-2-banner background-body">
                      <div className="">
                        <div className="wow fadeInUp">
                          <div className="box-swiper">
                            <div className="swiper-container swiper-group-3">
                              <Swiper {...swiperDetails}>
                                {promotionData &&
                                  promotionData?.map((promotion, index) => (
                                    <SwiperSlide key={index}>
                                      <div className="card-banner">
                                        <div className="card-image">
                                          {" "}
                                          <img
                                            src={
                                              process?.env
                                                ?.NEXT_PUBLIC_STORAGE_URL +
                                              promotion?.banner_image
                                            }
                                            alt="Travila"
                                          />
                                        </div>
                                        <div className="card-info">
                                          <h4
                                            style={{ width: "251px" }}
                                            className="fs-2"
                                          >
                                            {promotion?.banner_title}
                                          </h4>
                                          <Link href={promotion?.button_link}>
                                            <button
                                              className="mx-auto border-0 btn btn-secondary fw-bold fs-6 rounded-pill mt-110 ml-85"
                                              style={{
                                                backgroundColor:
                                                  promotion?.button_color,
                                                color:
                                                  promotion?.button_text_color,
                                              }}
                                            >
                                              {promotion?.button_text}
                                              <ArrowRightIcon
                                                width={16}
                                                height={16}
                                                className=" ms-2"
                                              />
                                            </button>
                                          </Link>
                                        </div>
                                      </div>
                                    </SwiperSlide>
                                  ))}
                              </Swiper>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                  {/* <div className="sidebar-banner"> <Link href="#"><img src="/assets/imgs/page/tour-detail/banner-ads2.png" alt="Travila" /></Link></div> */}
                </div>
              </div>
            </div>
          </section>
        )}
        {details && details?.type === "multiple" && (
          <Products products={details?.products} parentSlug={details?.slug} />
        )}
      </main>
    </>
  );
}
