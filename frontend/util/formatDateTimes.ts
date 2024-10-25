export function formatDateTimes(createdAt: string): string {
    const date = new Date(createdAt);
    
    // Formatting the date as "18 Sep 2024"
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options).replace(',', '');

    // Calculating the difference in minutes
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    // Formatting the duration as "6 mins ago" or similar
    let durationText;
    if (diffInMinutes < 1) {
        durationText = "Just now";
    } else if (diffInMinutes === 1) {
        durationText = "1 min";
    } else if (diffInMinutes < 60) {
        durationText = `${diffInMinutes} mins`;
    } else if (diffInMinutes < 1440) { // Less than a day
        const hours = Math.floor(diffInMinutes / 60);
        durationText = `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
    } else {
        const days = Math.floor(diffInMinutes / 1440);
        durationText = `${days} ${days > 1 ? 'days' : 'day'} ago`;
    }

    return `${durationText}`;
}