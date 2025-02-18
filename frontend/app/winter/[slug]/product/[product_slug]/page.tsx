import MasterLayout from "@/components/layout/MasterLayout";
import ProductDetail from "@/components/sections/Products/ProductDetails";
import Fetch from "@/helper/Fetch";
import { Metadata } from "next";
const getPorducts = async (slug: string) => {
  const res = await Fetch("/product/" + slug);
  const product = res?.data?.data || [];
  const PopularProducts = res?.data?.popular || [];
  return { product, PopularProducts };
};
const stripHtml = (html: string) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};
export async function generateMetadata({
  params,
}: {
  params: { product_slug: string };
}): Promise<Metadata> {
  const response = await Fetch("/product/" + params?.product_slug);
  const product = response?.data?.data || [];
  const title = product?.meta_title ?? "Tours Andorra";
  const description =
    product?.meta_description ??
    "Portal de Actividades / Experiencias #1 en Andorra";
  const photos = JSON.parse(product?.photos) || [];
  const image = process.env.NEXT_PUBLIC_STORAGE_URL + photos[0];
  return {
    title: title,
    description: description,
    keywords:
      product?.meta_tags ??
      "tours andorra, andorra tours, travel andorra, travel, explore andorra,",
    openGraph: {
      title: title,
      description: description,
      images: [image],
      url: "https://andorra-tours.vercel.app/",
    },
    twitter: {
      title: title,
      description: description,
      images: [image],
      card: "summary",
    },
  };
}
export default async function SingleProduct({
  params,
}: {
  params: { product_slug: string };
}) {
  const { product, PopularProducts } = await getPorducts(params?.product_slug);
  return (
    <MasterLayout>
      <ProductDetail product={product} PopularProducts={PopularProducts} />
    </MasterLayout>
  );
}
