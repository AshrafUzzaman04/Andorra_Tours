import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie'; 
import SoftTypography from "components/SoftTypography";
import callFetch from "../../../../helpers/callFetch"; 
function Language() {
    const { t } = useTranslation();  
    const [user, setUser] = useState(JSON.parse(Cookies.get('user')));
    const [customClass, setCustomClass] = useState(''); 

    const lang = Cookies.get('lang') ? JSON.parse(Cookies.get('lang')) : { flag: 'de', lang: 'de', name: 'Deutsch' };
    const [activeLanguage, setActiveLanguage] = useState(lang);
    const { i18n } = useTranslation();

    function handleLanguageChange(e, l) {
        e.preventDefault();

       
        callFetch("lang/change/"+l.lang, "GET", []).then((res) => {
            console.log(res.message); 
        }); 

        setActiveLanguage(l);
        i18n.changeLanguage(l.lang);
        Cookies.set('lang', JSON.stringify(l));
    } 

    return (
         <div className="card">
            <div className="card-body">
                <SoftTypography variant="h5">{t('Language')}</SoftTypography>
                <div className="dropdown">
                            <a href="flags" className="m-0 nav-link text-body font-weight-bold px-0 dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className={"flag-icon flag-icon-" + activeLanguage.flag} style={{top: '4px'}}></span>{activeLanguage.name}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#0" onClick={(e) => handleLanguageChange(e, { flag: 'us', lang: 'en', name: 'English' })}><span className="flag-icon flag-icon-us"></span>English</a></li>
                                <li><a className="dropdown-item" href="#0" onClick={(e) => handleLanguageChange(e, { flag: 'de', lang: 'de', name: 'Deutsch' })}><span className="flag-icon flag-icon-de"></span>Deutsch</a></li>
                            </ul>
                        </div>
            </div>
         </div>
    );
}

export default Language;
