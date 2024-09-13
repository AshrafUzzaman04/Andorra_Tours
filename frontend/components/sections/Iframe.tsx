import Iframe from 'react-iframe'

export default function Iframes() {
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
                <Iframe loading="eager" width="100%" height="700" allowFullScreen url="https://motor.skirenting.com/"/>
            </div>
        </section>

    );
}