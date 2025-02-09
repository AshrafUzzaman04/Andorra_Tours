"use server"
import MasterLayout from "@/components/layout/MasterLayout";
import Fetch from "@/helper/Fetch";
import parse from 'html-react-parser';
import Link from "next/link"
type socialLink = {
    id: string;
    social_icon: string;
    link: string;
    status: string;
};
const getData = async ({ params }: { params: { slug: string } }) => {
    const res = await Fetch(`/page/${params?.slug}`)
    const data = res?.data?.data;
    const socialLinks = res?.data?.socialLinks;
    return {data, socialLinks};
};

export async function generateMetadata({params}:{params:{slug:string}}) {
    // Fetch dynamic SEO data (replace with your actual API endpoint)
    const response = await Fetch.get("/page/" + params?.slug);
    const seoData = await response?.data?.data || {};

    return {
        title: seoData.page_title || "Tours Andorra",
        description: seoData.meta_description || "Portal de Actividades / Experiencias #1 en Andorra",
        keywords: seoData.meta_tags || "tours andorra, andorra tours, travel andorra, travel, explore andorra,",
        openGraph: {
            title: seoData.page_title || "Tours Andorra",
            description: seoData.meta_description || "Portal de Actividades / Experiencias #1 en Andorra",
            images: ["https://api.ownchoose.com/storage/logos/UVjUj1HNq6CfrXQU57QINTJH8abBZ1dxpF7DqNQo.png"],
            url: "https://andorra-tours.vercel.app/",
        },
        twitter: {
            title: seoData.page_title || "Tours Andorra",
            description: seoData.meta_description || "Portal de Actividades / Experiencias #1 en Andorra",
            images:["https://api.ownchoose.com/storage/logos/UVjUj1HNq6CfrXQU57QINTJH8abBZ1dxpF7DqNQo.png"],
            card: "summary_large_image",
            creator: "Seba Diaz",
        }
    };
}

export default async function DynamicPages({ params }: { params: { slug: string, } }) {
    const {data, socialLinks} = await getData({ params });  // Pass `params` correctly
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    };

    return (
        <MasterLayout>
            <main className="main">
                <section className="box-section box-breadcrumb background-100">
                    <div className="container">
                        <ul className="breadcrumbs">
                            <li> <Link href="/">Home</Link><span className="arrow-right">
                                <svg width={7} height={12} viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 11L6 6L1 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg></span></li>
                            <li> <span className="text-breadcrumb">{data?.page_name}</span></li>
                        </ul>
                    </div>
                </section>
                <section className="section-box box-become-video background-body">
                    <div className="container">
                        <div className="box-mw-824">
                            <div className="text-center">
                                <div className="d-flex justify-content-center"><span className="btn btn-brand-secondary wow fadeInUp"> <img className="mr-10" src="/assets/imgs/page/homepage4/earth.svg" alt="Travile" />AGREEMENT</span></div>
                                <h2 className="mt-15 mb-15 neutral-1000 wow fadeInUp">{data?.page_title}</h2>
                                <p className="text-xl-medium neutral-1000 mb-55 wow fadeInUp">Last update: {formatDate(data?.updated_at)}</p>
                            </div>
                        </div>
                        {/* <div className="box-image-video mb-45"> <img className="bdrd-16" src="/assets/imgs/page/pages/banner-privacy.png" alt="Travilla" /></div> */}
                        <div className="box-mw-824">
                            <div className="box-detail-info">
                                {parse(data?.content)}
                            </div>
                            <div className="box-share-us">
                                <p className="mb-10 text-lg-bold neutral-1000">Follow us:</p>
                                <div className="d-flex align-items-center box-socials-footer-cover mb-25">
                                    <div className="box-socials-footer d-inline-block">
                                        {socialLinks &&
                                            socialLinks.map((socialLink: socialLink, index: number) => {
                                                if (socialLink?.social_icon === "Instagram") {
                                                    return (
                                                        <a className="icon-socials icon-instagram" href={socialLink?.link} key={index}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={25} height={25} viewBox="0 0 24 24">
                                                                <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                                                            </svg>
                                                        </a>
                                                    );
                                                } else if (socialLink?.social_icon === "Facebook") {
                                                    return (
                                                        <a className="icon-socials icon-facebook" href={socialLink?.link} key={index}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="icon-socials icon-be" width={25} height={25} viewBox="0 0 24 24">
                                                                <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
                                                            </svg>

                                                        </a>
                                                    );
                                                } else if (socialLink?.social_icon === "X") {
                                                    return (
                                                        <a className="icon-socials icon-be" href={socialLink?.link} key={index}>
                                                            <svg className="icon-socials icon-be" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={20} height={20} viewBox="0 0 24 24">
                                                                <path d="M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 15.880859 19 L 6.2070312 5 z" />
                                                            </svg>
                                                        </a>
                                                    );
                                                } else if (socialLink?.social_icon === "YouTube") {
                                                    return (
                                                        <a key={index} className="icon-socials icon-twitter" href={socialLink?.link}>
                                                            <svg className="icon-socials icon-be" width={20} height={20} viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M8.82393 10.736L13.9225 7.78881L8.82393 4.84165V10.736ZM20.1803 3.04389C20.308 3.50561 20.3964 4.12451 20.4554 4.91042C20.5242 5.69633 20.5536 6.37418 20.5536 6.96361L20.6126 7.78881C20.6126 9.94024 20.4554 11.5219 20.1803 12.5337C19.9347 13.4179 19.3649 13.9877 18.4808 14.2333C18.0191 14.361 17.1742 14.4494 15.8775 14.5083C14.6004 14.5771 13.4313 14.6066 12.3507 14.6066L10.7887 14.6655C6.67251 14.6655 4.10848 14.5083 3.09662 14.2333C2.21247 13.9877 1.64269 13.4179 1.39709 12.5337C1.26938 12.072 1.18097 11.4531 1.12203 10.6672C1.05326 9.8813 1.02379 9.20345 1.02379 8.61402L0.964844 7.78881C0.964844 5.63739 1.12203 4.05575 1.39709 3.04389C1.64269 2.15974 2.21247 1.58996 3.09662 1.34436C3.55834 1.21665 4.4032 1.12823 5.69995 1.06929C6.97705 1.00052 8.14609 0.971052 9.22671 0.971052L10.7887 0.912109C14.9049 0.912109 17.4689 1.06929 18.4808 1.34436C19.3649 1.58996 19.9347 2.15974 20.1803 3.04389Z" fill="#fff" />
                                                            </svg>
                                                        </a>
                                                    )
                                                } else if (socialLink?.social_icon === "Linkedin") {
                                                    return (
                                                        <a key={index} className="icon-socials icon-twitter" href={socialLink?.link}>
                                                            <svg className="icon-socials icon-be" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={20} height={20} viewBox="0 0 24 24">
                                                                <path d="M 5 3 C 3.895 3 3 3.895 3 5 L 3 19 C 3 20.105 3.895 21 5 21 L 19 21 C 20.105 21 21 20.105 21 19 L 21 5 C 21 3.895 20.105 3 19 3 L 5 3 z M 5 5 L 19 5 L 19 19 L 5 19 L 5 5 z M 7.7792969 6.3164062 C 6.9222969 6.3164062 6.4082031 6.8315781 6.4082031 7.5175781 C 6.4082031 8.2035781 6.9223594 8.7167969 7.6933594 8.7167969 C 8.5503594 8.7167969 9.0644531 8.2035781 9.0644531 7.5175781 C 9.0644531 6.8315781 8.5502969 6.3164062 7.7792969 6.3164062 z M 6.4765625 10 L 6.4765625 17 L 9 17 L 9 10 L 6.4765625 10 z M 11.082031 10 L 11.082031 17 L 13.605469 17 L 13.605469 13.173828 C 13.605469 12.034828 14.418109 11.871094 14.662109 11.871094 C 14.906109 11.871094 15.558594 12.115828 15.558594 13.173828 L 15.558594 17 L 18 17 L 18 13.173828 C 18 10.976828 17.023734 10 15.802734 10 C 14.581734 10 13.930469 10.406562 13.605469 10.976562 L 13.605469 10 L 11.082031 10 z"></path>
                                                            </svg>
                                                        </a>
                                                    )
                                                }
                                            })}
                                    </div>
                                </div>
                                <p className="text-lg-medium neutral-500">Best regards, </p>
                                <p className="text-lg-bold neutral-1000">Tours Andorra</p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </MasterLayout>
    )
}