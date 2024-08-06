import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import callFetch from "helpers/callFetch";

function Sidebar() {
    const { t } = useTranslation();
    const [lastMessage, setLastMessage] = useState([]);
    const [authId, setAuthId] = useState('');
    const [nowDrop, setNowDrop] = useState(window.location.href.split('/')[3]);
    let navClassName = "nav-link";
    let activeClassName = "nav-link active";
    let dropdownClass = "collapse";
    let dropdownClassShow = "collapse show";

    useEffect(() => {
        callFetch("chatuser-sidebar", "GET", []).then((res) => {
            //   console.log(res.lastMessage); 
            //   console.log(res.authId); 
            setLastMessage(res.lastMessage);
            setAuthId(res.authId);
          });
    }, [])

return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
                <a className="navbar-brand m-0" href="/">
                    <img src="/assets/img/logo.png" className="navbar-brand-img h-100" alt="main_logo" />
                </a>
            </div>
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/dashboard" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa-solid fa-dashboard icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">{t('Dashboard')}</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/customer-management/customers" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa-solid fa-user-group icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">{t('Customers')}</span>
                        </NavLink>
                    </li>
                    
                    

                    

                   

                    {/* {Cookies.get('permissions').indexOf("role-read") !== -1 ? (
                    <li className="nav-item">
                        <a data-bs-toggle="collapse" href="#user-settings" className={nowDrop === 'user-settings' ? activeClassName : navClassName} aria-controls="user-settings" role="button" aria-expanded={nowDrop === 'user-settings'}>
                            <i className="fa-solid fa-gear icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"></i>
                            <span className="nav-link-text ms-1">{t('Settings')}</span>
                        </a>
                        <div className={nowDrop === 'user-settings' ? dropdownClassShow : dropdownClass} id="user-settings">
                            <ul className="nav ms-4 ps-3">
                                {Cookies.get('permissions').indexOf("role-read") !== -1 ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/user-settings/roles" onClick={(e) => setNowDrop('user-settings')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Settings')}</span>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to="/user-settings/smtp/1/edit" onClick={(e) => setNowDrop('user-settings')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Email Setup')}</span>
                                            </NavLink>
                                        </li>  
                                    </>
                                ) : <></>}
                            </ul>
                        </div>
                    </li>
                    ) : <></>} */}
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
