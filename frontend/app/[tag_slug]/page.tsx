import { notFound, redirect } from "next/navigation";
export default async function TagPage({
  params,
}: {
  params: { tag_slug: string };
}) {
  redirect("/404");
}
