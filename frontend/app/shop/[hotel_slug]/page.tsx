import { notFound, redirect } from "next/navigation";
export default async function hotelSlug({
  params,
}: {
  params: { hotel_slug: string };
}) {
  redirect("/404");
}
