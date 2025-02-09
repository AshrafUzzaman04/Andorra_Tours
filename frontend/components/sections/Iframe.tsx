import CookiePopup from "./CookiePopup";

async function getCsrfToken(){
    const response = await fetch('https://motor.toursandorra.com/iframe/csrf-token', {
        method: 'GET',
        credentials: 'include', // Ensure cookies are sent
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json();
    return data.csrf_token;
}
export default async function Iframe() {
    const csrfToken = await getCsrfToken();
    return (
        <>
        <section className="section-box box-our-featured background-body pt-60">
            <div className="container">
                <div className="row align-items-end">
                    <div className="text-center col-lg-12 mb-30 text-lg-start wow fadeInUp">
                        <h2 className="text-center neutral-1000">Book Your Ski Gear Online and Save</h2>
                        <p className="text-center text-xl-medium neutral-500">Get an exclusive 15% discount when you book through our website. Gear up for the slopes at the best price!</p>
                    </div>
                </div>
            </div>
            <CookiePopup/>
            <div className="container-banner">
                <iframe
                    title="Embedded Content"
                    src={`https://motor.toursandorra.com/?_token=${csrfToken}`}
                    width="100%"
                    height="100vh"
                    style={{ border: "none", width: '100%', height: '100vh' }}
                    frameBorder="0"
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
            </div>
        </section>
        </>
    );
}