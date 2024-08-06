import { React, useEffect, useState, useRef } from "react";
import { NavLink, useParams  } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import Moment from "react-moment";
// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import callFetch from "../../helpers/callFetch";
import { useTranslation } from "react-i18next";
import LastMessage from "./LastMessage";
// Data
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import dataTableData from "layouts/ecommerce/products/products-list/data/dataTableData";
import TopNav from "../../components/TopNav";
import { Grid, Menu, MenuItem } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
function Message() {
  const [participations, setParticipations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const { t } = useTranslation();
  let { id } = useParams(); 
  const [total, setTotal] = useState('');
  const [saving, setSaving] = useState(false);
  const [load, setLoad] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [customClass, setCustomClass] = useState('');
  const [newMessage, setNewMessage] = useState(0);
  const [file, setFile] = useState();
  const [uid, setUid] = useState(0);
  const chatConversationRef = useRef(null);

  const {
    reset, resetField, register, handleSubmit, setError, setValue, getValues,
    formState: { errors },
  } = useForm();

  const handleAutoScroll = () => {
    chatConversationRef.current.scrollTop = chatConversationRef.current.scrollHeight; 
  }

  useEffect(() => {
    const interval = setInterval(() => {
        console.log(getValues('uid'));
        callFetch("message/"+getValues('uid'), "GET", []).then((res) => {  
            setMessages(res.data);
            setTotal(res.total); 
        });  

        callFetch("seen-messages", "GET", []).then((res) => {
            // console.log(res.unread_message); 
        });
    }, 8000); 
    return () => clearInterval(interval);
  },[]);

  const deleteChat = (id) => {
    callFetch("delete-chat/"+id, "GET", []).then((res) => { 
         
    }); 
 }
 const deleteMessage = (id) => {
    callFetch("delete-message/"+id, "GET", []).then((res) => { 
         
    }); 
 }

  //search users
  useEffect(() => {
    if (query) {
        callFetch("search-participation/"+query, "GET", []).then((res) => {
            setSearchResult(res.records);
            setLoading(true);
          });
    }
  }, [query]);

  //file upload
  function handleChange(e) { 
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    callFetch("chat-participation", "GET", []).then((res) => {
        // console.log(res.data);
        setParticipations(res.contacts);
    }); 
  }, [messages, id]);

  useEffect(() => {
    setValue('uid', id);
    console.log(id);
    callFetch("message/"+id, "GET", []).then((res) => {  
        setMessages(res.data);
        setTotal(res.total); 
    });

    callFetch("message/receiver/"+id, "GET", []).then((res) => {
        // console.log(res.data);
        setUser(res.data);
    });
    callFetch("message-seen/"+id, "GET", []).then((res) => {
        // console.log(res.id); 
    });
  }, [id]); 
  
 

  useEffect(() => {
        setValue('receiver_id', id);  
  }); 


  const handleClick = () => {
    resetField("message");
    resetField("attachment");
 }

  const handleResponsive = () => {
    setCustomClass('user-chat-show')
  }

  const removeUserChat = () => {
    setCustomClass(' ');
  }

  const onSubmit = (formData) => {
        setSaving(true);
        callFetch("sent-message"+'?toast=false', "POST", formData, setError).then((res) => {  
            callFetch("message/"+id, "GET", []).then((res) => { 
                setMessages(res.data); 
                // console.log(res.data); 
                setTotal(res.total);
            });
            handleClick();
            setFile('');
            setSaving(false);
            setSubmitSuccess(true);  
        }); 
    };

    useEffect(() => {
        document.title = "INGTEC . Nachrichten";
    }, []);

    const [searchData,setSearchData] = useState([])
    const [searchKey,setSearchKey] = useState("0")
    useEffect(()=>{
        if(searchKey.length > 0){
            callFetch('globar/search/'+searchKey, "GET",[]).then((res)=>{
                if(res.status !== 401){
                    setSearchData(res.data.data)
                }else{
                    setSearchData([])
                }
                
            }) 
        }else{
            setSearchKey("0")
            setSearchData([])
        }
    },[searchKey])
    const [openMenu, setOpenMenu] = useState(null);
    const IdWitMessage = (message_id, related = '') =>{
        //alert(id)
        /*
        const formData = new FormData();
        formData.append('receiver_id', id);
        formData.append('message', message_id);
        */
        setValue('message', related+'-'+message_id);  

        document.getElementById('sendMessageBtn').click();

        //onSubmit;
        //onSubmit(formData);
    }
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(null);
    const renderMenu = () => (
        <Menu
          anchorEl={openMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={Boolean(openMenu)}
          onClose={handleCloseMenu}
        >
          <Grid zIndex={1} mt={0} xs={12} lg={12} pl={2} pr={2} width="15rem">
                <div className="position-relative d-flex align-items-center" >
                    <SearchOutlinedIcon className="position-absolute ms-2 " />
                    <input onChange={(e)=>setSearchKey(e.target.value)} className="chat-search-input"  type="text" placeholder={t('Search...')} />
                </div>
          </Grid>
            <Grid container >
            <Grid mb={5} items mt={1} xs={12} lg={12} pl={3.7} pr={0} width="15rem" height="4rem">
                <SoftBox>
                <ul className="p-1 m-0" >
                    <div>
                    {
                                                searchData?.map((items,index)=>(
                                                    
                                                        <MenuItem onClick={()=>IdWitMessage(items.id, (
                                                            items.invoice_nr ? 'invoice-'+items.invoice_nr
                                                            : items.order_nr ? 'order-'+items.order_nr
                                                            : items.creator ? 'project-'+items.identity_number
                                                            : items.student_nr ? 'student-'+items.student_nr
                                                            : items.seminar_nr ? 'seminar-'+items.seminar_nr 
                                                            : items.type ? 'supplier-'+items.identity_number
                                                            : items.employee_identity_number ? 'employee-'+items.employee_identity_number
                                                            : items.course_nr ? 'course-'+items.course_nr
                                                            : items.latitute ? 'customer-'+items.identity_number
                                                            : items.quotation_date ? 'quotation-'+items.identity_number
                                                            : ''
                                                            ))} style={{ text:"black", hover:{"&:hover":{color:"#121212"}}, color:"#121212" }} key={index}>
                                                            {
                                                                items.invoice_nr && <SoftBox>
                                                                <SoftTypography variant="caption" >{items.invoice_nr ? t("Invoice")+': ' :''} {items.invoice_nr} {items.invoice_nr && items?.customer?.name}</SoftTypography>
                                                                 
                                                                </SoftBox>
                                                            }
                                                            
                                                            {
                                                                items.customer_name &&
                                                                <SoftBox>
                                                                    <SoftTypography variant="caption" >
                                                                        {items.order_nr ? t("Order")+': ':''} {items.order_nr} {items.order_nr && items?.customer?.name}<br/>
                                                                    </SoftTypography>
                                                                    
                                                                </SoftBox>  
                                                            }

                                                            {
                                                                items.creator &&
                                                                 <SoftBox>
                                                                 <SoftTypography variant="caption" >
                                                                 {items.creator ? t("Project")+': ':''} {items.creator && items.identity_number} {items.creator && items?.name}<br/>
                                                                 </SoftTypography>
                                                                 
                                                             </SoftBox> 
                                                            }
                                                            
                                                            {
                                                                items.latitute &&
                                                            <SoftBox>
                                                            <SoftTypography variant="caption" >
                                                            {items.latitute && t("Customer")+': '} {items.latitute && items.identity_number} {items.latitute && items.name} <br/>
                                                            </SoftTypography>
                                                            
                                                            </SoftBox>
                                                            }
                                                            
                                                            {
                                                                items.student_nr &&
                                                            <SoftBox>
                                                            <SoftTypography variant="caption" >
                                                            {items.student_nr && t("Student")+': '} {items.student_nr} {items.student_name} <br/>
                                                            </SoftTypography>
                                                            
                                                            </SoftBox>
                                                            }
                                                            {
                                                                items.seminar_nr &&
                                                                  <SoftBox>
                                                                  <SoftTypography variant="caption" >
                                                                  {items.seminar_nr && t("Seminar")+': '} {items.seminar_nr} {items.seminar_nr && items.workshop_name}<br/>
                                                                  </SoftTypography>
                                                                  
                                                                  </SoftBox>
                                                            }
                                                            {
                                                                items.quotation_date && 
                                                                <SoftBox>
                                                                <SoftTypography variant="caption" >
                                                                {items.quotation_date && t("Quotation")+': '} {items.quotation_date && items.identity_number} {items.quotation_date && items?.customer?.name}<br/>
                                                                </SoftTypography>
                                                                
                                                                </SoftBox>
                                                            }
    
                                                            {
                                                                items.type &&
                                                            <SoftBox>
                                                            <SoftTypography variant="caption" >
                                                            {items.type && t("Supplier")+': '} {items.type && items.identity_number} {items.type && items.name}<br/>
                                                            </SoftTypography>
                                                            
                                                            </SoftBox>
                                                            }
    
                                                            {
                                                                items.employee_identity_number && 
                                                             <SoftBox>
                                                             <SoftTypography variant="caption" >
                                                                {items.employee_identity_number && t("Employee")+': '} {items.employee_identity_number && items.employee_identity_number}
                                                                   {items?.user !== null && " "+items?.user?.name} <br/>
                                                             </SoftTypography>
                                                        
                                                             </SoftBox>
                                                            }
                                                            {
                                                                items.course_nr && 
                                                            <SoftBox>
                                                            <SoftTypography variant="caption" >
                                                                {items.course_nr && t("Course")+': '}{items.course_nr} {items.course_nr && items.course_title} <br/>
                                                            </SoftTypography>
                                                            
                                                            </SoftBox>
                                                            }
    
                                                        </MenuItem>
                                                    ))
                                                }
                    </div>
                </ul>
                    {/* <SoftTypography variant="caption" >Project: 500009 <underline>Test Project ABC</underline> </SoftTypography> */}
                </SoftBox>
          </Grid>
            </Grid>
        </Menu>

      );
  return (
  <Card>
    <SoftBox>
    <div className="layout-wrapper d-lg-flex">  
        <div className="chat-leftsidebar me-lg-1 ms-lg-0" style={{backgroundColor: '#fff'}}>

            <div className="tab-content">  
                <div className="tab-pane fade show active" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab">
            
                    <div>
                        <div className="px-4 pt-4">
                            <h4 className="mb-4" style={{position: 'relative'}}>{t('Message')} <NavLink to={'/chat/send-message'} className="btn btn-primary" style={{position: 'absolute', right: '0px', fontSize: '12px', padding: '8px'}}>{t('New Message')}</NavLink></h4>
                            <div className="search-box chat-search-box">            
                                <div className="input-group mb-3 rounded-3">
                                    {/* <span className="input-group-text text-muted bg-light pe-1 ps-3" id="basic-addon1">
                                        <i className="ri-search-line search-icon font-size-18"></i>
                                    </span> */}
                                    <input type="text" value={query} onChange={({ target }) => setQuery(target.value)} className="form-control bg-light" placeholder={t('Search Users')} aria-label="Search users" aria-describedby="basic-addon1" style={{ borderLeft:'none!important', borderRadius: '0px 5px 5px 0px!important' }}/>
                                </div> 
                            </div>  
                        </div>  

                    
                        <div className="px-4 pb-4" dir="ltr">

                            <div className="owl-carousel owl-theme" id="user-status-carousel">
                                <div className="item">
                                    <a href="#" className="user-status-box">
                                        <div className="avatar-xs mx-auto d-block chat-user-img online">
                                            <img src="assets/images/users/avatar-2.jpg" alt="user-img" className="img-fluid rounded-circle"/>
                                            <span className="user-status"></span>
                                        </div>

                                        <h5 className="font-size-13 text-truncate mt-3 mb-1">{t('Patrick')}</h5>
                                    </a>
                                </div>
                                <div className="item">
                                    <a href="#" className="user-status-box">
                                        <div className="avatar-xs mx-auto d-block chat-user-img online">
                                            <img src="assets/images/users/avatar-4.jpg" alt="user-img" className="img-fluid rounded-circle"/>
                                            <span className="user-status"></span>
                                        </div>

                                        <h5 className="font-size-13 text-truncate mt-3 mb-1">{t('Doris')}</h5>
                                    </a>
                                </div>

                                <div className="item">
                                    <a href="#" className="user-status-box">
                                        <div className="avatar-xs mx-auto d-block chat-user-img online">
                                            <img src="assets/images/users/avatar-5.jpg" alt="user-img" className="img-fluid rounded-circle"/>
                                            <span className="user-status"></span>
                                        </div>

                                        <h5 className="font-size-13 text-truncate mt-3 mb-1">{t('Emily')}</h5>
                                    </a>
                                </div>

                                <div className="item">
                                    <a href="#" className="user-status-box">
                                        <div className="avatar-xs mx-auto d-block chat-user-img online">
                                            <img src="assets/images/users/avatar-6.jpg" alt="user-img" className="img-fluid rounded-circle"/>
                                            <span className="user-status"></span>
                                        </div>

                                        <h5 className="font-size-13 text-truncate mt-3 mb-1">{t('Steve')}</h5>
                                    </a>
                                </div>

                                <div className="item">
                                    <a href="#" className="user-status-box">
                                        <div className="avatar-xs mx-auto d-block chat-user-img online">
                                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                T
                                            </span>
                                            <span className="user-status"></span>
                                        </div>

                                        <h5 className="font-size-13 text-truncate mt-3 mb-1">{t('Teresa')}</h5>
                                    </a>
                                </div>
        
                            </div> 
                        </div> 
    
                        <div>
                            <h5 className="mb-3 px-3 font-size-16">{t('Recent')}</h5>

                            <div className="chat-message-list px-2" data-simplebar>
        
                                <ul className="list-unstyled chat-list chat-user-list">
                                {!loading && (
                                        participations.map((user) => (
                                            <li className={id == user.id ? 'active' : ''} onClick={handleResponsive}>
                                                <NavLink to={'/chat/message/'+user.id}>
                                                    <div className="d-flex">                            
                                                        <div className="chat-user-img online align-self-center me-3 ms-0">
                                                        <img className="avatar avatar-sm" src={user.photo ? process.env.REACT_APP_STORAGE_URL + user.photo : '/assets/img/placeholder.png'} alt="" />
                                                            {/* <span className="user-status"></span> */}
                                                        </div>
                                                                
                                                        <div className="flex-grow-1 overflow-hidden">
                                                            <h5 className="text-truncate font-size-15 mb-1">{user.name}</h5>
                                                            <p className="chat-user-message text-truncate mb-0">
                                                                <LastMessage userId={user.id}></LastMessage>
                                                            </p>
                                                        </div>
                                                        <div className="font-size-11"></div>
                                                        <div class="unread-message">
                                                            <span class="badge badge-soft-danger rounded-pill"></span>
                                                        </div>
                                                        <div className="dropdown align-self-start">
                                                            <a href="!0" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{borderTop: '0px'}}>
                                                                <i className="ri-more-2-fill"></i>
                                                            </a>
                                                            <div className="dropdown-menu"> 
                                                                <a className="dropdown-item" href="javascript::void(0)" onClick={() => deleteChat(user.id)}>Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        ))
                                    )}

                                    {loading && (
                                        Array.isArray(searchResult) && searchResult.map((user) => (
                                            <li className={id == user.id ? 'active' : ''}>
                                                <NavLink to={'/chat/message/'+user.id}>
                                                    <div className="d-flex">                            
                                                        <div className="chat-user-img online align-self-center me-3 ms-0">
                                                        <img className="avatar avatar-sm" src={user.photo ? process.env.REACT_APP_STORAGE_URL + user.photo : '/assets/img/placeholder.png'} alt="" />
                                                            {/* <span className="user-status"></span> */}
                                                        </div>
                                                                
                                                        <div className="flex-grow-1 overflow-hidden">
                                                            <h5 className="text-truncate font-size-15 mb-1">{user.name}</h5>
                                                            <p className="chat-user-message text-truncate mb-0">
                                                                <LastMessage userId={user.id}></LastMessage>
                                                            </p>
                                                        </div>
                                                        <div className="font-size-11"></div>
                                                        <div class="unread-message">
                                                            <span class="badge badge-soft-danger rounded-pill"></span>
                                                        </div>
                                                        <div className="dropdown align-self-start">
                                                            <a href="!0" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{borderTop: '0px'}}>
                                                                <i className="ri-more-2-fill"></i>
                                                            </a>
                                                            <div className="dropdown-menu"> 
                                                                <a className="dropdown-item" href="javascript::void(0)" onClick={() => deleteChat(user.id)}>Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        ))
                                    )}

                                    {/* <li className="unread">
                                        <a href="#">
                                            <div className="d-flex">
                                                <div className="chat-user-img away align-self-center me-3 ms-0">
                                                    <img src="https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg" className="rounded-circle avatar-xs" alt=""/>
                                                    <span className="user-status"></span>
                                                </div>
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <h5 className="text-truncate font-size-15 mb-1">Mark Messer</h5>
                                                    <p className="chat-user-message text-truncate mb-0"><i className="ri-image-fill align-middle me-1 ms-0"></i> Images</p>
                                                </div>
                                                <div className="font-size-11">12 min</div>        
                                                <div className="unread-message">
                                                    <span className="badge badge-soft-danger rounded-pill">02</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
    

                                    <li className="active">
                                        <a href="#">
                                            <div className="d-flex">
                                                <div className="chat-user-img online align-self-center me-3 ms-0">
                                                    <img src="https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg" className="rounded-circle avatar-xs" alt=""/>
                                                    <span className="user-status"></span>
                                                </div>
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <h5 className="text-truncate font-size-15 mb-1">Doris Brown</h5>
                                                    <p className="chat-user-message text-truncate mb-0">Nice to meet you</p>
                                                </div>    
                                                <div className="font-size-11">10:12 AM</div>
                                            </div>
                                        </a>
                                    </li>
                                    
                                    <li className="typing">
                                        <a href="#">                        
                                            <div className="d-flex">
                                                <div className="chat-user-img align-self-center online me-3 ms-0">
                                                    <div className="avatar-xs">
                                                        <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                            A
                                                        </span>
                                                    </div>
                                                    <span className="user-status"></span>
                                                </div>
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <h5 className="text-truncate font-size-15 mb-1">Albert Rodarte</h5>
                                                    <p className="chat-user-message text-truncate mb-0">typing<span className="animate-typing">
                                                        <span className="dot"></span>
                                                        <span className="dot"></span>
                                                        <span className="dot"></span>
                                                    </span></p>
                                                </div>
                                                <div className="font-size-11">04:56 PM</div>
                                            </div>  
                                        </a>
                                    </li> */}
    
                                </ul>
                            </div>
                        </div> 
                    </div> 
                </div>  
                
                {/* End settings tab-pane */}
            </div>
            {/* end tab content */}

        </div>
        {/* end chat-leftsidebar */}

        {/* Start User chat */}
        <div className={ 'user-chat verflow-hidden ' + customClass}>
            <div className="d-lg-flex">

                {/* start chat conversation section */}
                <div className="w-100 overflow-hidden position-relative">
                    <div className="p-3 p-lg-3 border-bottom user-chat-topbar">
                        <div className="row align-items-center">
                            <div className="col-sm-4 col-8">
                                <div className="d-flex align-items-center">
                                    <div className="d-block d-lg-none me-2 ms-0">
                                        <a href="javascript::void(0);" className="user-chat-remove text-muted font-size-16 p-2" onClick={removeUserChat}><i className="ri-arrow-left-s-line"></i></a>
                                    </div>
                                    <div className="me-3 ms-0">
                                    <img className="avatar avatar-sm" src={user.photo ? process.env.REACT_APP_STORAGE_URL + user.photo : '/assets/img/placeholder.png'} alt="" />
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h5 className="font-size-16 mb-0 text-truncate"><a href="#0" className="text-reset user-profile-show">{user.name}</a></h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8 col-4">
                                <ul className="list-inline user-chat-nav text-end mb-0">                                        
                                    <li className="list-inline-item">
                                        <div className="dropdown">
                                            {/* <button className="btn nav-btn" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="ri-search-line"></i>
                                            </button> */}
                                            <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-md">
                                                <div className="search-box p-2">
                                                    <input type="text" className="form-control bg-light border-0" placeholder="Search.."/>
                                                </div>
                                            </div>
                                        </div>
                                    </li>                          
                                </ul>                                    
                            </div>
                        </div>
                    </div>
                    {/* end chat user head */}

                    {/* start chat conversation */}
                    <div className="chat-conversation p-3 p-lg-4" style={{overflow: 'hidden scroll', scrollbarWidth: 'thin'}} ref={chatConversationRef}>
                        <ul className="list-unstyled mb-0">
                            
                            {messages.map((message, key) => {
                                if(total == key){
                                    handleAutoScroll()
                                }
                                if(message.sender_id === id){
                                    return <li id={key}>
                                                <div className="conversation-list">
                                                    <div className="chat-avatar">
                                                        <img className="avatar avatar-sm" src={user.photo ? process.env.REACT_APP_STORAGE_URL + user.photo : '/assets/img/placeholder.png'} alt="" />
                                                    </div>


                                                    {message.message && 
                                                    message.message && message.message.split('-')[0] ==  'employee' ||
                                                    message.message && message.message.split('-')[0] ==  'customer' ||
                                                    message.message && message.message.split('-')[0] ==  'quotation' ||
                                                    message.message && message.message.split('-')[0] ==  'order' ||
                                                    message.message && message.message.split('-')[0] ==  'project' ||
                                                    message.message && message.message.split('-')[0] ==  'supplier' ||
                                                    message.message && message.message.split('-')[0] ==  'invoice' ||
                                                    message.message && message.message.split('-')[0] ==  'seminar' ||
                                                    message.message && message.message.split('-')[0] ==  'course' ||
                                                    message.message && message.message.split('-')[0] ==  'student' ?
                                                    <>
                                                        <div className="user-chat-content">
                                                            <div className="ctext-wrap">
                                                                <div className="ctext-wrap-content" style={{display: 'flex', height: '90px', minWidth: '320px', maxWidth: '350px', flexWrap: 'wrap'}}>
                                                                        <i className="fa-solid fa-share icon icon-shape icon-sm bg-dark" style={{
                                                                            width: '45px',
                                                                            height: '45px',
                                                                            borderRadius: '12px',
                                                                            textAlign: 'center',
                                                                            lineHeight: '45px',
                                                                            color: '#ffffff',
                                                                            background: '#313860'
                                                                            }}></i>
                                                                        <div style={{
                                                                            paddingLeft: '15px',
                                                                            paddingRight: '60px',
                                                                            textAlign: 'left',
                                                                        }}>
                                                                            <p style={{
                                                                                margin: '0px',
                                                                                fontSize: '12px',
                                                                                fontWeight: 700,
                                                                                color: '#ffffff',
                                                                                }}>
                                                                                    {message.message && message.message.split('-')[0] == 'employee' ?  t('Employee')
                                                                                    : message.message && message.message.split('-')[0] == 'customer' ? t('Customer')
                                                                                    : message.message && message.message.split('-')[0] == 'quotation' ? t('Quotation')
                                                                                    : message.message && message.message.split('-')[0] == 'order' ? t('Order')
                                                                                    : message.message && message.message.split('-')[0] == 'project' ? t('Project')
                                                                                    : message.message && message.message.split('-')[0] == 'supplier' ? t('Supplier')
                                                                                    : message.message && message.message.split('-')[0] == 'invoice' ? t('Invoice')
                                                                                    : message.message && message.message.split('-')[0] == 'seminar' ? t('Seminar')
                                                                                    : message.message && message.message.split('-')[0] == 'course' ? t('Course')
                                                                                    : message.message && message.message.split('-')[0] == 'student' ? t('Student')
                                                                                    : t('Number') }:
                                                                                    
                                                                                </p>
                                                                            <h5 style={{
                                                                                margin: '0px',
                                                                                fontSize: '18px',
                                                                                fontWeight: 700,
                                                                                color: '#ffffff'
                                                                                }}>{
                                                                                    message.message && message.message.split('-')[0] == 'seminar' ||
                                                                                    message.message && message.message.split('-')[0] == 'course' ||
                                                                                    message.message && message.message.split('-')[0] == 'student' ?
                                                                                    message.message.split('-')[1]+'-'+message.message.split('-')[2] :  message.message.split('-')[1]
                                                                            }</h5>
                                                                        </div>
                                                                        <NavLink style={{
                                                                                width: '95px',
                                                                                height: '35px',
                                                                                marginTop: '6px',
                                                                                lineHeight: '12px'
                                                                        }} className={'btn btn-primary mb-0'} 
                                                                        to={
                                                                            message.message && message.message.split('-')[0] == 'employee' ? '/human-resources/employees/'+message.message.split('-')[2]+'/profile'
                                                                            : message.message && message.message.split('-')[0] == 'customer' ? '/customer-management/customers/'+message.message.split('-')[1]+'/details'
                                                                            : message.message && message.message.split('-')[0] == 'quotation' ? '/customer-management/quotations/'+message.message.split('-')[2]+'/edit'
                                                                            : message.message && message.message.split('-')[0] == 'order' ? '/customer-management/orders/'+message.message.split('-')[2]+'/edit'
                                                                            : message.message && message.message.split('-')[0] == 'project' ? '/project-management/projects/'+message.message.split('-')[2]
                                                                            : message.message && message.message.split('-')[0] == 'supplier' ? '/product-management/suppliers/'+message.message.split('-')[2]+'/edit'
                                                                            : message.message && message.message.split('-')[0] == 'invoice' ? '/finance/invoice/'+message.message.split('-')[2]+'/edit'
                                                                            : message.message && message.message.split('-')[0] == 'seminar' ? '/course-management/seminars/'+message.message.split('-')[3]+'/students'
                                                                            : message.message && message.message.split('-')[0] == 'course' ? '/course-management/workshops/'+message.message.split('-')[3]+'/edit'
                                                                            : message.message && message.message.split('-')[0] == 'student' ? '/course-management/students/'+message.message.split('-')[3]+'/edit'
                                                                            : '' } >{t("Open")}</NavLink>
                                                                    <p className="chat-time mb-0" style={{flex: '0 0 100%'}}><i className="ri-time-line align-middle"></i> <span className="align-middle"><Moment fromNow>{message.created_at}</Moment></span></p>
                                                                </div>
                                                                {/*<div className="dropdown align-self-start">
                                                                    <a href="0" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                                        <i className="ri-more-2-fill"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu"   data-popper-placement="bottom-start">
                                                                      
                                                                        <a className="dropdown-item" href="javascript::void(0)" onClick={() => deleteMessage(message.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></a>
                                                                    </div>
                                                                </div> */}
                                                            </div>
                                                            <div className="conversation-name">{message.sender.name}</div>
                                                        </div>
                                                    </>
                                                    : <>
                                                        <div className="user-chat-content">
                                                            <div className="ctext-wrap">
                                                                <div className="ctext-wrap-content">
                                                                    <p className="mb-0">
                                                                        {message?.message}
                                                                    </p>
                                                                    
                                                                    {message.attachment && (
                                                                        <a target="_blank" download href={process.env.REACT_APP_STORAGE_URL+'storage/message_attachment/'+message.attachment}>
                                                                        <img src={process.env.REACT_APP_STORAGE_URL+'storage/message_attachment/'+message.attachment} style={{height: '300px'}}/>
                                                                        </a>
                                                                    )}                                                                       
                                                                
                                                                    <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle"><Moment fromNow>{message.created_at}</Moment></span></p>
                                                                </div> 
                                                                {/*<div className="dropdown align-self-start">
                                                                    <a href="0" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                                        <i className="ri-more-2-fill"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu"   data-popper-placement="bottom-start">
                                                                      
                                                                        <a className="dropdown-item" href="javascript::void(0)" onClick={() => deleteMessage(message.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></a>
                                                                    </div>
                                                                </div>*/}
                                                            </div>
                                                            <div className="conversation-name">{message.sender.name}</div>
                                                        </div>
                                                    </>}
                                                </div>
                                            </li> 
                                }

                                return <li className="right" id={key}>
                                <div className="conversation-list">
                                    <div className="chat-avatar">
                                        <img className="avatar avatar-sm" src={message.sender.photo ? process.env.REACT_APP_STORAGE_URL + message.sender.photo : '/assets/img/placeholder.png'} alt="" />
                                    </div>

                                    {message.message && 
                                    message.message && message.message.split('-')[0] ==  'employee' ||
                                    message.message && message.message.split('-')[0] ==  'customer' ||
                                    message.message && message.message.split('-')[0] ==  'quotation' ||
                                    message.message && message.message.split('-')[0] ==  'order' ||
                                    message.message && message.message.split('-')[0] ==  'project' ||
                                    message.message && message.message.split('-')[0] ==  'supplier' ||
                                    message.message && message.message.split('-')[0] ==  'invoice' ||
                                    message.message && message.message.split('-')[0] ==  'seminar' ||
                                    message.message && message.message.split('-')[0] ==  'course' ||
                                    message.message && message.message.split('-')[0] ==  'student' ?
                                    <>
                                        <div className="user-chat-content">
                                            <div className="ctext-wrap">
                                                <div className="ctext-wrap-content" style={{display: 'flex', height: '70px', minWidth: '320px'}}>
                                                        <i className="fa-solid fa-share icon icon-shape icon-sm bg-dark" style={{
                                                            width: '45px',
                                                            height: '45px',
                                                            borderRadius: '12px',
                                                            textAlign: 'center',
                                                            lineHeight: '45px',
                                                            color: '#ffffff',
                                                            background: '#313860'
                                                            }}></i>
                                                        <div style={{
                                                            paddingLeft: '15px',
                                                            paddingRight: '60px',
                                                            textAlign: 'left',
                                                        }}>
                                                            <p style={{
                                                                margin: '0px',
                                                                fontSize: '12px',
                                                                fontWeight: 700,
                                                                color: '#1d2836',
                                                                }}>
                                                                    {message.message && message.message.split('-')[0] == 'employee' ?  t('Employee')
                                                                    : message.message && message.message.split('-')[0] == 'customer' ? t('Customer')
                                                                    : message.message && message.message.split('-')[0] == 'quotation' ? t('Quotation')
                                                                    : message.message && message.message.split('-')[0] == 'order' ? t('Order')
                                                                    : message.message && message.message.split('-')[0] == 'project' ? t('Project')
                                                                    : message.message && message.message.split('-')[0] == 'supplier' ? t('Supplier')
                                                                    : message.message && message.message.split('-')[0] == 'invoice' ? t('Invoice')
                                                                    : message.message && message.message.split('-')[0] == 'seminar' ? t('Seminar')
                                                                    : message.message && message.message.split('-')[0] == 'course' ? t('Course')
                                                                    : message.message && message.message.split('-')[0] == 'student' ? t('Student')
                                                                    : t('Number') }:
                                                                    
                                                                </p>
                                                            <h5 style={{
                                                                margin: '0px',
                                                                fontSize: '18px',
                                                                fontWeight: 700
                                                                }}>{
                                                                    message.message && message.message.split('-')[0] == 'seminar' ||
                                                                    message.message && message.message.split('-')[0] == 'course' ||
                                                                    message.message && message.message.split('-')[0] == 'student' ?
                                                                    message.message.split('-')[1]+'-'+message.message.split('-')[2] :  message.message.split('-')[1]
                                                            }</h5>
                                                        </div>
                                                        <NavLink style={{
                                                                width: '95px',
                                                                height: '35px',
                                                                marginTop: '6px',
                                                                lineHeight: '12px'
                                                        }} className={'btn btn-primary mb-0'} 
                                                        to={
                                                            message.message && message.message.split('-')[0] == 'employee' ? '/human-resources/employees/'+message.message.split('-')[2]+'/profile'
                                                            : message.message && message.message.split('-')[0] == 'customer' ? '/customer-management/customers/'+message.message.split('-')[1]+'/details'
                                                            : message.message && message.message.split('-')[0] == 'quotation' ? '/customer-management/quotations/'+message.message.split('-')[2]+'/edit'
                                                            : message.message && message.message.split('-')[0] == 'order' ? '/customer-management/orders/'+message.message.split('-')[2]+'/edit'
                                                            : message.message && message.message.split('-')[0] == 'project' ? '/project-management/projects/'+message.message.split('-')[2]
                                                            : message.message && message.message.split('-')[0] == 'supplier' ? '/product-management/suppliers/'+message.message.split('-')[2]+'/edit'
                                                            : message.message && message.message.split('-')[0] == 'invoice' ? '/finance/invoice/'+message.message.split('-')[2]+'/edit'
                                                            : message.message && message.message.split('-')[0] == 'seminar' ? '/course-management/seminars/'+message.message.split('-')[3]+'/students'
                                                            : message.message && message.message.split('-')[0] == 'course' ? '/course-management/workshops/'+message.message.split('-')[3]+'/edit'
                                                            : message.message && message.message.split('-')[0] == 'student' ? '/course-management/students/'+message.message.split('-')[3]+'/edit'
                                                            : '' } >{t("Open")}</NavLink>
                                                </div> 
                                                <div className="dropdown align-self-start">
                                                    <a href="0" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu"   data-popper-placement="bottom-start">
                                                        
                                                        <a className="dropdown-item" href="javascript::void(0)" onClick={() => deleteMessage(message.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : <>
                                        <div className="user-chat-content">
                                            <div className="ctext-wrap">
                                                <div className="ctext-wrap-content">
                                                    <p className="mb-0">
                                                        {message?.message}
                                                    </p>
                                                    
                                                    {message.attachment && (
                                                        <a target="_blank" download href={process.env.REACT_APP_STORAGE_URL+'storage/message_attachment/'+message.attachment}>
                                                        <img src={process.env.REACT_APP_STORAGE_URL+'storage/message_attachment/'+message.attachment} style={{height: '300px'}}/>
                                                        </a>
                                                    )}
                                                        
                                                
                                                    <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle"><Moment fromNow>{message.created_at}</Moment></span></p>
                                                    
                                                </div> 
                                                <div className="dropdown align-self-start">
                                                    <a href="0" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu"   data-popper-placement="bottom-start">
                                                        
                                                        <a className="dropdown-item" href="javascript::void(0)" onClick={() => deleteMessage(message.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>}
                                </div>
                            </li>
                                
                            })} 
                        </ul>
                    </div>
                    {/* end chat conversation end */}

                    {/* start chat input section */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="chat-input-section p-4 p-lg-4 border-top mb-0">
                            <div className="row g-0"> 
                                <div className="col-sm-10">
                                    <input type="hidden" {...register('receiver_id')} />
                                    <div className="form-group">
                                        <SoftInput placeholder={t("Type here...")}  multiline rows={2} {...register('message')}/>
                                    </div>
                                </div> 
                                <div className="col-sm-2">
                                        {!saving && (
                                            <button type="submit" className="btn btn-primary" id="sendMessageBtn" style={{ margin: '10px 30px'}}>
                                            {t("Send")}
                                            </button>
                                        )}
                                        {saving && (
                                            <button type="submit" className="btn btn-disabled" disabled>
                                            {t("Sending ...")}
                                            </button>
                                        )}
                                </div>
                            </div>
                            <div className="row g-0">
                                <div className="col-sm-1 d-flex align-items-center">
                                    <div className="choose_file">
                                        <span title="Attach File" style={{fontSize: '22px'}}><i class="fa fa-paperclip" aria-hidden="true"></i></span>
                                        <input {...register('attachment')} type="file" onChange={handleChange}/>
                                    </div>
                                    <div style={{backgroundColor:"none"}} className="choose_file">
                                        <AddCircleOutlineOutlinedIcon onClick={handleOpenMenu} fontSize="22px" style={{fontSize: '22px', cursor:"pointer"}} />
                                        {renderMenu()}
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <img src={file} height="50" alt=""/>
                                </div>
                                
                            </div>
                        </div>
                    </form>
                    {/* end chat input section */}
                </div>
                {/* end chat conversation section */}

                {/* start User profile detail sidebar */}
                <div className="user-profile-sidebar">
                    <div className="px-3 px-lg-4 pt-3 pt-lg-4">
                        <div className="user-chat-nav text-end">
                            <button type="button" className="btn nav-btn" id="user-profile-hide">
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                    </div>

                    <div className="text-center p-4 border-bottom">
                        <div className="mb-4">
                            <img src="assets/images/users/avatar-4.jpg" className="rounded-circle avatar-lg img-thumbnail" alt=""/>
                        </div>

                        <h5 className="font-size-16 mb-1 text-truncate">{t('Doris Brown')}</h5>
                        <p className="text-muted text-truncate mb-1"><i className="ri-record-circle-fill font-size-10 text-success me-1 ms-0"></i> {t('Active')}</p>
                    </div>
                    {/* End profile user */}

                    {/* Start user-profile-desc */}
                    <div className="p-4 user-profile-desc" data-simplebar>
                        <div className="text-muted">
                            <p className="mb-4">If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
                        </div>

                        <div className="accordion" id="myprofile">
        
                            <div className="accordion-item card border mb-2">
                                <div className="accordion-header" id="about3">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#aboutprofile" aria-expanded="true" aria-controls="aboutprofile">
                                        <h5 className="font-size-14 m-0">
                                            <i className="ri-user-2-line me-2 ms-0 align-middle d-inline-block"></i> About
                                        </h5>
                                    </button>
                                </div>
                                <div id="aboutprofile" className="accordion-collapse collapse show" aria-labelledby="about3" data-bs-parent="#myprofile">
                                    <div className="accordion-body">
                                        <div>
                                            <p className="text-muted mb-1">Name</p>
                                            <h5 className="font-size-14">Doris Brown</h5>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-muted mb-1">Email</p>
                                            <h5 className="font-size-14">adc@123.com</h5>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-muted mb-1">Time</p>
                                            <h5 className="font-size-14">11:40 AM</h5>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-muted mb-1">Location</p>
                                            <h5 className="font-size-14 mb-0">California, USA</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item card border">
                                <div className="accordion-header" id="attachfile3">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#attachprofile" aria-expanded="false" aria-controls="attachprofile">
                                        <h5 className="font-size-14 m-0">
                                            <i className="ri-attachment-line me-2 ms-0 align-middle d-inline-block"></i> Attached Files
                                        </h5>
                                    </button>
                                </div>
                                <div id="attachprofile" className="accordion-collapse collapse" aria-labelledby="attachfile3" data-bs-parent="#myprofile">
                                    <div className="accordion-body">
                                        <div className="card p-2 border mb-2">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar-sm me-3 ms-0">
                                                    <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                                                        <i className="ri-file-text-fill"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div className="text-start">
                                                        <h5 className="font-size-14 mb-1">admin_v1.0.zip</h5>
                                                        <p className="text-muted font-size-13 mb-0">12.5 MB</p>
                                                    </div>
                                                </div>

                                                <div className="ms-4 me-0">
                                                    <ul className="list-inline mb-0 font-size-18">
                                                        <li className="list-inline-item">
                                                            <a href="#" className="text-muted px-1">
                                                                <i className="ri-download-2-line"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item dropdown">
                                                            <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className="ri-more-fill"></i>
                                                            </a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <a className="dropdown-item" href="#">Action</a>
                                                                <a className="dropdown-item" href="#">Another action</a>
                                                                <div className="dropdown-divider"></div>
                                                                <a className="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card p-2 border mb-2">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar-sm me-3 ms-0">
                                                    <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                                                        <i className="ri-image-fill"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div className="text-start">
                                                        <h5 className="font-size-14 mb-1">Image-1.jpg</h5>
                                                        <p className="text-muted font-size-13 mb-0">4.2 MB</p>
                                                    </div>
                                                </div>

                                                <div className="ms-4 me-0">
                                                    <ul className="list-inline mb-0 font-size-18">
                                                        <li className="list-inline-item">
                                                            <a href="#" className="text-muted px-1">
                                                                <i className="ri-download-2-line"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item dropdown">
                                                            <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className="ri-more-fill"></i>
                                                            </a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <a className="dropdown-item" href="#">Action</a>
                                                                <a className="dropdown-item" href="#">Another action</a>
                                                                <div className="dropdown-divider"></div>
                                                                <a className="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card p-2 border mb-2">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar-sm me-3 ms-0">
                                                    <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                                                        <i className="ri-image-fill"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div className="text-start">
                                                        <h5 className="font-size-14 mb-1">Image-2.jpg</h5>
                                                        <p className="text-muted font-size-13 mb-0">3.1 MB</p>
                                                    </div>
                                                </div>

                                                <div className="ms-4 me-0">
                                                    <ul className="list-inline mb-0 font-size-18">
                                                        <li className="list-inline-item">
                                                            <a href="#" className="text-muted px-1">
                                                                <i className="ri-download-2-line"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item dropdown">
                                                            <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className="ri-more-fill"></i>
                                                            </a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <a className="dropdown-item" href="#">Action</a>
                                                                <a className="dropdown-item" href="#">Another action</a>
                                                                <div className="dropdown-divider"></div>
                                                                <a className="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card p-2 border mb-2">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar-sm me-3 ms-0">
                                                    <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                                                        <i className="ri-file-text-fill"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div className="text-start">
                                                        <h5 className="font-size-14 mb-1">Landing-A.zip</h5>
                                                        <p className="text-muted font-size-13 mb-0">6.7 MB</p>
                                                    </div>
                                                </div>

                                                <div className="ms-4 me-0">
                                                    <ul className="list-inline mb-0 font-size-18">
                                                        <li className="list-inline-item">
                                                            <a href="#" className="text-muted px-1">
                                                                <i className="ri-download-2-line"></i>
                                                            </a>
                                                        </li>
                                                        <li className="list-inline-item dropdown">
                                                            <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className="ri-more-fill"></i>
                                                            </a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <a className="dropdown-item" href="#">Action</a>
                                                                <a className="dropdown-item" href="#">Another action</a>
                                                                <div className="dropdown-divider"></div>
                                                                <a className="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/* end profile-user-accordion */}
                    </div>
                    {/* end user-profile-desc */}
                </div>
                {/* end User profile detail sidebar */}
            </div>
        </div>
        {/* End User chat */}

        {/* audiocall Modal */}
        <div className="modal fade" id="audiocallModal" tabindex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="text-center p-4">
                            <div className="avatar-lg mx-auto mb-4">
                                <img src="assets/images/users/avatar-4.jpg" alt="" className="img-thumbnail rounded-circle"/>
                            </div>

                            <h5 className="text-truncate">Doris Brown</h5>
                            <p className="text-muted">Start Audio Call</p>

                            <div className="mt-5">
                                <ul className="list-inline mb-1">
                                    <li className="list-inline-item px-2 me-2 ms-0">
                                        <button type="button" className="btn btn-danger avatar-sm rounded-circle" data-bs-dismiss="modal">
                                            <span className="avatar-title bg-transparent font-size-20">
                                                <i className="ri-close-fill"></i>
                                            </span>
                                        </button>
                                    </li>
                                    <li className="list-inline-item px-2">
                                        <button type="button" className="btn btn-success avatar-sm rounded-circle">
                                            <span className="avatar-title bg-transparent font-size-20">
                                                <i className="ri-phone-fill"></i>
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>                        
                </div>
            </div>
        </div>
        {/* audiocall Modal */}

        {/* videocall Modal */}
        <div className="modal fade" id="videocallModal" tabindex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="text-center p-4">
                            <div className="avatar-lg mx-auto mb-4">
                                <img src="assets/images/users/avatar-4.jpg" alt="" className="img-thumbnail rounded-circle"/>
                            </div>

                            <h5 className="text-truncate">Doris Brown</h5>
                            <p className="text-muted mb-0">Start Video Call</p>

                            <div className="mt-5">
                                <ul className="list-inline mb-1">
                                    <li className="list-inline-item px-2 me-2 ms-0">
                                        <button type="button" className="btn btn-danger avatar-sm rounded-circle" data-bs-dismiss="modal">
                                            <span className="avatar-title bg-transparent font-size-20">
                                                <i className="ri-close-fill"></i>
                                            </span>
                                        </button>
                                    </li>
                                    <li className="list-inline-item px-2">
                                        <button type="button" className="btn btn-success avatar-sm rounded-circle">
                                            <span className="avatar-title bg-transparent font-size-20">
                                                <i className="ri-vidicon-fill"></i>
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    </div>
    </SoftBox>
  </Card>
  );
}

export default Message;
