type DateOptions = {
    day: 'numeric' | '2-digit';
    month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
    year: 'numeric' | '2-digit';
};

export default function formatDate(dateString: string): string {
    const date = new Date(dateString); // Convert the string to a Date object
    const options: DateOptions = { day: 'numeric', month: 'short', year: 'numeric' };

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date string");
    }

    return date.toLocaleDateString('en-GB', options).replace(',', ''); // Remove comma if needed
}