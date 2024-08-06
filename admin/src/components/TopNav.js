import { React, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie';
import Message from '../pages/chat/Message';
import callFetch from "../helpers/callFetch";
import { t } from "i18next"; 
import LastMessage from "pages/chat/LastMessage";
import Moment from "react-moment";
import { Menu, MenuItem } from "@mui/material";
import { NavLink,useLocation } from "react-router-dom";
import Icon from "@mui/material/Icon";
import Breadcrumbs from "examples/Breadcrumbs";
import {
    useSoftUIController,
    setTransparentNavbar,
    setMiniSidenav,
    setOpenConfigurator,
  } from "context";
  import {
    navbar,
    navbarContainer,
    navbarRow,
    navbarIconButton,
    navbarDesktopMenu,
    navbarMobileMenu,
  } from "examples/Navbars/DashboardNavbar/styles";
function TopNav({ absolute, light, isMini }) {
    const lang = Cookies.get('lang') ? JSON.parse(Cookies.get('lang')) : { flag: 'de', lang: 'de', name: 'Deutch' };
    const [activeLanguage, setActiveLanguage] = useState(lang);
    const { i18n } = useTranslation();

    const [user, setUser] = useState(JSON.parse(Cookies.get('user')));
    const [customClass, setCustomClass] = useState('');
    const [participations, setParticipations] = useState([]);
    const [unreadMessage, setunreadMessage] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [unreadNotification, setUnreadNotification] = useState(0);
    
    useEffect(() => {
        callFetch("chat-participation", "GET", []).then((res) => {
            // console.log(res.data);
            setParticipations(res.contacts);
        });

        /*
        callFetch("topnav-notifications", "GET", []).then((res) => {
            // console.log(res.data);
            setNotifications(res.data);
            setUnreadNotification(res.unread_notifications);
        }); 
        */
    }, [unreadMessage]);

    useEffect(() => {
        callFetch("unread-messages", "GET", []).then((res) => {
            // console.log(res.unread_message);
            setunreadMessage(res.unread_message);
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => { 
            callFetch("unread-messages", "GET", []).then((res) => {
                // console.log(res.unread_message);
                setunreadMessage(res.unread_message);
            });
            
            /*
            callFetch("topnav-notifications", "GET", []).then((res) => {
                // console.log(res.data);
                setNotifications(res.data);
                setUnreadNotification(res.unread_notifications);
            });
            */
        }, 20000); 
        return () => clearInterval(interval);
      },[]);

    const handleResponsive = () => {
        setCustomClass('user-chat-show')
    }

    const seenMessage = () => {
        callFetch("seen-messages", "GET", []).then((res) => {
            // console.log(res.unread_message);
            setunreadMessage(res.unread_message);
        });

        callFetch("unread-messages", "GET", []).then((res) => {
            // console.log(res.unread_message);
            setunreadMessage(res.unread_message);
        });
    }

    const seenNotification = () => {
        callFetch("seen-notification", "GET", []).then((res) => { 
            setUnreadNotification(0);
        });
    }

    const [searchData,setSearchData] = useState([])
    const [searchKey,setSearchKey] = useState("0")
    const [menu, setMenu] = useState(false);
    const [navbarType, setNavbarType] = useState();
    const [controller, dispatch] = useSoftUIController();
    const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
    const [openMenu, setOpenMenu] = useState(false);
    const route = useLocation().pathname.split("/").slice(1);
    function handleLanguageChange(e, l) {
        e.preventDefault();

        setActiveLanguage(l);
        i18n.changeLanguage(l.lang);
        Cookies.set('lang', JSON.stringify(l));
        window.location.reload();
    }
    const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
    function doSignout(e) {
        e.preventDefault();

        callFetch('signout', 'POST', [], null).then(res => {
            Cookies.remove('user');
            Cookies.remove('token');
        });
    }


    const GlobalSearch = (e) =>{
        if(e.length > 0){
            setSearchData([])
            callFetch('globar/search/'+e,"GET",[]).then((res)=>{
                setSearchData(res.data)
                setMenu(true)
            })
        }else{
            setMenu(false)
            setSearchData([])
        }
    }
    useEffect(()=>{
        if(searchKey.length > 0){
            callFetch('globar/search/'+searchKey, "GET",[]).then((res)=>{
                if(res.status !== 401){
                    setSearchData(res.data.data)
                    setMenu(true)
                }else{
                    setSearchData([])
                    setMenu(false)
                }
                
            }) 
        }else{
            setSearchKey("0")
            setSearchData([])
            setMenu(false)
        }
    },[searchKey])
    useEffect(()=>{
        document.body.addEventListener('click', ()=>{
            setSearchData([])
        });
    },[])
    

    return (
        <nav className="navbar navbar-main navbar-expand-lg mt-4 top-1 px-0 mx-4 border-radius-xl position-sticky blur shadow-blur left-auto z-index-sticky" id="navbarBlur" navbar-scroll="true">
            <div className="container-fluid py-1 px-3 mobile-menu-desing">
                <Breadcrumbs icon="Home" title={route[route.length - 1]} route={route} light={light} />
                {/* <Icon fontSize="medium" sx={navbarDesktopMenu} onClick={handleMiniSidenav}>
                    {miniSidenav ? "menu_open" : "menu"}
                </Icon> */}
                <div className="collapse navbar-collapse" id="navbar">
                <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <div className="me-3 position-relative" >
                            <input style={{ width:"20rem" }}  className="form-control search-field" placeholder={t('Search...')} onChange={(e)=>setSearchKey(e.target.value)} />
                            {
                                    searchData?.length >= 0 && <div className="card position-absolute p-0 m-0 me-10 top-100 w-100 rounded-0 mt-1">
                                        {
                                            menu &&<div className="card-body p-0 m-0" >
                                            <ul className="p-1 m-0">
                                                {
                                                searchData.map((items,index)=>(
                                                        <MenuItem style={{ text:"black", hover:{"&:hover":{color:"#121212"}}, color:"#121212" }} key={index}>
                                                            {
                                                                items.invoice_nr &&<NavLink style={{color:"#344767" }} to={'/finance/invoice/' + items.id + '/edit'}>
                                                                {items.invoice_nr ? t("Invoice")+': ' :''} {items.invoice_nr} {items.invoice_nr && items?.customer?.name} <br/>
                                                            </NavLink>
                                                            }
                                                            
                                                            {
                                                                items.customer_name &&<NavLink style={{color:"#344767" }} to={'/customer-management/orders/' + items.id + '/edit'}>
                                                                {items.order_nr ? t("Order")+': ':''} {items.order_nr} {items.order_nr && items?.customer?.name}<br/>
                                                            </NavLink>
                                                            }

                                                            {
                                                                items.creator &&<NavLink style={{color:"#344767" }} to={'/project-management/projects/'+items.id}>
                                                                {items.creator ? t("Project")+': ':''} {items.creator && items.identity_number} {items.creator && items?.name}<br/>
                                                            </NavLink>
                                                            }
                                                            
                                                            {
                                                                items.latitute &&<NavLink style={{color:"#344767" }} to={'/customer-management/customers/' + items.identity_number + '/details'}>
                                                                {items.latitute && t("Customer")+': '} {items.latitute && items.identity_number} {items.latitute && items.name} <br/>
                                                            </NavLink>
                                                            }
                                                            
                                                            {
                                                                items.student_nr && <NavLink style={{color:"#344767" }} to={'/course-management/students/' + items.id + '/edit'}>
                                                                {items.student_nr && t("Student")+': '} {items.student_nr} {items.student_name} <br/>
                                                            </NavLink>
                                                            }
                                                            {
                                                                items.seminar_nr && <NavLink style={{color:"#344767" }} to={'/course-management/seminars/' + items.id + '/edit'}>
                                                                {items.seminar_nr && t("Seminar")+': '} {items.seminar_nr} {items.seminar_nr && items.workshop_name}<br/>
                                                            </NavLink>
                                                            }
                                                            {
                                                                items.quotation_date && <NavLink style={{color:"#344767" }} to={'/customer-management/quotations/' + items.id + '/edit'}>
                                                                {items.quotation_date && t("Quotation")+': '} {items.quotation_date && items.identity_number} {items.quotation_date && items?.customer?.name}<br/>
                                                            </NavLink>
                                                            }
    
                                                            {
                                                                items.type && <NavLink style={{color:"#344767" }} to={'/product-management/suppliers/' + items.id + '/edit'}>
                                                                {items.type && t("Supplier")+': '} {items.type && items.identity_number} {items.type && items.name}<br/>
                                                            </NavLink>
                                                            }
    
                                                            {
                                                                items.employee_identity_number && <NavLink style={{color:"#344767" }} to={'/human-resources/employees/' + items.id + '/edit'}>
                                                                {items.employee_identity_number && t("Employee")+': '} {items.employee_identity_number && items.employee_identity_number}
                                                                   {items?.user !== null && " "+items?.user?.name} <br/>
                                                            </NavLink>
                                                            }
                                                            {
                                                                items.course_nr && <NavLink style={{color:"#344767" }} to={'/course-management/workshops/' + items.id + '/edit'}>
                                                                {items.course_nr && t("Course")+': '}{items.course_nr} {items.course_nr && items.course_title} <br/>
                                                            </NavLink>
                                                            }
    
                                                        </MenuItem>
                                                    ))
                                                }
                                            </ul>
                                            </div>
                                        }
                                    </div>
                                        
                                    
                            }
                        </div>
                </div>
                    
                    <ul className="navbar-nav justify-content-end mobile-top-right-menu">
                        <li className="nav-item d-xl-none mx-3 d-flex align-items-center iconNavbarSidenav" style={{position: 'absolute', left: '-12px', top: '14px'}}>
                            <a href="#0" className="nav-link text-body p-0" id="iconNavbarSidenav">
                                <div className="sidenav-toggler-inner">
                                    <i className="sidenav-toggler-line" />
                                    <i className="sidenav-toggler-line" />
                                    <i className="sidenav-toggler-line" />
                                </div>
                            </a>
                        </li>
                        <li className="nav-item dropdown pe-2 d-flex align-items-center" style={{marginRight: "8px"}}>
                            <a href="notification" className="nav-link text-body p-0 mt-1" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-envelope cursor-pointer" style={{fontSize: "20px"}}>{ unreadMessage > 0 && <sup className="badge badge-danger" style={{
                                    fontSize: '5px',padding: '3px',
                                    height: '10px',
                                    width: '10px',
                                    position: 'relative',
                                    top: '1px',
                                    left: '-5px',
                                    backgroundColor: 'red',
                                    color: '#fff',
                                }}>{unreadMessage}</sup>}</i>
                            </a>
                            <ul style={{overflowY: 'scroll', maxHeight: '300px'}} className="dropdown-menu border-0 shadow dropdown-menu-end  px-2 py-3 me-sm-n4 res-dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {participations ? participations.map((participation) => (
                                    <li className="mb-2" onClick={() => { handleResponsive(); seenMessage(); }}>
                                        <NavLink className="dropdown-item border-radius-md" to={'/chat/message/'+participation.id}>
                                            <div className="d-flex py-1">
                                                <div className="my-auto">
                                                    <img src={user.photo ? process.env.REACT_APP_STORAGE_URL + user.photo : '/assets/img/placeholder.png'} className="avatar avatar-sm  me-3" alt="avatar" />
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h6 className="text-sm font-weight-normal mb-1"><span className="font-weight-bold"></span> {participation.name}</h6>
                                                    <p className="text-xs text-secondary mb-0">
                                                        {/* <i className="fa fa-clock me-1" /> */}
                                                        <LastMessage userId={participation.id}></LastMessage>
                                                    </p>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </li>
                                )) : <></>}
                            </ul>
                        </li>

                        <li className="nav-item dropdown pe-2 d-flex align-items-center" style={{marginRight: "8px"}}>
                            <a href="notification" className="nav-link text-body p-0 mt-1" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-bell cursor-pointer" style={{fontSize: "20px"}}>
                                    { unreadNotification > 0 && <sup className="badge badge-danger" style={{
                                        fontSize: '5px',padding: '3px',
                                        height: '10px',
                                        width: '10px',
                                        position: 'relative',
                                        top: '1px',
                                        left: '-5px',
                                        backgroundColor: 'red',
                                        color: '#fff',
                                    }}>{unreadNotification}</sup>}
                                </i>
                            </a>
                            <ul style={{overflowY: 'scroll', maxHeight: '300px'}} className="dropdown-menu res-dropdown-menu dropdown-menu-end border-0 shadow px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                                {notifications ? notifications.map((notification) => (
                                    <li className="mb-2" onClick={() => seenNotification()}>
                                        <NavLink className="dropdown-item border-radius-md" to={'/project-management/project/edit/' + notification.task_id}>
                                            <div className="d-flex py-1">
                                                <div className="my-auto">
                                                   
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h6 className="text-sm font-weight-normal mb-1">{notification.title}</h6>
                                                    <p className="text-xs text-secondary mb-0">
                                                        <i className="fa fa-clock me-1" />
                                                        <Moment fromNow>{notification.created_at}</Moment>
                                                    </p>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </li> 
                                )): <></>}
                            </ul>
                        </li>
                        <li className="nav-item d-flex align-items-center"> 
                            <div className="ms-md-auto pe-md-3 d-flex">
                                <div className="dropdown">
                                    <a href="flags" className="m-0 nav-link text-body font-weight-bold px-0" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg" alt="" style={{ height: "25px", width: "25px" }}/>
                                    </a>
                                    <ul className="dropdown-menu res-dropdown-menu dropdown-menu-end border-0 shadow" aria-labelledby="dropdownMenuButton1">
                                        <div style={{padding: "0px 15px"}}>
                                        <li className="">{user && user.name ? user.name : '' }</li>
                                        <li className="">{user && user.email ? user.email : '' }</li>
                                        </div>
                                        <div class="dropdown-divider"></div>
                                        <li><NavLink to="/dashboard" className="dropdown-item">{t('Dashboard')}</NavLink></li>
                                        {Cookies.get('user') && JSON.parse(Cookies.get('user')).rolename == 'Call Center' || JSON.parse(Cookies.get('user')).rolename == 'Technical Team' ? (
                                            <>

                                            </>
                                        ) : <>
                                                <li><NavLink to="/profile/settings" className="dropdown-item">{t('Settings')}</NavLink></li>
                                                                                  
                                        </>}
                                        <li><a href="#0" onClick={(e) => doSignout(e)} className="dropdown-item">{t('Sign Out')}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default TopNav;
