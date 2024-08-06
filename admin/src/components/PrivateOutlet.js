import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";
import PrivateLayout from "./PrivateLayout";

function PrivateOutlet() {
    let tempAuth = Cookies.get('token') ? true : false;
    const [auth, setAuth] = useState(tempAuth);

    useEffect((auth) => {
        const checkAuth = () => {
            let tempAuth = Cookies.get('token') ? true : false;
            if (tempAuth !== auth)
                setAuth(tempAuth);
        }

        const authObserver = setInterval(checkAuth, 3000);

        return () => {
            clearInterval(authObserver);
        };
    }, []);

    return auth ? <PrivateLayout /> : <Navigate to='/' />;
}

export default PrivateOutlet;
