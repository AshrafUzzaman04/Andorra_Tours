import Link from 'next/link';
import React from 'react';

export default function PageIdentify({ title_for, page_slug, page_name, page_title }: { title_for: string, page_slug: string, page_name: string, page_title:string }) {
    switch (title_for) {
        case "Email":
            return <a className="text-md neutral-400" href={`mailto:${page_name}`}>{page_name}</a>; // Email link
        case "Phone":
            return <a className="text-md neutral-400" href={`tel:${page_slug}`}>{page_name}</a>; // Phone link
        case "Whats App":
            const message = "Hello From Tours Andorra"; // Your pre-filled message
            return (
                <a className="text-md neutral-400"
                    href={`https://wa.me/${page_title}?text=${encodeURIComponent(message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {page_name}
                </a>
            ); // WhatsApp link with a message
        
        case "Link":
            return <Link className="text-md neutral-400" href={"/page/" + page_slug}>{page_name}</Link>; // Regular page link
        case "New Page":
            return <Link className="text-md neutral-400" href={"/page/" + page_slug}>{page_name}</Link>; // Regular page link
        default:
            return <div className="text-md neutral-400">{page_name}</div>; // Fallback for other cases
    }
}