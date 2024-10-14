import { notFound, redirect } from 'next/navigation'

export default function TagPage({ params }: { params: { tag_slug: string } }) {
  redirect('/hotels')
}
export async function generateStaticParams() {
  const tags = ['tag1', 'tag2', 'tag3']
  return tags.map((tag) => ({
    tag_slug: tag,
  }))
}