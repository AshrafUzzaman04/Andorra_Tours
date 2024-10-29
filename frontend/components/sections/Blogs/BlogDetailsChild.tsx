'use client'
import VideoPopup from '@/components/elements/VideoPopup'
import formatDate from '@/util/formatDate'
import { formatDateTimes } from '@/util/formatDateTimes'
import { swiperGroup1, swiperGroupAnimate } from "@/util/swiperOption"
import Link from 'next/link'
import parse from 'html-react-parser'
import { Swiper, SwiperSlide } from "swiper/react"
import SocialShare from '@/util/SocialShare'
export interface Blog {
	title: string;
	slug: string;
	tag: string;
	photo: string;
	user_photo: string;
	user_name: string;
	button_text: string;
	date: string;
	description: string;
	images: string;
	created_at: string;
}
export interface Trending {
	title: string;
	slug: string;
	photo: string;
	date: string;
}
export interface propsTypes {
	blog: Blog;
	tending: Trending[];
}
export default function BlogDetailsChild({ blog, tending }: propsTypes) {
	const parsedImages = JSON.parse(blog?.images || '[]');
	return (
		<main className="main">
			<section className="box-section box-breadcrumb background-body">
				<div className="container">
					<ul className="breadcrumbs">
						<li> <Link href="/">Home</Link><span className="arrow-right">
							<svg width={7} height={12} viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 11L6 6L1 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
							</svg></span></li>
						<li> <Link href={"/blogs/"}>Blogs</Link><span className="arrow-right">
							<svg width={7} height={12} viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 11L6 6L1 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
							</svg></span></li>
						<li> <span className="text-breadcrumb">{blog?.title}</span></li>
					</ul>
				</div>
			</section>
			<section className="section-box box-banner-blog-detail-2 background-body">
				<div className="container">
					<div className="box-banner-single-blog">
						<div className="box-button-top-right"><Link className="btn btn-label-tag-lg background-7" href="#">{blog?.tag}</Link></div>
						<div className="box-swiper">
							<div className="swiper-container swiper-group-1">
								<Swiper {...swiperGroup1}>
									<SwiperSlide >
										<img className="w-100" src={process.env.NEXT_PUBLIC_STORAGE_URL + blog?.photo} alt={"blog-photos"} />
									</SwiperSlide>
									{

										parsedImages && parsedImages.map((image: string, index: number) => (
											<SwiperSlide key={index}>
												<img className="w-100" src={process.env.NEXT_PUBLIC_STORAGE_URL + image} alt={"blog-photos-" + index + 1} />
											</SwiperSlide>
										))
									}
								</Swiper>
							</div>
							<div className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-group-1">
								<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" >
									<path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>
							<div className="swiper-button-next swiper-button-next-style-1 swiper-button-next-group-1">
								<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" >
									<path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="box-section box-content-blog-detail-2 background-body">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mb-35">
							<div className="box-content-detail-blog">
								<div className="box-content-info-detail mt-0 pt-0">
									<div className="head-blog-detail">
										<h4 className="neutral-1000 mb-25">{blog?.title}</h4>
										<div className="meta-post">
											<div className="meta-user justify-content-start">
												<div className="box-author-small"><img src={process.env.NEXT_PUBLIC_STORAGE_URL + blog?.user_photo} alt="user_photo" />
													<p className="text-sm-bold neutral-1000">{blog?.user_name}</p>
												</div>
												<div className="post-meta-date">
													<div className="post-date neutral-1000">{formatDate(blog?.date)}</div>
													<div className="post-time neutral-1000">{formatDateTimes(blog?.created_at)}</div>
												</div>
											</div>
										</div>
									</div>

									<div className="content-detail-post">
										{parse(blog?.description || '')}
										<div className="footer-post-tags">
											<div className="box-tags"></div>
											<div className="box-share">
												<SocialShare/>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 mb-35">

							<div className="box-sidebar-border">
								<div className="box-head-sidebar">
									<p className="text-xl-bold neutral-1000">Trending Blogs</p>
								</div>
								<div className="box-content-sidebar">
									<ul className="list-posts">
										{
											tending && tending?.map((blog: any, index: number) => (
												<li key={index}>
													<div className="card-post">
														<div className="card-image"> <Link href={"/blogs/" + blog?.slug}><img src={process.env.NEXT_PUBLIC_STORAGE_URL + blog?.photo} alt="blog-photo" /></Link></div>
														<div className="card-info"> <Link className="text-md-bold neutral-1000" href={"/blogs/" + blog?.slug}>{blog?.title}</Link>
															<p className="text-sm-medium date-post neutral-500">{formatDate(blog?.date)}</p>
														</div>
													</div>
												</li>
											))
										}


									</ul>
								</div>
							</div>

							<div className="box-sidebar-border">
								<div className="box-head-sidebar">
									<p className="text-xl-bold neutral-1000">Gallery</p>
								</div>
								<div className="box-content-sidebar">
									<ul className="list-photo-col-3">
										{

											parsedImages && parsedImages.map((image: string, index: number) => (
												<li key={index}> <Link href={process.env.NEXT_PUBLIC_STORAGE_URL + image}><img src={process.env.NEXT_PUBLIC_STORAGE_URL + image} alt="photos" /></Link></li>
											))
										}


									</ul>
								</div>
							</div>

						</div>
					</div>
				</div>
			</section>

		</main>
	)
}
