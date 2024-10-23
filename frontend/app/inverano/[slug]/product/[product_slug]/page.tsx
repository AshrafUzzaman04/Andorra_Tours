import MasterLayout from "@/components/layout/MasterLayout";
import ProductDetail from "@/components/sections/Products/ProductDetails";
import Fetch from "@/helper/Fetch";
import { Metadata } from "next";
const getPorducts = async (slug:string) => {
  const res = await Fetch("/product/"+slug);
  return res.data?.data;
}
const stripHtml = (html: string) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};
export async function generateMetadata({params}:{params:{product_slug:string}}): Promise<Metadata> {
  const response = await Fetch("/product/"+params?.product_slug);
  const product = response?.data?.data || [];
  const title = product?.title ?? ""
  const description = stripHtml(product?.description) ?? ""
  const photos = JSON.parse(product?.photos) || [];
  const image = process.env.NEXT_PUBLIC_STORAGE_URL + photos[0]
  return {
      title: title,
      description: description,
      keywords:"tours andorra, andorra tours, travel andorra, travel, explore andorra,",
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
export default async function SingleProduct({params}:{params:{product_slug:string}}) {
  const product = await getPorducts(params?.product_slug);
  return (
    <MasterLayout>
      <ProductDetail product={product}/>
    </MasterLayout>
  )
}
