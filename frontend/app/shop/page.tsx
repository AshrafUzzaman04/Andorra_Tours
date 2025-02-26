import { notFound, redirect } from "next/navigation";
export default async function shopPage({
  params,
}: {
  params: { tag_slug: string };
}) {
  redirect("/404");
}
