import Link from 'next/link';
import React from 'react';

export default function PageIdentify({ title_for, page_slug, page_name, page_title }: { title_for: string, page_slug: string, page_name: string, page_title:string }) {
    switch (title_for) {
        case "email":
            return <a className="text-md neutral-400" href={`mailto:${page_title}`}>{page_title}</a>; // Email link
        case "phone":
            return <a className="text-md neutral-400" href={`tel:${page_title}`}>{page_title}</a>; // Phone link
        case "whats-app":
            const message = "Hello From Tours Andorra"; // Your pre-filled message
            return (
                <a className="text-md neutral-400"
                    href={`https://wa.me/${page_title}?text=${encodeURIComponent(message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {page_title}
                </a>
            ); // WhatsApp link with a message

        case "link":
            return <Link className="text-md neutral-400" href={page_slug}>{page_title}</Link>;
        case "new-page":
            return (
            (page_title === "Blog" || page_title === "Blogs") ?
            <Link className="text-md neutral-400" href={"/"+page_slug}>{page_title}</Link>:
            <Link className="text-md neutral-400" href={"/page/" + page_slug}>{page_title}</Link>
        );
        case "text":
            return <div className="text-md neutral-400">{page_title}</div>;
        default:
            return <div className="text-md neutral-400">{page_title}</div>; // Fallback for other cases
    }
}