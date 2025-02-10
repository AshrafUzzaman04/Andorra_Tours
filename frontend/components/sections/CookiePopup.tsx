'use client';

import { useState, useEffect } from 'react';
interface BrowserInfo {
    browser: string;
    device: string;
}

export default function CookiePopup() {
    const [showPopup, setShowPopup] = useState(false);
    const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);


    useEffect(() => {
        // Check if third-party cookies are allowed when the component is mounted
        const isPopupShown = localStorage.getItem('cookiePopupShown');

        if (!isPopupShown) {
            setShowPopup(true); // Show popup if not shown before
            setBrowserInfo(getBrowserInfo()); // Set browser information
        }
    }, []);

    // Function to detect browser and device type
    const getBrowserInfo = () => {
        const userAgent = navigator.userAgent;
        let browser = "Unknown";
        let device = "Desktop";

        // Detect browser
        if (userAgent.includes("Chrome")) {
            browser = "Chrome";
        } else if (userAgent.includes("Firefox")) {
            browser = "Firefox";
        } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
            browser = "Safari";
        } else if (userAgent.includes("Edge")) {
            browser = "Edge";
        } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
            browser = "Internet Explorer";
        }

        // Detect device (mobile or desktop)
        if (/Mobi|Android/i.test(userAgent)) {
            device = "Mobile";
        }

        return { browser, device };
    };

    const closePopup = () => {
        setShowPopup(false);
        localStorage.setItem('cookiePopupShown', 'true');
    };

    return (
        <>
            {
                showPopup && (
                    <div id="cookie-popup" style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: '#333', color: '#fff', padding: '15px', textAlign: 'center', fontSize: '16px', zIndex: 9999 }}>
                        <p>To continue using our website, we need you to enable third-party cookies in your browser settings.</p>
                        <p>Click below to check how to change your browser cookies settings:</p>
                        <ul style={{ listStyleType: 'none', padding: 0, color: '#F76464' }}>
                            {/* Conditionally render links based on browser */}
                            {browserInfo?.browser === "Chrome" && (
                                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" style={{ color: '#F76464', textDecoration: "underline" }}>Google Chrome</a></li>
                            )}
                            {browserInfo?.browser === "Firefox" && (
                                <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" style={{ color: '#F76464', textDecoration: "underline" }}>Mozilla Firefox</a></li>
                            )}
                            {browserInfo?.browser === "Safari" && (
                                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" style={{ color: '#F76464', textDecoration: "underline" }}>Safari</a></li>
                            )}
                            {browserInfo?.browser === "Edge" && (
                                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-and-site-data-in-microsoft-edge" target="_blank" style={{ color: '#F76464', textDecoration: "underline" }}>Microsoft Edge</a></li>
                            )}
                            {browserInfo?.browser === "Internet Explorer" && (
                                <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" style={{ color: '#F76464', textDecoration: "underline" }}>Internet Explorer</a></li>
                            )}

                            {/* Mobile-specific settings links */}
                            {browserInfo?.device === "Mobile" && (
                                <>
                                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" style={{ color: '#F76464', textDecoration: "underline" }}>Google Chrome (Mobile)</a></li>
                                    <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" style={{ color: '#F76464', textDecoration: "underline" }}>Mozilla Firefox (Mobile)</a></li>
                                    <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" style={{ color: '#F76464', textDecoration: "underline" }}>Safari (Mobile)</a></li>
                                </>
                            )}
                        </ul>
                        <button onClick={closePopup} style={{ backgroundColor: '#ff5722', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer', marginTop: "8px" }}>Got it!</button>
                    </div>
                )
            }
        </>
    );
};
