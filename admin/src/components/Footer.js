function Footer() {
    return (
        <footer className="footer p-3">
            <div className="container-fluid">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-7 mb-lg-0 mb-4">
                        <div className="copyright text-center text-sm text-muted text-lg-start">
                            Copyright © {new Date().getFullYear()} INGTEC. All rights reserved
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                            <li className="nav-item">
                                <a href="#0" className="nav-link text-muted">Blog</a>
                            </li>
                            <li className="nav-item">
                                <a href="#0" className="nav-link pe-0 text-muted">License</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
