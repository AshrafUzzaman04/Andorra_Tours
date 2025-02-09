'use client'
import { useEffect, useState } from "react";
import { swiperGroup3 } from "@/util/swiperOption";
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import Fetch from "@/helper/Fetch";
import formatDate from "@/util/formatDate";
import { formatDateTimes } from "@/util/formatDateTimes";

async function getBlog() {
	const res = await Fetch(`/latest-blogs`);
    return res?.data?.data;
}

export default function BlogsLatestSlider() {
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const data = await getBlog();
			setBlogs(data || []);
			console.log(blogs);
		}
		fetchData();
	}, []);

	return (
		<>
			{blogs.length > 0 && (
				<Swiper {...swiperGroup3}>
					{blogs?.map((blog, index) => (
						<SwiperSlide key={index}>
							<div className="card-news background-card hover-up">
								<div className="card-image">
									<label className="label">{blog?.tag}</label>
									{/* <Link className="wish" href="#">
										<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
											<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
										</svg>
									</Link> */}
									{/* <img src={blog?.image || "/assets/imgs/page/homepage1/news.png"} alt="Blog Image" /> */}
									<Link href={"/blogs/"+blog?.slug}>
                                                    <img src={process.env.NEXT_PUBLIC_STORAGE_URL + blog?.photo} alt="blog-photo" />
                                                </Link>
								</div>
								<div className="card-info">
									<div className="card-meta">
										<span className="post-date neutral-1000">{formatDate(blog?.date) || "Unknown Date"}</span>
										<span className="post-time neutral-1000">{formatDateTimes(blog?.created_at)}</span>
									</div>
									<div className="card-title">
										<Link className="text-xl-bold neutral-1000" href={"/blogs/"+blog?.slug}>{blog?.title}</Link>
									</div>
									<div className="card-program">
										<div className="endtime">
											<div className="card-author">
												<img className="w-25 rounded-pill" src={process.env.NEXT_PUBLIC_STORAGE_URL + blog?.user_photo} alt="user-photo" />
												<p className="text-sm-bold neutral-1000">{blog?.user_name}</p>
											</div>
											<div className="card-button min-w-max">
												<Link className="btn btn-gray" href={"/blogs/"+blog?.slug}>{blog?.button_text}</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</>
	);
}
