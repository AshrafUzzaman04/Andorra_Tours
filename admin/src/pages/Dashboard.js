import { useMemo, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import dateFormat, { masks } from "dateformat";
import { useForm } from "react-hook-form";
import { Navigate, NavLink, useNavigate, withRouter } from "react-router-dom";
import Cookies from 'js-cookie';

// Soft UI Dashboard PRO React components
import SoftDropzone from "components/SoftDropzone";

import Calendar from "examples/Calendar";
import flatpickr from "flatpickr";
import callFetch from "helpers/callFetch";
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import PaidIcon from '@mui/icons-material/Paid';
import AddIcon from '@mui/icons-material/Add';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";


// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Globe from "examples/Globe";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";
import breakpoints from "assets/theme/base/breakpoints";

// Data
import reportsBarChartData from "layouts/dashboards/default/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboards/default/data/gradientLineChartData";
import { Card } from '@mui/material';
import Cards from './Dashboard/Cards';

import Map from './hr/employee/Map';
import { Country, State, City } from 'country-state-city';

import Select from 'react-select';

import ProjectTable from './Dashboard/ProjectTable';

import CustomerDashboard from './Dashboard/CustomerDashboard';
import useEcho from "hooks/echo";

function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const echo  = useEcho();
  const [user, setUser] = useState(JSON.parse(Cookies.get('user')));
  const [attachments, setAttachment] = useState([]);
  const [calendarEventsData, setCalendarEventsData] = useState([]);
  const [initialDate, setInitialDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [saving, setSaving] = useState(false);
  const [formdata, setFormdata] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [data, setData] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);

  const [customers, setCustomers] = useState()
  const TargetCity = City.getCitiesOfCountry("BD");
  const city = TargetCity.find(item => item.name === "Jessore");

  const [options, setOptions] = useState([]);
  const [optionsSelected, setOptionsSelected] = useState([]);
  const [employeeIds, setEmployeeIds] = useState('');

  const [isUpdate, setIsUpdate] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const toggle = () => {
    setModal(modal);
  };
  useEffect(()=>{
    if(echo){
      echo.private(`chat.${user?.id}`).listen('MessageSent',(event)=>{
        console.log("Real Time Event Received",event)
      })
    }
  },[])
  function doSignout(e) {
    e.preventDefault();
    callFetch('signout', 'POST', [], null).then(res => {
      Cookies.remove('user');
      Cookies.remove('token');
      var newTabClose = document.getElementById('newTabClose');
      newTabClose.click();
    });
  }

  const handeleAttachment = (newData) => {
    let data = attachments;
    data[attachments.length] = newData;
    setAttachment(data);
    setValue('file', JSON.stringify(data));
    //console.log(attachments);
  }

  const removeAttachment = (id) => {
    const beforeRemove = attachments;
    const afterRemove = beforeRemove.filter(value => {
      return value.id != id;
    });
    setAttachment(afterRemove);
    setValue('file', JSON.stringify(afterRemove));
  }

  const handleEventClick = ({ event, el }) => {
    callFetch("project-event/" + event.id, "GET", []).then((res) => {

      for (let [key, value] of Object.entries(res.data)) {
        if (key != 'users') {
          setValue(key, value);
        }
      }

      let employeeOptions = [];
      let os = [];
      let employeeSelectedIds = '0';
      res.employees.map((employee) => {
        employeeOptions.push({ 'value': employee.user.id, 'label': employee.user.name });
        if (res.selected_employees.indexOf(employee.user.id) !== -1) {
          os.push({ 'value': employee.user.id, 'label': employee.user.name });
          employeeSelectedIds += '-' + employee.user.id;
        }
      });
      setOptions(employeeOptions);
      setOptionsSelected(os);
      setEmployeeIds(employeeSelectedIds);

      const modalInfo = {
        'title': res.data.name,
        'id': event.id,
        'identity_number': res.data.identity_number,
        'salse_person': res.data.users,
        'start': res.data.start_date,
        'start_date': res.data.start_date,
        'start_time': res.data.start_time,
        'end_time': res.data.end_time,
        'creator': res.data.creator,
        'quotation_id': res.data.quotation_id,
        'status': res.data.status,
        'quotation': res.data.quotation,
        'attachments': JSON.parse(res.data.attachments && res.data.attachments != 'null' ? res.data.attachments : '[]'),
      };
      setModalData(modalInfo);
      setIsUpdate(false);
      var calanderDataOpen = document.getElementById('calanderDataOpen');
      calanderDataOpen.click();
    });
  };

  const handleEventEditClick = (id) => {

    var projectInfoModalClose = document.getElementById('projectInfoModalClose');
    projectInfoModalClose.click();
    var eventEditModal = document.getElementById('eventEditModalOpen');
    eventEditModal.click();

  }

  useEffect(() => {
    callFetch("projects/calendar-events", "GET", []).then((res) => {
      setCalendarEventsData(res.data);
      setInitialDate(res.initialDate);
    });
  }, [isUpdate]);


  useEffect(() => {
    flatpickr(".flat-pickr");

    callFetch("dashboard", "GET", []).then((res) => {
      setDashboardData(res.data);
    });


    callFetch("projects/create", "GET", []).then((res) => {
      setData(res.data);
    });

    callFetch("all-customer", "GET", []).then((res) => {
      setCustomers(res.data)
    })
  }, []);

  const handleDeleteEvent = () => {
    callFetch("delete-project-event/" + modalData.id, "GET", []).then((res) => {
      var projectInfoModalClose = document.getElementById('eventModalClose');
      projectInfoModalClose.click();
      setIsUpdate(true);
    });
  }


  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("update-project-event/" + modalData.id, "POST", formData, setError).then((res) => {
      setSaving(false);
      setIsUpdate(true);
      if (modalData.id) {
        setProjectId(modalData.id);
      }
      if (!res.ok) return;
      var eventModalClose = document.getElementById('eventModalClose');
      eventModalClose.click();
    });
  };

  const handleRedirectToEditProject = () => {
    var projectInfoModalClose = document.getElementById('projectInfoModalClose');
    var projectInfoModalCloseSecond = document.getElementById('projectInfoModalCloseSecond');
    projectInfoModalClose.click();
    projectInfoModalCloseSecond.click();
    return <Navigate to={'/project-management'} />
  }

  const dropZoneInitialize = (name = 'files') => {
    return (
      <SoftDropzone
        key={'dfdf'}
        options={{
          dictDefaultMessage: t('Drop files here to upload'),
          acceptedFiles: ".jpeg,.jpg,.png",
          action: process.env.REACT_APP_API_URL + 'attachment',
          headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + Cookies.get('token')
          },
          success: (file, response) => {
            if (response.message == 'success') {
              handeleAttachment(response.data);
            }
          },
          maxfilesexceeded: function (file) {
            this.removeAllFiles();
            this.addFile(file);
          }
        }}
      />
    )
  }
  const { values } = breakpoints;
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const TableData = [
    {
      "Project": "KRS-01",
      Employee: "Super Admin",
      "Start": "19.09.2022",
      "End": "18.09.2022",

    },
    {
      "Project": "KRS-02",
      Employee: "Taha",
      "Start": "12.08.2022",
      "End": "14.08.2022",
    },
  ];


  useEffect(() => {
    document.title = "TOURS ANDORRA";
  }, []);

  return (
    <>
      {/* {Cookies.get('permissions').indexOf("Customer Dashboard") !== -1 ? (
        <CustomerDashboard/>
      ) : <></>} */}
      <SoftBox py={3}>
        <Grid container>
          <Grid item xs={12} lg={7}>
            <SoftBox mb={3} p={1}>
              <SoftTypography
                variant={window.innerWidth < values.sm ? "h3" : "h2"}
                textTransform="capitalize"
                fontWeight="bold"
              >
                {t('Dashboard')}
              </SoftTypography>
            </SoftBox>

            <Grid container>
              <Grid item xs={12}>
                {/* <Globe
                    display={{ xs: "none", md: "block" }}
                    position="absolute"
                    top="10%"
                    right="47%"
                    mt={{ xs: -12, lg: 1 }}
                    mr={{ xs: 0, lg: 10 }}
                    canvasStyle={{ marginTop: "3rem" }}
                  /> */}
              </Grid>
            </Grid>


            <Grid container spacing={3}>
              <Grid item xs={12} sm={5}>
                <SoftBox mb={3}>
                  <Cards
                    title={t('Orders')}
                    count={dashboardData?.overview ? dashboardData?.overview.orders_amount : 0}
                    icon="paid"
                    currency="€"
                  />
                </SoftBox>


                <Cards
                  title={t('Open Projects')}
                  count={dashboardData?.overview ? dashboardData?.overview?.total_project : 0}
                  icon="public"
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <SoftBox mb={3}>
                  <Cards
                    title={t('Quotations')}
                    count={dashboardData?.overview ? dashboardData?.overview?.quotations_amount : 0}
                    icon="emoji_event"
                    currency="€"
                  />
                </SoftBox>
                <SoftBox mb={3}>
                  <Card>
                    <SoftBox backgroundColor="#fff" variant="gradient">
                      <SoftBox opacity={.6} className="cursor-pointer" p={2.5} data-bs-toggle="modal" data-bs-target="#newTabModal">
                        <SoftBox
                          variant="gradient"
                          color="dark"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <AddIcon />
                        </SoftBox>
                        <small className='d-flex align-items-center justify-content-center font-weight-bold' >{t('New')}</small>
                      </SoftBox>
                    </SoftBox>
                  </Card>
                </SoftBox>
              </Grid>
            </Grid>
          </Grid>

          {/* Custom Card */}
          {/* Custom Card edn from here */}
          <Grid item xs={12} md={10} lg={7}>
            <Grid item xs={12} lg={10}>
              <SoftBox mb={3} position="relative">
                <TableContainer sx={{ height: "100%" }}>
                  <Table>
                    <TableHead>
                      <SoftBox component="tr" width="max-content" display="block" mb={1.5}>
                        <SoftTypography variant="h6" component="td">
                          {t('Projects')}
                        </SoftTypography>
                      </SoftBox>
                    </TableHead>
                    <TableBody>

                      {dashboardData?.projects ?
                        dashboardData?.projects?.map((project, index) => (
                          <TableRow key={index}>
                            <TableCell align="center" sx={{ border: 0 }}>
                              <SoftBox display="flex" flexDirection="column">
                                <SoftTypography
                                  variant="caption"
                                  color="text"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                  align="right"
                                >
                                  {t('Project')}:
                                </SoftTypography>
                                <SoftTypography align="right" variant="button" fontWeight="medium" textTransform="capitalize">
                                  <NavLink to={'/project-management/projects/' + project?.id}><u>{project?.identity_number}</u></NavLink>
                                </SoftTypography>
                              </SoftBox>
                            </TableCell>

                            <TableCell align="center" sx={{ border: 0 }}>
                              <SoftBox display="flex" flexDirection="column">
                                <SoftTypography
                                  variant="caption"
                                  color="text"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                  align="right"
                                >
                                  {t('Employee')}:
                                </SoftTypography>
                                <SoftTypography align="right" variant="button" fontWeight="medium" textTransform="capitalize">
                                  {project?.users ? (project?.users.map(function (user, i) {
                                    return <>{(i ? ', ' : '') + user.name}</>
                                  })) : ''}
                                </SoftTypography>
                              </SoftBox>
                            </TableCell>

                            <TableCell align="center" sx={{ border: 0 }}>
                              <SoftBox display="flex" flexDirection="column">
                                <SoftTypography
                                  variant="caption"
                                  color="text"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                  align="right"
                                >
                                  {t('Start')}:
                                </SoftTypography>
                                <SoftTypography align="right" variant="button" fontWeight="medium" textTransform="capitalize">
                                  {dateFormat(project?.start_date, "dd.mm.yyyy")}
                                </SoftTypography>
                              </SoftBox>
                            </TableCell>

                            <TableCell align="center" sx={{ border: 0 }}>
                              <SoftBox display="flex" flexDirection="column">
                                <SoftTypography
                                  variant="caption"
                                  color="text"
                                  fontWeight="medium"
                                  textTransform="capitalize"
                                  align="right"
                                >
                                  {t('End')}:
                                </SoftTypography>
                                <SoftTypography align="right" variant="button" fontWeight="medium" textTransform="capitalize">
                                  {dateFormat(project?.end_date, "dd.mm.yyyy")}
                                </SoftTypography>
                              </SoftBox>
                            </TableCell>
                          </TableRow>
                        )) : <></>}

                    </TableBody>
                  </Table>
                </TableContainer>

                {/*
                    <SalesTable title={t('Projects')} rows={TableData} />
                  */}
              </SoftBox>
            </Grid>
          </Grid>
        </Grid>
      </SoftBox>


      <div className="row">
        <div className="col-md-12">
          <Grid item xs={12}>
            <SoftBox mt={3} className="fullcalanderCustomDesign">
              <Calendar
                initialView="dayGridMonth"
                views={{
                  dayGridMonth: {
                    dayMaxEventRows: 4,
                  },
                  timeGridWeek: {
                    dayMaxEventRows: 4,
                  }
                }}
                initialDate={initialDate}
                eventDisplay={"auto"}
                events={calendarEventsData}
                eventClick={(e) => { handleEventClick(e) }}
                selectable
                editable
                buttonText={{
                  today: t('today'),
                  day: t('day'),
                  week: t('week'),
                  month: t('month'),
                  list: t('list'),
                }}
                dayHeaderContent={(arg) => {
                  return [t('Sun'), t('Mon'), t('Tue'), t('Wed'), t('Thu'), t('Fri'), t('Sat')][arg.date.getDay()]
                }}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                locale={"de"}
                eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
              />
            </SoftBox>
          </Grid>
        </div>
      </div>


      <div className="row mt-3">
        <div className="col-md-12">
          <div className='card' >
            <div className=' card-body'>
              <Map area={customers} info={data} />
            </div>
          </div>
        </div>
      </div>


      <button type="button" id="calanderDataOpen" className="btn bg-gradient-primary d-none" data-bs-toggle="modal" data-bs-target="#calanderModal">View Calander Click Event Data</button>
      <button type="button" id="calanderDataOpenAssignOrder" className="btn bg-gradient-primary d-none" data-bs-toggle="modal" data-bs-target="#calanderModalAssingOrder">View Calander Click Event Data</button>
      {/*
          <div className="modal fade" id="calanderModal" tabindex="-1" role="dialog" aria-labelledby="calanderModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="calanderModalLabel">Project Infos</h5>
                  <button type="button" className="btn-close text-dark" id="projectInfoModalClose" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <SoftTypography onClick={handleRedirectToEditProject} variant="caption" gutterBottom color="text">
                    Project Nr: {modalData.identity_number ? modalData.identity_number : ''}
                  </SoftTypography>
                  {modalData && modalData.salse_person && modalData.salse_person.map((employee) => (
                    <><br/><SoftTypography variant="caption" color="text">Name: {employee.name}</SoftTypography></>
                  ))}
                  <br/><SoftTypography variant="caption" color="text">Time: {modalData.start ? modalData.start : ''}</SoftTypography>
                  <br/><SoftTypography variant="caption" color="text">Adress: {t('Straße')}: </SoftTypography> 
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn bg-gradient-default btn-start" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                  <button type="button" className="btn bg-gradient-primary btn-start" onClick={ () => handleEventEditClick(modalData.id)}>Edit</button>
                </div>
              </div>
            </div>
          </div>
        */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal fade" id="calanderModal" tabindex="-1" role="dialog" aria-labelledby="calanderModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title" id="calanderModalLabel" style={{ fontWeight: 'bold' }}>{t('Project Infos')}</h6>
                <button type="button" className="btn-close text-dark" id="projectInfoModalClose" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h6 className="modal-title" style={{ fontWeight: 'bold' }}>{modalData.title ? modalData.title : ''} - {t('Project Nr')}: {getValues('identity_number')}</h6>
                <div style={{ marginBottom: '35px' }}>
                  <p className="m-0" style={{ fontSize: '12px' }}> {t('Start Date & Time')}:  {getValues('start_date')} - {dateFormat(getValues('start_date'), "dd.mm.yyyy")} </p>
                </div>
                <ul className="nav nav-tabs mt-3" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button style={{ fontSize: '0.75rem' }} className="nav-link active" id="home1-tab" data-bs-toggle="tab" data-bs-target="#home1-tab-pane" type="button" role="tab" aria-controls="home1-tab-pane" aria-selected="true">{t('Ereignisdetails')}</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button style={{ fontSize: '0.75rem' }} className="nav-link" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc-tab-pane" type="button" role="tab" aria-controls="desc-tab-pane" aria-selected="false">{t('Beschreibung')}</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button style={{ fontSize: '0.75rem' }} className="nav-link" id="project1-status" data-bs-toggle="tab" data-bs-target="#project1-status-pane" type="button" role="tab" aria-controls="project1-status-pane" aria-selected="false">{t('Project Status')}</button>
                  </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active pt-3" style={{ minHeight: '230.5px' }} id="home1-tab-pane" role="tabpanel" aria-labelledby="home1-tab" tabindex="0">
                    <table className="mt-3 mb-5">
                      <tr style={{ lineHeight: '0px' }}>
                        <td width="100"><SoftTypography variant="caption" fontWeight="bold" color="text">{t('Project Nr')}:</SoftTypography></td>
                        <td>
                          <NavLink to={'/project-management/projects/' + getValues('id')} data-bs-dismiss="modal" style={{ textDecoration: '1px solid' }}><SoftTypography style={{ textDecoration: 'underline', color: '#005498' }} variant="caption" color="text">{getValues('identity_number')}</SoftTypography></NavLink>
                        </td>
                      </tr>

                      <tr style={{ lineHeight: '0px' }}>
                        <td><SoftTypography variant="caption" fontWeight="bold" color="text">{t('Name')}:</SoftTypography></td>
                        <td>
                          <SoftTypography variant="caption" color="text">
                            {modalData?.salse_person ? (modalData?.salse_person.map(function (salseperson, i) {
                              return <>{(i ? ', ' : '') + salseperson?.name}</>
                            })) : ''}
                          </SoftTypography>
                        </td>
                      </tr>

                      <tr style={{ lineHeight: '0px' }}>
                        <td><SoftTypography variant="caption" fontWeight="bold" color="text">{t('Start Date')}: </SoftTypography></td>
                        <td><SoftTypography variant="caption" color="text"> {getValues('start_time')} - {dateFormat(getValues('start_date'), "dd.mm.yyyy")}</SoftTypography></td>
                      </tr>

                      <tr style={{ lineHeight: '0px' }}>
                        <td><SoftTypography variant="caption" fontWeight="bold" color="text">{t('End Date')}: </SoftTypography></td>
                        <td><SoftTypography variant="caption" color="text"> {getValues('end_time')} - {dateFormat(getValues('end_date'), "dd.mm.yyyy")}</SoftTypography></td>
                      </tr>

                      <br />

                      <tr>
                        <td colSpan="2">
                          <SoftTypography variant="caption" fontWeight="bold" color="text" style={{ fontSize: '0.75rem', color: '#2D3748' }}>{t('Client Information')}:</SoftTypography> <br />
                        </td>
                      </tr>

                      <tr style={{ lineHeight: '0px' }}>
                        <td><SoftTypography variant="caption" fontWeight="bold" color="text">{t('Name')}:</SoftTypography></td>
                        <td><SoftTypography variant="caption" color="text">{modalData?.quotation ? modalData?.quotation?.customer?.name : ''}</SoftTypography></td>
                      </tr>

                      <tr style={{ lineHeight: '0px' }}>
                        <td><SoftTypography variant="caption" fontWeight="bold" color="text">{t('Address')}:</SoftTypography></td>
                        <td><SoftTypography variant="caption" color="text">{modalData && modalData?.quotation && modalData?.quotation?.customer?.street}</SoftTypography></td>
                      </tr>

                      <tr style={{ lineHeight: '0px' }}>
                        <td><SoftTypography variant="caption" fontWeight="bold" color="text">{t('PLZ und Ort')}:</SoftTypography></td>
                        <td><SoftTypography variant="caption" color="text">{modalData && modalData?.quotation ? modalData?.quotation?.customer?.zip_code + ', ' + modalData?.quotation?.customer?.city : ''}</SoftTypography></td>
                      </tr>

                      <tr style={{ lineHeight: '0px' }}>
                        <td><SoftTypography variant="caption" fontWeight="bold" color="text">{t('Phone')}:</SoftTypography></td>
                        <td><SoftTypography variant="caption" color="text">{modalData?.quotation ? modalData?.quotation?.customer?.phone : ''}</SoftTypography></td>
                      </tr>
                    </table>
                  </div>

                  <div className="tab-pane fade pt-4" style={{ minHeight: '230.5px' }} id="desc-tab-pane" role="tabpanel" aria-labelledby="desc-tab" tabindex="0">
                    <SoftTypography variant="caption" fontWeight="bold" color="text" style={{ fontSize: '0.75rem', color: '#2D3748' }}>{t('Project Description')}:</SoftTypography> <br />
                    {/* <SoftTypography variant="caption" color="text">{modalData.desc}</SoftTypography> */}

                    <div className="row">
                      <div className="col-12">
                        <SoftTypography variant="p" color="text" style={{ fontSize: '12px', display: 'block', color: '#2D3748', marginTop: '15px', marginBottom: '15px' }}>{getValues('description') ? getValues('description') : ''}</SoftTypography>
                      </div>
                      <div className="col-12">
                        <SoftBox className="modal-attchments">
                          <Grid container spacing={3} className="modal-attchments-grid">
                            {modalData?.attachments ? modalData?.attachments?.map(function (data, i) {
                              return (
                                <Grid item key={i} className="text-center p-1">
                                  <div>
                                    <a target="_blank" download href={process.env.REACT_APP_STORAGE_URL + 'storage/attachments/' + data?.attachment}>
                                      <img src={process.env.REACT_APP_STORAGE_URL + 'storage/attachments/' + data?.attachment} />
                                    </a>
                                  </div>
                                </Grid>
                              );
                            }) : <><Grid></Grid></>}
                          </Grid>
                        </SoftBox>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade pt-4" style={{ minHeight: '230.5px' }} id="project1-status-pane" role="tabpanel" aria-labelledby="project1-status" tabindex="0">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>{t('Project Status')}</label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            let formData = new FormData();
                            formData.status = e.target.value;
                            formData.id = modalData.id;
                            callFetch("projects-status", "POST", formData, setError).then((res) => {
                              console.log(res);
                            });
                          }}
                        >
                          <option selected={modalData && modalData?.status == 'In Progress' ? 'selected' : ''} value="In Progress">{t('In Progress')}</option>
                          <option selected={modalData && modalData?.status == 'Done' ? 'selected' : ''} value="Done">{t('Done')}</option>
                        </select>
                        <div className="invalid-feedback">{errors.status && errors.status.message}</div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label>{t('Project Status Description')}</label>
                        <textarea {...register("status_description", {
                          required: true,
                        })} className="form-control" style={{ fontSize: '0.75rem' }}></textarea>
                        <div className="invalid-feedback">{errors.status && errors.status.message}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn bg-gradient-default btn-start" data-bs-dismiss="modal" aria-label="Close">{t('Cancel')}</button>
                {!saving && (
                  <button type="submit" style={{ textTransform: 'capitalize', padding: '0.50rem 2rem' }} className="btn bg-gradient-primary btn-start mt-2">
                    {t('Save')}
                  </button>
                )}
                {saving && (
                  <button type="submit" style={{ textTransform: 'capitalize', padding: '0.50rem 2rem' }} className="btn btn-disabled mt-2" disabled>
                    {t('Saving ...')}
                  </button>
                )}
                {/*<button type="button" className="btn bg-gradient-primary btn-start" onClick={ () => handleEventEditClick(modalData.id)}>Edit</button>*/}
              </div>
            </div>
          </div>
        </div>
      </form>




      <button type="button" id="eventEditModalOpen" className="btn bg-gradient-primary d-none" data-bs-toggle="modal" data-bs-target="#eventEditModal">View Calander Click Event Data</button>
      <div className="modal fade" id="eventEditModal" tabindex="-1" role="dialog" aria-labelledby="eventEditModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-header">
                <h5 className="modal-title" id="eventEditModalLabel">{t('Edit Event')}</h5>
                <button type="button" id="eventModalClose" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="m-0">{getValues('code')} - {modalData.title ? modalData.title : ''} - {t('Project Nr')}: {modalData.id ? modalData.id : ''}</p>
                <div className="row mt-3">
                  <div className="col-md-4">{t('Start Date & Time')}</div>
                  <div className="col-md-4">
                    <input type="date" className="form-control" {...register('start_date')} />
                  </div>

                  <div className="col-md-4">
                    <select className="form-control" {...register("start_time", { required: true, })} required>
                      <option value={"24:00"}>24:00 Uhr</option>
                      <option value={"01:00"}>01:00 Uhr</option>
                      <option value={"02:00"}>02:00 Uhr</option>
                      <option value={"03:00"}>03:00 Uhr</option>
                      <option value={"04:00"}>04:00 Uhr</option>
                      <option value={"05:00"}>05:00 Uhr</option>
                      <option value={"06:00"}>06:00 Uhr</option>
                      <option value={"07:00"}>07:00 Uhr</option>
                      <option value={"08:00"}>08:00 Uhr</option>
                      <option value={"09:00"}>09:00 Uhr</option>
                      <option value={"10:00"}>10:00 Uhr</option>
                      <option value={"11:00"}>11:00 Uhr</option>
                      <option value={"12:00"}>12:00 Uhr</option>
                      <option value={"13:00"}>13:00 Uhr</option>
                      <option value={"14:00"}>14:00 Uhr</option>
                      <option value={"15:00"}>15:00 Uhr</option>
                      <option value={"16:00"}>16:00 Uhr</option>
                      <option value={"17:00"}>17:00 Uhr</option>
                      <option value={"18:00"}>18:00 Uhr</option>
                      <option value={"19:00"}>19:00 Uhr</option>
                      <option value={"20:00"}>20:00 Uhr</option>
                      <option value={"21:00"}>21:00 Uhr</option>
                      <option value={"22:00"}>22:00 Uhr</option>
                      <option value={"23:00"}>23:00 Uhr</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">End Date & Time</div>
                  <div className="col-md-4">
                    <input type="date" className="form-control" {...register('end_date')} />
                  </div>

                  <div className="col-md-4">
                    <select className="form-control" {...register("end_time", { required: true, })} required>
                      <option value={"24:00"}>24:00 Uhr</option>
                      <option value={"01:00"}>01:00 Uhr</option>
                      <option value={"02:00"}>02:00 Uhr</option>
                      <option value={"03:00"}>03:00 Uhr</option>
                      <option value={"04:00"}>04:00 Uhr</option>
                      <option value={"05:00"}>05:00 Uhr</option>
                      <option value={"06:00"}>06:00 Uhr</option>
                      <option value={"07:00"}>07:00 Uhr</option>
                      <option value={"08:00"}>08:00 Uhr</option>
                      <option value={"09:00"}>09:00 Uhr</option>
                      <option value={"10:00"}>10:00 Uhr</option>
                      <option value={"11:00"}>11:00 Uhr</option>
                      <option value={"12:00"}>12:00 Uhr</option>
                      <option value={"13:00"}>13:00 Uhr</option>
                      <option value={"14:00"}>14:00 Uhr</option>
                      <option value={"15:00"}>15:00 Uhr</option>
                      <option value={"16:00"}>16:00 Uhr</option>
                      <option value={"17:00"}>17:00 Uhr</option>
                      <option value={"18:00"}>18:00 Uhr</option>
                      <option value={"19:00"}>19:00 Uhr</option>
                      <option value={"20:00"}>20:00 Uhr</option>
                      <option value={"21:00"}>21:00 Uhr</option>
                      <option value={"22:00"}>22:00 Uhr</option>
                      <option value={"23:00"}>23:00 Uhr</option>
                    </select>
                  </div>
                </div>

                <ul className="nav nav-tabs mt-3" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Ereignisdetails</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Beschreibung</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">{t('Checklist')}</button>
                  </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active pt-3" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                    <div className="row ">
                      <div className="col-md-3">
                        <label>{t('Project Creator Name ')}</label>
                      </div>
                      <div className="col-md-9">{modalData.creator ? modalData.creator.name : ''}</div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-3">
                        <label>{t('Project Employee')}</label>
                      </div>
                      <div className="col-md-9">
                        <div className="form-group">
                          <Select noOptionsMessage={() => t('No Options')} placeholder={t('Select...')} getStyles="form-control" isMulti={true} options={options} value={optionsSelected} onChange={(selectedOptions) => {
                            let ids = '0';
                            let os = [];
                            selectedOptions.map((op) => {
                              ids += '-' + op.value;
                              os.push({ 'value': op.value, 'label': op.label });
                            });
                            setEmployeeIds(ids);
                            setOptionsSelected(os);
                          }} />
                          <div className="invalid-feedback">{errors.employee_ids && errors.employee_ids.message}</div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-3">
                        <label>{t('Quotation Nr. ')}</label>
                      </div>
                      <div className="col-md-9">{modalData.quotation_id ? modalData.quotation_id : ''}</div>
                    </div>

                    

                    <div className="row mt-2">
                      <div className="col-sm-3">
                        <label for="file">{t('Upload Files')}</label>
                      </div>
                      <div className="col-sm-9">
                        {/* <input type="file" id="file" className="form-control" {...register('file') }/> */}

                        <SoftBox
                          display="flex"
                          flexDirection="column"
                          justifyContent="flex-end"
                          height="100%"
                        >
                          {dropZoneInitialize()}

                        </SoftBox>
                      </div>
                    </div>

                    <SoftBox p={3} className="order-processing">
                      <Grid container spacing={3}>
                        {attachments ? attachments.map(function (data, i) {
                          return (
                            <Grid item key={i} className="text-center">
                              <div>
                                <a target="_blank" download href={process.env.REACT_APP_STORAGE_URL + 'storage/attachments/' + data?.attachment}>
                                  <img src={process.env.REACT_APP_STORAGE_URL + 'storage/attachments/' + data.attachment} />
                                </a>
                              </div>
                              <a onClick={() => { removeAttachment(data.id) }}>Remove</a>
                            </Grid>
                          );
                        }) : <><Grid></Grid></>}
                      </Grid>
                    </SoftBox>
                  </div>
                  <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">...</div>
                  <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">...</div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn bg-gradient-danger btn-start" style={{ position: 'absolute', left: '10px' }} onClick={handleDeleteEvent}>Delete</button>
                <button type="button" className="btn bg-gradient-default btn-start" data-bs-dismiss="modal" aria-label="Close">Cancel</button>

                {!saving && (
                  <button type="submit" className="btn bg-gradient-primary btn-start">
                    {t('Save')}
                  </button>
                )}
                {saving && (
                  <button type="submit" className="btn btn-disabled" disabled>
                    {t('Saving ...')}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>



      <div className="modal fade" id="newTabModal" tabindex="-1" role="dialog" aria-labelledby="newTabLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newTabLabel">{t("")}</h5>
              <button type="button" id="newTabClose" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body apps-icon-link">

              <div class="grid grid-cols-3 gap-4">
                <NavLink to="/customer-management/quotations/create" data-bs-dismiss="modal" className="d-block p-4 text-center rounded-2xl hover:bg-gray-100">
                  <svg class="mx-auto mb-1 w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                  <div class="text-sm font-medium text-gray-900">{t('New Checklist')}</div>
                </NavLink>
                <NavLink to="/human-resources/employees/create" data-bs-dismiss="modal" className="d-block p-4 text-center rounded-2xl hover:bg-gray-100">
                  <svg class="mx-auto mb-1 w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                  <div class="text-sm font-medium text-gray-900">{t('Add Employee')}</div>
                </NavLink>
                <NavLink to="/chat/send-message" data-bs-dismiss="modal" className="d-block p-4 text-center rounded-2xl hover:bg-gray-100">
                  <svg class="mx-auto mb-1 w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd"></path></svg>
                  <div class="text-sm font-medium text-gray-900">{t('New Message')}</div>
                </NavLink>
                <NavLink to="/project-management/projectscreate" data-bs-dismiss="modal" className="d-block p-4 text-center rounded-2xl hover:bg-gray-100">
                  <i class="fa-solid fa-briefcase mx-auto mb-1 w-7 h-7 text-gray-500"></i>
                  <div class="text-sm font-medium text-gray-900">{t('New Project')}</div>
                </NavLink>
                <NavLink to="/profile/settings" data-bs-dismiss="modal" className="d-block p-4 text-center rounded-2xl hover:bg-gray-100">
                  <svg class="mx-auto mb-1 w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
                  <div class="text-sm font-medium text-gray-900">{t('Settings')}</div>
                </NavLink>
                <NavLink to="/product-management/products/create" data-bs-dismiss="modal" className="d-block p-4 text-center rounded-2xl hover:bg-gray-100">
                  <svg class="mx-auto mb-1 w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                  <div class="text-sm font-medium text-gray-900">{t('New Product')}</div>
                </NavLink>
                <NavLink to="/finance/invoice/create" data-bs-dismiss="modal" className="d-block p-4 text-center rounded-2xl hover:bg-gray-100">
                  <svg class="mx-auto mb-1 w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path></svg>
                  <div class="text-sm font-medium text-gray-900">{t('Create Invoice')}</div>
                </NavLink>
                <NavLink to="/customer-management/orders/create" data-bs-dismiss="modal" className="d-block p-4 text-center rounded-2xl hover:bg-gray-100">
                  <svg class="mx-auto mb-1 w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clip-rule="evenodd"></path></svg>
                  <div class="text-sm font-medium text-gray-900">{t('New Quotation')}</div>
                </NavLink>
                <NavLink to="#0" onClick={(e) => doSignout(e)} data-bs-dismiss="modal" className="d-block p-4 text-center rounded-2xl hover:bg-gray-100">
                  <svg class="mx-auto mb-1 w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                  <div class="text-sm font-medium text-gray-900">{t('Logout')}</div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
