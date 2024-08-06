import { React, useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import callFetch from "../../helpers/callFetch";
import LastMessage from "./LastMessage";
function ChatSendMessage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [recipients, setRecipients] = useState([]);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('asdfsdfas');
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const renderList = () => {
    return users.map((data) => ({ value: data.id, label: data.name }));
  };

  const handleChange = () => {

  }

  useEffect(() => {
    callFetch("chat/users", "GET", []).then((res) => {
      setUsers(res.data);
    });
  }, []);

  const [participations, setParticipations] = useState([]);
  useEffect(() => {
  callFetch("chat-participation", "GET", []).then((res) => {
    //   console.log(res.contacts);
      setParticipations(res.contacts);
  });
  }, []);

  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("message-sent/"+getValues('recipients')+'?toast=false', "POST", formData, setError).then((res) => { 
      setSaving(false);
      setSubmitSuccess(true);

      let recipients = JSON.parse(formData.recipients);
      if(recipients.length){
        navigate('/chat/message/'+recipients[0].value);
      }else{
        navigate('/chat');
      }
    }); 
};

  return (
    <Card>
        <SoftBox>
        <div className="layout-wrapper d-lg-flex">  
    <div className="chat-leftsidebar me-lg-1 ms-lg-0" style={{backgroundColor: '#fff'}}>

        <div className="tab-content"> 
            <div className="tab-pane" id="pills-user" role="tabpanel" aria-labelledby="pills-user-tab">
                
                <div>
                    <div className="px-4 pt-4">
                        <div className="user-chat-nav float-end">
                            <div className="dropdown">
                                <a href="#" className="font-size-18 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ri-more-2-fill"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <a className="dropdown-item" href="#">Edit</a>
                                    <a className="dropdown-item" href="#">Action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Another action</a>
                                </div>
                            </div>
                        </div>
                        <h4 className="mb-0">My Profile</h4>
                    </div>

                    <div className="text-center p-4 border-bottom">
                        <div className="mb-4">
                            <img src="assets/images/users/avatar-1.jpg" className="rounded-circle avatar-lg img-thumbnail" alt=""/>
                        </div>

                        <h5 className="font-size-16 mb-1 text-truncate">Patricia Smith</h5>
                        <p className="text-muted text-truncate mb-1"><i className="ri-record-circle-fill font-size-10 text-success me-1 ms-0 d-inline-block"></i> Active</p>
                    </div> 
 
                    <div className="p-4 user-profile-desc" data-simplebar>
                        <div className="text-muted">
                            <p className="mb-4">If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
                        </div>


                        <div id="tabprofile" className="accordion">
                            <div className="accordion-item card border mb-2">
                                <div className="accordion-header" id="about2">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#about" aria-expanded="true" aria-controls="about">
                                        <h5 className="font-size-14 m-0">
                                            <i className="ri-user-2-line me-2 ms-0 ms-0 align-middle d-inline-block"></i> About
                                        </h5>
                                    </button>
                                </div>
                                <div id="about" className="accordion-collapse collapse show" aria-labelledby="about2" data-bs-parent="#tabprofile">
                                    <div className="accordion-body">
                                        <div>
                                            <p className="text-muted mb-1">Name</p>
                                            <h5 className="font-size-14">Patricia Smith</h5>
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

                            <div className="card accordion-item border">
                                <div className="accordion-header" id="attachfile2">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#attachfile" aria-expanded="false" aria-controls="attachfile">
                                        <h5 className="font-size-14 m-0">
                                            <i className="ri-attachment-line me-2 ms-0 ms-0 align-middle d-inline-block"></i> Attached Files
                                        </h5>
                                    </button>
                                </div>
                                <div id="attachfile" className="accordion-collapse collapse" aria-labelledby="attachfile2" data-bs-parent="#tabprofile">
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
                                                        <h5 className="font-size-14 mb-1">Admin-A.zip</h5>
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
                        </div> 

                    </div> 
                </div> 
            </div> 
 
            <div className="tab-pane fade show active" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab">
           
                <div>
                    <div className="px-4 pt-4">
                        <h4 className="mb-4" style={{position: 'relative'}}>{t('Message')}   <NavLink to={'/chat/send-message'} className="btn btn-primary" style={{position: 'absolute', right: '0px', fontSize: '12px', padding: '8px'}}>{t('New Message')}</NavLink></h4>
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

                                    <h5 className="font-size-13 text-truncate mt-3 mb-1">Patrick</h5>
                                </a>
                            </div>
                            <div className="item">
                                <a href="#" className="user-status-box">
                                    <div className="avatar-xs mx-auto d-block chat-user-img online">
                                        <img src="assets/images/users/avatar-4.jpg" alt="user-img" className="img-fluid rounded-circle"/>
                                        <span className="user-status"></span>
                                    </div>

                                    <h5 className="font-size-13 text-truncate mt-3 mb-1">Doris</h5>
                                </a>
                            </div>

                            <div className="item">
                                <a href="#" className="user-status-box">
                                    <div className="avatar-xs mx-auto d-block chat-user-img online">
                                        <img src="assets/images/users/avatar-5.jpg" alt="user-img" className="img-fluid rounded-circle"/>
                                        <span className="user-status"></span>
                                    </div>

                                    <h5 className="font-size-13 text-truncate mt-3 mb-1">Emily</h5>
                                </a>
                            </div>

                            <div className="item">
                                <a href="#" className="user-status-box">
                                    <div className="avatar-xs mx-auto d-block chat-user-img online">
                                        <img src="assets/images/users/avatar-6.jpg" alt="user-img" className="img-fluid rounded-circle"/>
                                        <span className="user-status"></span>
                                    </div>

                                    <h5 className="font-size-13 text-truncate mt-3 mb-1">Steve</h5>
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

                                    <h5 className="font-size-13 text-truncate mt-3 mb-1">Teresa</h5>
                                </a>
                            </div>
    
                        </div> 
                    </div> 
 
                    <div>
                        <h5 className="mb-3 px-3 font-size-16">{t('Recent')}</h5>

                        <div className="chat-message-list px-2" data-simplebar>
    
                            <ul className="list-unstyled chat-list chat-user-list">
                                {participations.map((user) => (
                                    <li>
                                        <NavLink to={'/chat/message/'+user.id}>
                                            <div className="d-flex">                            
                                                <div className="chat-user-img online align-self-center me-3 ms-0">
                                                    <img src="https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg" className="rounded-circle avatar-xs" alt=""/>
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
                                            </div>
                                        </NavLink>
                                    </li>
                                ))}

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
    <div className="user-chat w-100 overflow-hidden">
        <div className="d-lg-flex">

            {/* start chat conversation section */}
            <div className="w-100 overflow-hidden position-relative"> 
                {/* start chat conversation */}
                <div className="chat-conversation p-3 p-lg-4" data-simplebar="init"> 
                  <form onSubmit={handleSubmit(onSubmit)}> 
                        <SoftBox pb={3} pt={2} px={3}>
                          <div className="col-md-12"> 
                            <div className="form-group">
                              <Select
                                noOptionsMessage={() => t('No Options')}
                                placeholder={t('Select...')}
                                options={renderList()}
                                value={recipients}
                                onChange={(e)=>{
                                  setRecipients(e);
                                  setValue('recipients', JSON.stringify(e));
                                }}
                                isMulti
                              />
                              <div className="invalid-feedback"></div>
                            </div>
                            {/* {recipients.map((recipient) => (
                              <input type="hidden" {...register('receiver')} value={recipient.value} />
                            ))}  */}
                            <div className="form-group">
                              <SoftInput placeholder={t("Type here...")} onChange={(e) => setMessage(e.target.value)} multiline rows={5} {...register('message')}/>
                            </div>

                            <div className="row g-3">
                              <div className="col-12 my-4">
                                {!saving && (
                                  <button type="submit" className="btn btn-primary">
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
                          </div>
                        </SoftBox> 
                      </form>
                </div>
                {/* end chat conversation end */} 
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

                    <h5 className="font-size-16 mb-1 text-truncate">Doris Brown</h5>
                    <p className="text-muted text-truncate mb-1"><i className="ri-record-circle-fill font-size-10 text-success me-1 ms-0"></i> Active</p>
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

export default ChatSendMessage;

