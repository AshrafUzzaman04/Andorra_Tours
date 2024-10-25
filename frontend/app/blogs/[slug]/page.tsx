import MasterLayout from "@/components/layout/MasterLayout";
import BlogDetailsChild from "@/components/sections/Blogs/BlogDetailsChild";
import Fetch from "@/helper/Fetch"
import { Metadata } from "next";

export interface Params{
    params:{
        slug:string
    }
}

async function getBlog({params}:Params) {
    const res = await Fetch(`/blogs/${params.slug}`);
    const blog = res?.data?.data;
    const tending = res?.data?.trending;
    return {blog,tending};
}

const stripHtml = (html: string) => {
    return html?.replace(/<\/?[^>]+(>|$)/g, "");
};
export async function generateMetadata({params}:{params:{slug:string}}): Promise<Metadata> {
    const response = await Fetch(`/blogs/${params.slug}`);
    const blog = response?.data?.data || [];
    const title = blog?.title ?? ""
    const description = stripHtml(blog?.description) ?? "Portal de Actividades / Experiencias #1 en Andorra"
    const image = process.env.NEXT_PUBLIC_STORAGE_URL + blog?.photo
    return {
        title: title,
        description: description,
        keywords:"tours andorra, andorra tours, travel andorra, travel, explore andorra,"+blog?.tag,
        openGraph:{
            title: title,
            description: description,
            images: [image],
            url:"https://andorra-tours.vercel.app/"
        },
        twitter:{
            title: title,
            description: description,
            images: [image],
            card:"summary"
        }
    }
}
export default async function BlogDetails({params}:Params) {
    const {blog,tending} = await getBlog({params});
  return (
    <MasterLayout>
        <BlogDetailsChild blog={blog} tending={tending}/>
    </MasterLayout>
  )
}
