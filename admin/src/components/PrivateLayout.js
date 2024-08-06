import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { Outlet } from "react-router-dom";

function PrivateLayout() {
    return (
        <>
            <Sidebar />
            <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
                <TopNav />
                <div className="container-fluid py-4 min-height-500">
                    <Outlet />
                </div>
            </main>
        </>
    );
}

export default PrivateLayout;
