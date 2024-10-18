const useReview = (review: string | number, widget?:number|string,height?:number|string) => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(Number(review));
    const hasHalfStar = Number(review) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <svg
                key={i}
                width={widget ?? 23}
                height={height ?? 23}
                viewBox="0 0 24 24"
                fill="#FFD700"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 2l2.9 6.1L22 9.2l-5 5 1.2 7-6.2-3.4L6 21.2 7.2 14 2 9.2l7.1-1L12 2z" />
            </svg>
        );
    }

    if (hasHalfStar) {
        stars.push(
            <svg
                key={fullStars}
                width={widget ?? 23}
                height={height ?? 23}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id={`halfStar-${fullStars}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="50%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#C0C0C0', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <path
                    d="M12 2l2.9 6.1L22 9.2l-5 5 1.2 7-6.2-3.4L6 21.2 7.2 14 2 9.2l7.1-1L12 2z"
                    fill={`url(#halfStar-${fullStars})`}
                />
            </svg>
        );
    }

    // Add empty stars if needed to complete to 5 stars
    const totalStars = 5;
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < totalStars; i++) {
        stars.push(
            <svg
                key={i}
                width={widget ?? 23}
                height={height ?? 23}
                viewBox="0 0 24 24"
                fill="#C0C0C0"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 2l2.9 6.1L22 9.2l-5 5 1.2 7-6.2-3.4L6 21.2 7.2 14 2 9.2l7.1-1L12 2z" />
            </svg>
        );
    }

    return stars;
};

export default useReview;