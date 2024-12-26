
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
                    <div className="col-lg-12 mb-30 text-center text-lg-start wow fadeInUp">
                        <h2 className="neutral-1000 text-center">SKI RENTING</h2>
                        <p className="text-xl-medium neutral-500 text-center">Travel with SKI RENTING</p>
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