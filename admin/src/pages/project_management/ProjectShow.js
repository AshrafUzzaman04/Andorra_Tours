import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { callFetch } from "../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import flatpickr from "flatpickr";

import dateFormat, { masks } from "dateformat";

// @mui material components
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SoftButton from "components/SoftButton";
import TimelineItem from "examples/Timeline/TimelineItem";

import SoftBox from "components/SoftBox";
import Grid from "@mui/material/Grid";
import Members from './Members';
import ProjectStatus from "./ProjectStatus";
import Overview from "./Overview";
import AddInvoice from "./AddInvoice";
import Invoices from "./Invoices";

function ProjectShow(props) {
    let params = useParams();
    var currentAllEmployees = [];
    var currentCustomers = [];
    var currentSupliers = [];
    const { t } = useTranslation();
    const submitBtn = useRef();
    const [allEmployees, setAllEmployees] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [formView, setFormView] = useState({ id: 0, view: '', data: '' });
    const [project, setProject] = useState(null);
    const [attachments, setAttachment] = useState([]);
    const [employees, setEmployees] = useState(null);
    const [forms, setForms] = useState(null);
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [refresh2, setRefresh2] = useState(0);
    
    const [menu, setMenu] = useState(null);
    const openMenu = (event) => setMenu(event.currentTarget);
    const closeMenu = () => setMenu(null);

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => { }, [refresh]);

    useEffect(() => {
        callFetch("projects/" + params.id, "GET", []).then((res) => {
            console.log(res.data.project);

            setCustomers(res.data.customers);
            setSuppliers(res.data.suppliers);
            currentCustomers = res.data.customers;
            currentSupliers = res.data.suppliers;
            setAllEmployees(res.data.all_employees);
            currentAllEmployees = res.data.all_employees;
            setEmployees(res.data.employees);
            setForms(res.data.forms);
            setProject(res.data.project);
            setAttachment(JSON.parse(res.data.project.attachments && res.data.project.attachments != 'null' ? res.data.project.attachments : '[]'));
        });

        let formObserver = setInterval(() => {
            if (window.location.href.search("project-management/projects/[0-9]") === -1)
                clearInterval(formObserver);

            if (formView.id > 0)
                performSubmit();
        }, 3000);

        return () => {
            // cancel the subscription
            clearInterval(formObserver);
        };
    }, []);

    function companyNameInit(doSomeIgnore = false) {
        let fdata = {};
        if (formView.data)
            fdata = JSON.parse(formView.data);
        setTimeout(() => {
            for (var [key, val] of Object.entries(fdata)) {
                let np = key.split('_');
                if (Array.isArray(val)) {
                    for (var i = 0; i < val.length; i++) {
                        if (!document.getElementsByName(key)[i]) {
                            document.getElementsByName(key)[i - 1].parentElement.parentElement.insertAdjacentHTML('beforeend', document.getElementsByName(key)[i - 1].parentElement.parentElement.innerHTML);
                        }

                        if (np[0] == 'cid')
                            document.getElementsByName(key)[i].checked = true;
                        else
                            document.getElementsByName(key)[i].value = val[i] ? val[i] : '';
                    }
                }
                else {
                    if (np[0] == 'cid')
                        document.getElementsByName(key)[0].checked = true;
                    else
                        document.getElementsByName(key)[0].value = val ? val : '';
                }
            }

            flatpickr(".flat-pickr:not(.flatpickr-input)");

            if (document.querySelector('.choice-name:not(.choices__input)')) {
                let elements = document.querySelectorAll('.choice-name:not(.choices__input)');
                Array.from(elements).forEach((element, index) => {
                    let choices = new window.Choices(element, {
                        removeItemButton: true
                    });

                    var employeeOptions = [];
                    var ae = allEmployees.length ? allEmployees : currentAllEmployees;
                    ae.map((employee) => {
                        let un = doSomeIgnore ? null : fdata[element.getAttribute('name')];
                        if (Array.isArray(un)) {
                            un = un[0];
                            if (un == 'employee-'+employee.user.id)
                                fdata[element.getAttribute('name')] = fdata[element.getAttribute('name')].filter(function (item, i) {
                                    return i !== 0;
                                });
                        }
                        else if (un == 'employee-'+employee.user.id)
                            fdata[element.getAttribute('name')] = '';

                        employeeOptions.push({ 'value': 'employee-'+employee.user.id, 'label': employee.user.name, 'selected': un == 'employee-'+employee.user.id });
                    });

                    choices.setChoices(
                        employeeOptions,
                        'value',
                        'label',
                        false
                    );
                });
            }

            if (document.querySelector('.choice-company:not(.choices__input)')) {
                let elements = document.querySelectorAll('.choice-company:not(.choices__input)');
                Array.from(elements).forEach((element, index) => {
                    let choices2 = new window.Choices(element, {
                        removeItemButton: true
                    });

                    var fOptions = [];
                    var ac = customers.length ? customers : currentCustomers;
                    ac.map((customer) => {
                        let cn = doSomeIgnore ? null : fdata[element.getAttribute('name')];
                        if (Array.isArray(cn)) {
                            cn = cn[0];
                            if (cn == 'customer-'+customer.id)
                                fdata[element.getAttribute('name')] = fdata[element.getAttribute('name')].filter(function (item, i) {
                                    return i !== 0;
                                });
                        }
                        else if (cn == 'customer-'+customer.id)
                            fdata[element.getAttribute('name')] = '';

                       fOptions.push({ 'value': 'customer-'+customer.id, 'label': customer.name, 'selected': cn == 'customer-'+customer.id });
                    });

                    var sup = suppliers.length ? suppliers : currentSupliers;
                    sup.map((supplier) => {
                        let cn = doSomeIgnore ? null : fdata[element.getAttribute('name')];
                        if (Array.isArray(cn)) {
                            cn = cn[0];
                            if (cn == 'supplier-'+supplier.id)
                                fdata[element.getAttribute('name')] = fdata[element.getAttribute('name')].filter(function (item, i) {
                                    return i !== 0;
                                });
                        }
                        else if (cn == 'supplier-'+supplier.id)
                            fdata[element.getAttribute('name')] = '';

                        fOptions.push({ 'value': 'supplier-'+supplier.id, 'label': supplier.name, 'selected': cn == 'supplier-'+supplier.id });
                    });

                    choices2.setChoices(
                        fOptions,
                        'value',
                        'label',
                        false
                    );
                });
            }
        }, 400);
    }

    function submitForm(e) {
        submitBtn.current && submitBtn.current.click();
    }

    const performSubmit = (ev) => {
        if (ev)
            ev.preventDefault();

        if (formView.id < 1)
            return;

        setSaving(true);

        var kvpairs = {};
        const formData = new FormData(document.getElementById('bmaForm'));
        for (var pair of formData.entries()) {
            if (kvpairs[pair[0]]) {
                if (Array.isArray(kvpairs[pair[0]]))
                    kvpairs[pair[0]].push(pair[1]);
                else {
                    kvpairs[pair[0]] = [kvpairs[pair[0]]];
                    kvpairs[pair[0]].push(pair[1]);
                }
            }
            else
                kvpairs[pair[0]] = pair[1];
        }

        if (JSON.stringify(kvpairs) == formView.data) {
            setSaving(false);
            return;
        }

        var kvpJson = JSON.stringify(kvpairs);
        formView.data = kvpJson;
        setFormView(formView);

        callFetch("forms/" + formView.id + "/" + params.id + "/data?toast=false", "POST", { data: kvpJson }, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;

            setForms(res.data);
        });
    };

    useEffect(() => {
        let focusObserver = setInterval(() => {
            let cName = document.activeElement.className;
            if (cName == 'btn btn-secondary add-new-btn') {
                document.activeElement.insertAdjacentHTML('beforebegin', '<div class="row">' + document.activeElement.dataset.html + '</div>');
                document.activeElement.insertAdjacentHTML('beforebegin', '<input type="text" id="takeFocus">');
                document.getElementById('takeFocus').focus();
                document.getElementById('takeFocus').remove();

                companyNameInit(true);
            }
            else if (cName == 'form-control upload-file' && document.activeElement.value.length) {
                let actEle = document.activeElement;
                let uFile = actEle.files[0];

                document.activeElement.insertAdjacentHTML('beforebegin', '<input type="text" id="takeFocus">');
                document.getElementById('takeFocus').focus();
                document.getElementById('takeFocus').remove();

                callFetch("upload-file?toast=false", "POST", { user_file: uFile }, null).then((res) => {
                    if (!res.ok) return;
                    actEle.parentElement.querySelector('.file-path').value = res.data;
                });
            }
        }, 500);

        return () => {
            // cancel the subscription
            clearInterval(focusObserver);
        };
    }, []);

    const ParentRefesh = () =>{
        setRefresh2(refresh2 + 1);
    }

    return submitSuccess ? <Navigate to='/project-management/projects' /> :
        <>
            <div className="container-fluid mt-4">
                <div className="row align-items-center">
                    <div className="col-lg-9 col-sm-12">
                        <div className="nav-wrapper position-relative end-0">
                            <ul className="nav nav-pills nav-fill bg-white blur shadow-blur p-1 projecttab" role="tablist" style={{ cursor: 'pointer' }}>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link mb-0 px-0 py-1 active" data-bs-toggle="tab" data-bs-target="#overview" role="tab" aria-selected="true">
                                        {t('Overview')}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mb-0 px-0 py-1 " data-bs-toggle="tab" data-bs-target="#reporting" role="tab" aria-selected="false">
                                        {t('Reporting')}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mb-0 px-0 py-1 " data-bs-toggle="tab" data-bs-target="#members" role="tab" aria-selected="false">
                                        {t('Members')}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mb-0 px-0 py-1 " data-bs-toggle="tab" role="tab" aria-selected="false">
                                        {t('Files')}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mb-0 px-0 py-1 " data-bs-toggle="tab" data-bs-target="#notes" role="tab" aria-selected="false">
                                        {t('Notes')}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mb-0 px-0 py-1 " onClick={()=>ParentRefesh()} data-bs-toggle="tab" data-bs-target="#invoice" role="tab" aria-selected="false">
                                        {t('Invoices')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-12">
                        {!saving && (
                            <button type="button" onClick={(e) => submitForm(e)} style={{ padding: '0.75rem 1.5rem' }} className="btn btn-primary mb-0 btn-lg">{t('Save')}</button>
                        )}
                        {saving && (
                            <button type="button" style={{ padding: '0.75rem 1.5rem' }} className="btn btn-primary mb-0 btn-lg" disabled>{t('Saving ...')}</button>
                        )}

                        <SoftButton className="ms-3" variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
                            {t('Actions')}&nbsp;
                            {/*<Icon>keyboard_arrow_down</Icon>*/}
                        </SoftButton>
                        <Menu
                            anchorEl={menu}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                            open={Boolean(menu)}
                            onClose={closeMenu}
                            keepMounted
                            >
                            <>
                                <MenuItem> <a href={process.env.REACT_APP_STORAGE_URL + 'projects/' + params.id + '/' + formView.id + '/export'} target="_blank" >{t('Export')}</a></MenuItem>
                                {formView.id == 7 ?(
                                    <MenuItem> <a href={process.env.REACT_APP_STORAGE_URL + 'projects/' + params.id + '/' + formView.id + '/export?page=2'} target="_blank" >{t('Export')} 2</a></MenuItem>
                                ) : <></>}
                            </>
                        </Menu>
                    </div>
                </div>
            </div>

            <div className="container-fluid my-3 py-3">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="overview" role="tabpanel">
                        <div className="row mb-5">
                            <div className="col-lg-9 mt-lg-0">
                                <div className="row">
                                    <div className="col-lg-4 col-md-6 col-12 mt-4 mt-lg-0">
                                        <div className="card">
                                            <div className="card-body p-3">
                                                <div className="d-flex">
                                                    <div>
                                                        <div className="icon icon-shape bg-gradient-dark text-center border-radius-md">
                                                            <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true" />
                                                        </div>
                                                    </div>
                                                    <div className="ms-3">
                                                        <div className="numbers">
                                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">{t('Project Nr.')}</p>
                                                            <h5 className="font-weight-bolder mb-0">
                                                                {project && project.identity_number && project.identity_number}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12 mt-4 mt-lg-0">
                                        <div className="card">
                                            <div className="card-body p-3">
                                                <div className="d-flex">
                                                    <div>
                                                        <div className="icon icon-shape bg-gradient-dark text-center border-radius-md">
                                                            <i className="ni ni-world text-lg opacity-10" aria-hidden="true" />
                                                        </div>
                                                    </div>
                                                    <div className="ms-3">
                                                        <div className="numbers">
                                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">{t('Quotation Number')}</p>
                                                            <h5 className="font-weight-bolder mb-0">
                                                                <NavLink to={`/customer-management/quotations/${project && project.quotation && project.quotation.id}/edit`}><u>{project && project.quotation && project.quotation.identity_number}</u></NavLink>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12 mt-4 mt-lg-0">
                                        <div className="card">
                                            <div className="card-body p-3">
                                                <div className="d-flex">
                                                    <div>
                                                        <div className="icon icon-shape bg-gradient-dark text-center border-radius-md">
                                                            <i className="ni ni-planet text-lg opacity-10" aria-hidden="true" />
                                                        </div>
                                                    </div>
                                                    <div className="ms-3">
                                                        <div className="numbers">
                                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">{t('Project Status')}</p>
                                                            <select
                                                                className="form-control form-control-sm border-0 px-0"
                                                                onChange={(e)=>{
                                                                    let formData = new FormData();
                                                                    formData.status = e.target.value;
                                                                    formData.id = project.id;
                                                                    callFetch("projects-status", "POST", formData, setError).then((res) => {
                                                                        console.log(res);
                                                                    });
                                                                }}
                                                                >
                                                                <option selected={project && project.status == 'In Progress' ? 'selected' : ''} value="In Progress">{t('In Progress')}</option>
                                                                <option selected={project && project.status == 'Done' ? 'selected' : ''} value="Done">{t('Done')}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-body mt-4">
                                    <div className="row justify-content-center align-items-center">
                                        <div className="col-sm-auto col-4">
                                            <div className="avatar avatar-xl position-relative">
                                                <img src={(project && project.quotation && project?.quotation?.customer?.logo) ? process.env.REACT_APP_STORAGE_URL + project.quotation.customer.logo : '/assets/img/placeholder.png'} alt="bruce" className="border-radius-lg shadow-sm" style={{maxHeight: '64px', width: 'auto!important'}}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-auto col-8 my-auto">
                                            <div className="h-100">
                                                <h5 className="mb-1 font-weight-bolder">
                                                    {project && project.quotation && project?.quotation?.customer?.name}
                                                </h5>
                                                <p className="mb-0 font-weight-bold text-sm">
                                                    {project && project.quotation && project?.quotation?.customer?.customer_category?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex">
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="card mt-4">
                                            <div className="card-body pt-0">
                                                <div className="card-header pb-0 p-3">
                                                    <div className="row">
                                                        <div className="col-md-8 d-flex align-items-center">
                                                            <h6 className="mb-0">{t('Customer Information')}</h6>
                                                        </div>
                                                        <div className="col-md-4 text-end">
                                                            <NavLink to={`/customer-management/customers/${project && project.quotation && project.quotation.customer.id}/edit`}>
                                                                <i className="fas fa-user-edit text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" aria-hidden="true" aria-label="Edit Profile" /><span className="sr-only">{t('Edit Profile')}</span>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card-body p-3">
                                                    <ul className="list-group">
                                                        <li className="list-group-item border-0 ps-0 pt-0 text-sm"><strong className="text-dark">{t('Full Name')}:</strong> &nbsp; {project && project.quotation && project.quotation.customer.name}</li>
                                                        <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">{t('Mobile')}:</strong> &nbsp; {project && project.quotation && project.quotation.customer.phone}</li>
                                                        <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">{t('Email')}:</strong> &nbsp; {project && project.quotation && project.quotation.customer.email}</li>
                                                        <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">{t('Location')}:</strong> &nbsp; {project && project.quotation && project.quotation.customer.street + ', ' + project.quotation.customer.zip_code + ', ' + project.quotation.customer.city + ', ' + project.quotation.customer.country}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card mt-4">
                                            <div className="card-header pb-0 p-3">
                                                <h6 className="mb-0">{t('Employee')}</h6>
                                            </div>
                                            <div className="card-body p-3">
                                                <ul className="list-group">
                                                    {employees && employees.map((employee) => (
                                                        <li key={employee.id} className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                                            <div className="avatar me-3">
                                                                <img src={employee.photo ? process.env.REACT_APP_STORAGE_URL + employee.photo : '/assets/img/placeholder.png'} alt="kal" className="border-radius-lg shadow" />
                                                            </div>
                                                            <div className="d-flex align-items-start flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">{employee.name}</h6>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="card mt-4" id="delete">
                                    <div className="card-header">
                                        <h5>{t('Description')}</h5>
                                    </div>
                                    <div className="card-body d-sm-flex pt-0">
                                        <p className="text-sm mb-0 text-justify">{project && project.description}</p>
                                    </div>
                                    <div className="card-body d-sm-flex pt-0">
                                        <SoftBox className="attchments">
                                            <Grid container spacing={3}>
                                                {attachments ? attachments.map(function(data, i){
                                                    return (
                                                        <Grid item key={i} className="text-center">
                                                            <div>
                                                                <a target="_blank" download href={process.env.REACT_APP_STORAGE_URL+'storage/attachments/'+data.attachment}>
                                                                    <img src={process.env.REACT_APP_STORAGE_URL+'storage/attachments/'+data.attachment} />
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
                            <div className="col-lg-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h6>Timeline</h6>
                                        <div className="timeline timeline-one-side" data-timeline-axis-style="dotted">
                                            <div className="timeline-block mb-3">
                                                <span className="timeline-step">
                                                    <i className="ni ni-bell-55 text-success text-gradient" />
                                                </span>
                                                <div className="timeline-content">
                                                    <h6 className="text-dark text-sm font-weight-bold mb-0">{t('Project Startet')}</h6>
                                                    <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">{project ? dateFormat(project.created_at, "dd.mm.yyyy") : ''}</p>
                                                    <p className="text-sm mt-3 mb-0">{t('Project Nr.')}: {project ? project.identity_number : '---'}</p>
                                                    <p className="text-sm mt-0 mb-2">{t('Project Creator')}: {project ? project.creator.name : '---'}</p>
                                                </div>
                                            </div>
                                            {forms && forms.map((form) => (
                                                <>
                                                    <div className="timeline-block mb-3">
                                                        <span className="timeline-step">
                                                            <i className="ni ni-single-copy-04 text-danger text-gradient" />
                                                        </span>
                                                        
                                                        <div className="timeline-content">
                                                            <h6 className="text-dark text-sm font-weight-bold mb-0">{t('Checklist')}</h6>
                                                            <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">{project ? dateFormat(project.created_at, "dd.mm.yyyy") : ''}</p>
                                                            <p className="text-sm mt-3 mb-0">{form.name} </p>
                                                            <p className="text-sm mt-0 mb-2">{project ? project.creator.name : '---'}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="reporting" role="tabpanel">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>{t('Select Checklist & Form')}</label>
                                                    <select className="form-control" onChange={(e) => {
                                                        formView.id = e.target.options[e.target.selectedIndex].dataset.form_id;
                                                        formView.data = e.target.options[e.target.selectedIndex].dataset.form_data;
                                                        formView.view = e.target.value;
                                                        setFormView(formView);
                                                        companyNameInit();
                                                        setRefresh(refresh + 1);
                                                    }}>
                                                        <option value="">--</option>
                                                        {forms && forms.map((form) => (
                                                            <option key={form.id} value={form.view ?? ''} data-form_id={form.id} data-form_data={form.pivot.data}>{form.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={(e) => performSubmit(e)} id="bmaForm" method="POST" noValidate autoComplete="off">
                                    <ul id="theForm" dangerouslySetInnerHTML={{ __html: formView.view }}></ul>
                                    <button ref={submitBtn} type="submit" className="d-none">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="notes" role="tabpanel">
                        <div className="row">
                            <div className="col-md-12">
                                <ProjectStatus projectId={params.id} />
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={(e) => performSubmit(e)} id="bmaForm" method="POST" noValidate autoComplete="off">
                                    <ul id="theForm" dangerouslySetInnerHTML={{ __html: formView.view }}></ul>
                                    <button ref={submitBtn} type="submit" className="d-none">Submit</button>
                                </form>
                            </div>
                        </div> */}
                    </div>

                    <div className="tab-pane fade" id="invoice" role="tabpanel">
                        
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <AddInvoice childRefersh={refresh2} />
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={(e) => performSubmit(e)} id="bmaForm" method="POST" noValidate autoComplete="off">
                                    <ul id="theForm" dangerouslySetInnerHTML={{ __html: formView.view }}></ul>
                                    <button ref={submitBtn} type="submit" className="d-none">Submit</button>
                                </form>
                            </div>
                        </div> */}
                    </div>

                    <div className="tab-pane fade" id="members" role="tabpanel">
                        <Members />
                    </div>
                </div>
            </div>
        </>;
}

export default ProjectShow;
