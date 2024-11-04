"use client";
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Maximize2, Minimize2, RefreshCw } from 'lucide-react';

export interface WebcamType {
    name: string;
    webcam: string;
}

export default function WebcamViewer({ webcam }: { webcam: WebcamType }): JSX.Element {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [webcam]);

    const toggleFullscreen = () => {
        if (containerRef.current) {
            if (!document.fullscreenElement) {
                containerRef.current.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    const refreshFeed = () => {
        if (iframeRef.current) {
            iframeRef.current.src = iframeRef.current.src;
        }
    };

    const handleIframeLoad = () => {
        setIsIframeLoaded(true);
    };



    return (
        <div className="container" ref={containerRef}>
            {/* Header only visible in fullscreen */}
            {/* {isFullscreen && (
                <header className="fullscreen-header">
                    <img src="/path/to/logo.png" alt="Logo" className="logo" />
                    <span className="header-text">toursandorra</span>
                </header>
            )} */}
            {
                isFullscreen && (
                    <div className={isFullscreen ? "fullscreen-iframe" : "iframe-wrapper"}>
                        <iframe
                            ref={iframeRef}
                            src={webcam?.webcam}
                            allowFullScreen
                            sandbox="allow-same-origin allow-scripts"
                            scrolling="no"
                            title="Live Webcam Feed"
                            style={{ overflow: 'hidden', width: '100%', height: '100%' }}
                        ></iframe>
                    </div>
                )
            }
            {
                !isFullscreen && (<div className="card pricing-card">
                    <div className="card-body">
                        <div className={isFullscreen ? "fullscreen-iframe" : "iframe-wrapper card-screen"}>
                            {!isIframeLoaded && (
                                <div className="screen">
                                    <img className="light-mode" alt="light-logo" src="https://api.ownchoose.com/storage/logos/guVObZLST3JnsS4XEpT7C12c7CrF5PSdLP4O1Lo8.png"/>
                                    <img className="dark-mode" alt="dark-logo" src="https://api.ownchoose.com/storage/logos/UVjUj1HNq6CfrXQU57QINTJH8abBZ1dxpF7DqNQo.png"/>
                                </div>
                            )}
                            <Suspense fallback={<p>TOURS ANDORRA</p>}>
                                <iframe
                                    ref={iframeRef}
                                    src={webcam?.webcam}
                                    allowFullScreen
                                    sandbox="allow-same-origin allow-scripts"
                                    scrolling="no"
                                    title="Live Webcam Feed"
                                    className="rounded no-scrollbar"
                                    style={{
                                        display: isIframeLoaded ? 'block' : 'none', // Hide until loaded
                                        overflow: 'hidden',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    onLoad={handleIframeLoad} // Call this when iframe is fully loaded
                                ></iframe>
                            </Suspense>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <div className="w-full">
                                <h6 className="mb-0 fw-bold">{webcam?.name}</h6>
                            </div>
                            <div className="d-flex">
                                <button className="btn btn-outline-primary me-2" onClick={refreshFeed} aria-label="Refresh feed">
                                    <RefreshCw size={16} />
                                </button>
                                <button className="btn btn-outline-secondary" onClick={toggleFullscreen} aria-label="Toggle fullscreen">
                                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)

            }

            <style jsx>{`
        .container {
          position: relative;
        }
        .iframe-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .fullscreen-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: #000;
          color: #fff;
          display: flex;
          align-items: center;
          padding: 1rem;
          z-index: 10;
        }
        .logo {
          height: 2rem;
          margin-right: 1rem;
        }
        .header-text {
          font-size: 1.25rem;
          font-weight: bold;
        }
        .btn {
          padding: 0.375rem 0.75rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .btn svg {
          width: 1rem;
          height: 1rem;
        }
        .iframe-wrapper {
          max-width: 48rem;
          margin: auto;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .fullscreen-iframe {
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1;
          background-color: #000;
        }
        .controls {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
      `}</style>
        </div>
    );
}
