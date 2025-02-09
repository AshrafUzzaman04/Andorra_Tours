"use client"
import BlogPagination from "@/components/blog/BlogPagination";
import formatDate from "@/util/formatDate";
import { formatDateTimes } from "@/util/formatDateTimes";
import Link from "next/link"
import BlogsPagination from "./BlogsPagination";
import { useEffect, useState } from "react";
import Fetch from "@/helper/Fetch";

export interface Blog {
    title: string;
    slug: string;
    tag: string;
    photo: string;
    user_photo: string;
    user_name: string;
    button_text: string;
    date: string;
    created_at: string;
}

export interface BlogsResponse {
    current_page: number;
    data: Blog[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export default function BlogsChild({ blogs }: { blogs: BlogsResponse }) {
    const [blogsData, setBlogsData] = useState<BlogsResponse>(blogs);
    const [page, setPage] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            const res = await Fetch("/blogs?page=" + page);
            setBlogsData(res?.data?.data)
        };
        fetchData();
    }, [page]);

    const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    };

    return (
        <main className="main">
            <section className="box-section box-breadcrumb background-body">
                <div className="container">
                    <ul className="breadcrumbs">
                        <li> <Link href="/">Home</Link><span className="arrow-right">
                            <svg width={7} height={12} viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 11L6 6L1 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg></span></li>
                        <li> <Link href="/blog-grid">Blog</Link></li>
                    </ul>
                </div>
            </section>

            <section className="section-box box-news box-news-blog-2 background-9">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-md-6 mb-30 wow fadeInLeft">
                            <h2 className="neutral-1000">Recent Blogs</h2>
                            <p className="text-xl-medium neutral-500">Favorite destinations based on customer reviews</p>
                        </div>

                    </div>
                    <div className="box-list-news wow fadeInUp">
                        <div className="row">
                            {
                                blogsData && blogsData?.data?.map((blog, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 mb-30">
                                        <div className="card-news background-card hover-up">
                                            <div className="card-image">
                                                <label className="label">{blog?.tag}</label>
                                                <Link href={"/blogs/"+blog?.slug}>
                                                    <img src={process.env.NEXT_PUBLIC_STORAGE_URL + blog?.photo} alt="blog-photo" />
                                                </Link>
                                            </div>
                                            <div className="card-info">
                                                <div className="card-meta"> <span className="post-date neutral-1000">{formatDate(blog?.date)}</span><span className="post-time neutral-1000">{formatDateTimes(blog?.created_at)}</span></div>
                                                <div className="card-title"> <Link className="text-xl-bold neutral-1000" href={"/blogs/"+blog?.slug}>{blog?.title}</Link></div>
                                                <div className="card-program">
                                                    <div className="endtime">
                                                        <div className="card-author"> <img className="w-25 rounded-pill" src={process.env.NEXT_PUBLIC_STORAGE_URL + blog?.user_photo} alt="user-photo" />
                                                            <p className="text-sm-bold neutral-1000">{blog?.user_name}</p>
                                                        </div>
                                                        <div className="card-button"> <Link className="btn btn-gray" href={"/blogs/"+blog?.slug}>{blog?.button_text}</Link></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        {/* <BlogsPagination
                            getPaginationGroup={blogs?.total}
                            pages={blogs?.total}
                            handleActive={(pageNumber:number)=>setPage(pageNumber)}
                            DataArray={blogs?.data}
                        /> */}

                        {/* Updated Pagination Component */}
                        <BlogsPagination
                        currentPage={blogsData.current_page}
                        totalPages={blogsData.last_page}
                        onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </section>

        </main>
    )
}
