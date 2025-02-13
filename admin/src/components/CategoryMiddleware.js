import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const CategoryMiddleware = () => {
    const allowedEmail = process.env.REACT_APP_ALLOWED_EMAIL;
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

    const [authorized, setAuthorized] = useState(user?.email === allowedEmail);

    useEffect(() => {
        const checkAuthorization = () => {
            const userData = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
            if (userData?.email !== allowedEmail) {
                setAuthorized(false);
            }
        };

        const authObserver = setInterval(checkAuthorization, 3000);

        return () => clearInterval(authObserver);
    }, []);

    return authorized ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default CategoryMiddleware;
