import MasterLayout from "@/components/layout/MasterLayout";
import ProductDetail from "@/components/sections/Products/ProductDetails";
import Fetch from "@/helper/Fetch";
const getPorducts = async (slug:string) => {
  const res = await Fetch("/product/"+slug);
  return res.data?.data;
}
export default async function SingleProduct({params}:{params:{product_slug:string}}) {
  const product = await getPorducts(params?.product_slug);
  return (
    <MasterLayout>
      <ProductDetail product={product}/>
    </MasterLayout>
  )
}
