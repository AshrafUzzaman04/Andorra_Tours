import { useEffect } from 'react';

// Extend the window object to include the Booking property
declare global {
  interface Window {
    Booking: {
      AffiliateWidget: new (config: { iframeSettings: object; widgetSettings: object }) => void;
    };
  }
}

export default function useWidget(): JSX.Element {
  useEffect(() => {
    // Dynamically load the booking.com script
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
              // Add any specific widget settings here as needed
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
      // Clean up the script when the component unmounts
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      className="booking-widget-container z-2"
      id="bookingAffiliateWidget_e5fec07e-343d-49f7-8d26-79a1523ba03d"
      style={{
        overflow: 'visible',
        position: 'relative',
        height: '360px',
        borderRadius: '10px',
        backgroundColor:"#00000"
      }}
    />
  );
}
