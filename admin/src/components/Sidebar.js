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
                <a className="navbar-brand text-center m-0" href="/">
                    <img src="/assets/img/tours_andorra.png" className="navbar-brand-img" alt="main_logo" />
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
                        {lastMessage && (
                            <NavLink to={lastMessage.sender_id == authId ? '/chat/message/'+lastMessage.receiver_id : '/chat/message/'+lastMessage.sender_id} onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                <i className="fa-solid fa-envelope icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                                <span className="nav-link-text ms-1">{t('Message')}</span>
                            </NavLink>
                        )}
                        {!lastMessage && (
                            <NavLink to='/chat' onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                <i className="fa-solid fa-envelope icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                                <span className="nav-link-text ms-1">{t('Message')}</span>
                            </NavLink>
                        )}
                    </li>
                    <li className="nav-item">
                        <NavLink to="/customer-management/customers" onClick={(e) => setNowDrop('')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                            <i className="fa-solid fa-user-group icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"></i>
                            <span className="nav-link-text ms-1">{t('Customers')}</span>
                        </NavLink>
                    </li>

                    
                    <li className="nav-item">
                        <a data-bs-toggle="collapse" href="#categories" className={nowDrop === 'categories' ? activeClassName : navClassName} aria-controls="categories" role="button" aria-expanded={nowDrop === 'categories'}>
                            <i className="fa-solid fa-folder-tree icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"></i>
                            <span className="nav-link-text ms-1">{t('Categories')}</span>
                        </a>
                        <div className={nowDrop === 'categories' ? dropdownClassShow : dropdownClass} id="categories">
                            <ul className="nav ms-4 ps-3">
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/categories/category" onClick={(e) => setNowDrop('categories')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Category')}</span>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to="/categories/sub-category" onClick={(e) => setNowDrop('categories')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Sub Category')}</span>
                                            </NavLink>
                                        </li>  
                                    </>
                            </ul>
                        </div>
                    </li>


                    <li className="nav-item">
                        <a data-bs-toggle="collapse" href="#theme-customization" className={nowDrop === 'theme-customization' ? activeClassName : navClassName} aria-controls="theme-customization" role="button" aria-expanded={nowDrop === 'theme-customization'}>
                            <i className="fa-solid fa-wand-magic-sparkles icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"></i>
                            <span className="nav-link-text ms-1">{t('Customization')}</span>
                        </a>
                        <div className={nowDrop === 'theme-customization' ? dropdownClassShow : dropdownClass} id="theme-customization">
                            <ul className="nav ms-4 ps-3">
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/theme-customization/header" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Header')}</span>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to="/theme-customization/hero" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Hero Section')}</span>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to="/theme-customization/verano" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Verano')}</span>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to="/theme-customization/inverano" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Inverano')}</span>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to="/theme-customization/banner-slider" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Banner Slider')}</span>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to="/theme-customization/servcios-exclusivos" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Servcios Exclusivos')}</span>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to="/theme-customization/category-slider" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Category Slider')}</span>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to="/theme-customization/easy-payments" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Easy Payments')}</span>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to="/theme-customization/why-travels" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Why Travel')}</span>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to="/theme-customization/testimonials" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Testimonials')}</span>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to="/theme-customization/tips-guides" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Tips Guides')}</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/theme-customization/footer" onClick={(e) => setNowDrop('theme-customization')} className={({ isActive }) => isActive ? activeClassName : navClassName}>
                                                <span className="sidenav-normal">{t('Footer')}</span>
                                            </NavLink>
                                        </li>
                                    </>
                            </ul>
                        </div>
                    </li>

                    

                   

                   
                    <li className="nav-item">
                        <a data-bs-toggle="collapse" href="#user-settings" className={nowDrop === 'user-settings' ? activeClassName : navClassName} aria-controls="user-settings" role="button" aria-expanded={nowDrop === 'user-settings'}>
                            <i className="fa-solid fa-gear icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2"></i>
                            <span className="nav-link-text ms-1">{t('Settings')}</span>
                        </a>
                        <div className={nowDrop === 'user-settings' ? dropdownClassShow : dropdownClass} id="user-settings">
                            <ul className="nav ms-4 ps-3">
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
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
