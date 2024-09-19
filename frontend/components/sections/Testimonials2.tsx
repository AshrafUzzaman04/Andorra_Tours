'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { swiperGroupAnimate } from "@/util/swiperOption"
export interface Testimonial {
    id: number;
    review_title: string;
    review_text: string;
    client_photo: string;
    client_name: string;
    client_address: string;
    reviews: string | number; // reviews can be a number or a string, depending on your data structure
    status: string;
}
export interface TestimonialData {
    testimonials: {
        heading: {heading: string};
        testimonials: Testimonial[];
    };
}
export default function Testimonials2({ testimonials }: TestimonialData) {
    return (
        <>

            <section className="section-box box-testimonials-2 background-body">
                <div className="container">
                    {/* <div className="box-author-testimonials"> <img src="/assets/imgs/page/homepage1/testimonial.png" alt="Travila" /><img src="/assets/imgs/page/homepage1/testimonial2.png" alt="Travila" /><img src="/assets/imgs/page/homepage1/testimonial3.png" alt="Travila" />Testimonials</div> */}
                    <h2 className="mt-8 mb-25 neutral-1000 text-center">{testimonials?.heading?.heading}</h2>
                </div>
                <div className="block-testimonials ps-1 pe-1">
                    <div className="container-testimonials">
                        <div className="container-slider">
                            <div className="box-swiper mt-30">
                                <div className="swiper-container swiper-group-animate swiper-group-journey">
                                    <Swiper {...swiperGroupAnimate}>
                                        {
                                            testimonials?.testimonials && testimonials?.testimonials?.map((testimonial:Testimonial, index: number) => (
                                                <SwiperSlide key={index}>
                                                    <div className="card-testimonial background-card">
                                                        <div className="card-info">
                                                            <p className="text-xl-bold card-title neutral-1000">{testimonial?.review_title}
                                                            </p>
                                                            <p className="neutral-500">{testimonial?.review_text}</p>
                                                        </div>
                                                        <div className="card-top">
                                                            <div className="card-author">
                                                                <div className="card-image"> <img src={process.env.NEXT_PUBLIC_STORAGE_URL + testimonial?.client_photo} alt={testimonial?.client_name} />
                                                                </div>
                                                                <div className="card-info">
                                                                    <p className="text-lg-bold neutral-1000">{testimonial?.client_name}</p>
                                                                    <p className="text-sm neutral-1000">{testimonial?.client_address}</p>
                                                                </div>
                                                            </div>
                                                            <div className="card-rate">
                                                                {Array.from({ length: Number(testimonial?.reviews) }, (_, index) => (
                                                                    <img src="/assets/imgs/template/icons/star.svg" alt="Star" key={index} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        }


                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="box-button-slider box-button-slider-team text-end">
                        <div className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-animate">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" >
                                <path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="swiper-button-next swiper-button-next-style-1 swiper-button-next-animate">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" >
                                <path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" strokeLinecap="round" strokeLinejoin="round"> </path>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
