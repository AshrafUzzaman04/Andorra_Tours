import Link from 'next/link';
import React from 'react';

export default function PageIdentify({ title_for, page_slug, page_name, page_title }: { title_for: string, page_slug: string, page_name: string, page_title:string }) {
    switch (title_for) {
        case "Email":
            return <a className="text-md neutral-400" href={`mailto:${page_title}`}>{page_title}</a>; // Email link
        case "Phone":
            return <a className="text-md neutral-400" href={`tel:${page_title}`}>{page_title}</a>; // Phone link
        case "Whats App":
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
        
        case "Link":
            return <Link className="text-md neutral-400" href={"/page/" + page_slug}>{page_title}</Link>;
        case "New Page":
            return (
            page_title === "Blog" ?
            <Link className="text-md neutral-400" href={page_slug}>{page_title}</Link>:
            <Link className="text-md neutral-400" href={"/page/" + page_slug}>{page_title}</Link>
        );
        case "Text":
            return <div className="text-md neutral-400">{page_title}</div>;
        default:
            return <div className="text-md neutral-400">{page_title}</div>; // Fallback for other cases
    }
}