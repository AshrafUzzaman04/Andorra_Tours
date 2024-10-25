import MasterLayout from "@/components/layout/MasterLayout";
import BlogsChild from "@/components/sections/Blogs/BlogsChild";
import Fetch from "@/helper/Fetch";
async function getBlog() {
    const res = await Fetch(`/blogs`);
    return res?.data?.data;
}
export default async function Blogs() {
    const blogs = await getBlog();
  return (
    <MasterLayout>
        <BlogsChild blogs={blogs}/>
    </MasterLayout>
  )
}
