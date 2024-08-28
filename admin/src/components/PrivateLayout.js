import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import callFetch from "helpers/callFetch";

function PrivateLayout() {
    const [languageDone, setLnaguageDone] = useState(false);
    const { i18n } = useTranslation();
    useEffect(() => {
      callFetch(`getAllLanguages/${i18n.language}/translations.json`, "GET", []).then((res) => {
        if(res?.ok){
            i18n.addResourceBundle(i18n.language, 'translation', res?.files, true, true);
            setLnaguageDone(true)
        }
      });
    }, [0])
    return  (languageDone &&
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
