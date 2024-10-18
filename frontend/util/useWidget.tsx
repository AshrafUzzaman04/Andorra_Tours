import { useEffect } from 'react';

// Extend the window object to include the Booking property
declare global {
  interface Window {
    Booking: {
      AffiliateWidget: new (config: { iframeSettings: object; widgetSettings: object }) => void;
    };
  }
}

interface UseWidgetProps {
  slug: string;
}

export default function useWidget({ slug }: UseWidgetProps): JSX.Element {
  useEffect(() => {
    // Only load the script and initialize the widget if the slug is "hotels"
    if (slug !== "hotels") {
      return; // Exit early if slug is not "hotels"
    }

    // Dynamically load the Booking.com script
    const script = document.createElement('script');
    script.src = 'https://www.booking.com/affiliate/prelanding_sdk';
    script.async = true;
    script.defer = true; // Ensure it runs after the DOM is ready
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Booking) {
        try {
          new window.Booking.AffiliateWidget({
            iframeSettings: {
              selector: 'bookingAffiliateWidget_e5fec07e-343d-49f7-8d26-79a1523ba03d',
              responsive: true,
            },
            widgetSettings: {
              theme: 'dark', // Example setting to change the theme
            },
          });
        } catch (error) {
          console.error('Error initializing Booking Affiliate Widget:', error);
        }
      }
    };

    script.onerror = () => {
      console.error('Failed to load Booking.com script.');
    };

    return () => {
      // Cleanup: remove the script when the component unmounts or slug changes
      document.body.removeChild(script);
    };
  }, [slug]);

  // Return the widget container only if the slug is "hotels"
  return slug === "hotels" ? (
    <div
      className="booking-widget-container z-2"
      id="bookingAffiliateWidget_e5fec07e-343d-49f7-8d26-79a1523ba03d"
      style={{
        overflow: 'visible',
        position: 'relative',
        height: '360px',
        borderRadius: '10px',
        backgroundColor: "#000000", // Ensure this is a valid color
      }}
    >
      <div>Loading...</div> {/* Optional: You can add loading or placeholder content */}
    </div>
  ) : <></>; // Return an empty fragment if the slug is not "hotels"
}
