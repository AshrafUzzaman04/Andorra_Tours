import Fetch from '@/helper/Fetch'
import { notFound, redirect } from 'next/navigation'
const getData = async (slug:string) =>{
  const response = await Fetch("/cardCategory/"+slug);
  return response?.data?.data
}
export default async function TagPage({ params }: { params: { tag_slug: string } }) {
  const data = await getData(params?.tag_slug);
  const redirectUrl = "/"+data?.tag_slug+"/"+params?.tag_slug
  redirect(redirectUrl)
}