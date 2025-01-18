
async function getCsrfToken(){
    const response = await fetch('https://motor.toursandorra.com/iframe/csrf-token')
    const data = await response.json();
    return data.csrf_token;
}
export default async function Iframe() {
    const csrfToken = await getCsrfToken();
    return (
        <section className="section-box box-our-featured background-body pt-60">
            <div className="container">
                <div className="row align-items-end">
                    <div className="text-center col-lg-12 mb-30 text-lg-start wow fadeInUp">
                        <h2 className="text-center neutral-1000">SKI RENTAL ONLINE</h2>
                        <p className="text-center text-xl-medium neutral-500">Travel with SKI RENTAL</p>
                    </div>
                </div>
            </div>
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
    );
}