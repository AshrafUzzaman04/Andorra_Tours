import { React, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Navigate, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import flatpickr from "flatpickr";
import Moment from 'react-moment';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

import SoftEditor from "components/SoftEditor";
import SoftDropzone from "components/SoftDropzone";

import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard PRO React base styles
import borders from "assets/theme/base/borders";

import SoftBadge from "components/SoftBadge";

// Data


import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import callFetch from "helpers/callFetch";

const ProjectStatus = (props) => {
    
    const { t } = useTranslation();
    const user = JSON.parse(Cookies.get('user'));
    const submitBtn = useRef();
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [refresh2, setRefresh2] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [attachments, setAttachment] = useState([]);
    const [data, setData] = useState([]);
    const[newDropzone, setNewDropzone] = useState(true);
    const[editForm, setEditForm] = useState(false);
    const [noteId,setNoteId] = useState(0);
    const handleSetStartDate = (newDate) => setStartDate(newDate);
    const handleSetEndDate = (newDate) => setEndDate(newDate);

    const { borderWidth, borderColor } = borders;

    const handeleAttachment = (newData) => {
        let data = attachments;
        data[attachments.length] = newData;
        setAttachment(data);
        setValue('attachments', JSON.stringify(data));
    }

    const removeAttachment = (id) => {
        const beforeRemove = attachments;
        const afterRemove = beforeRemove.filter(value => {
            return value.id != id;
        });
        setAttachment(afterRemove);
        setValue('attachments', JSON.stringify(afterRemove));
    }

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm();

    const orderprocessingLoad = () => {
        
        callFetch("order-processing/" + props.projectid + "/edit?project_id="+props.projectid, "GET", []).then((res) => {
            setData(res);
        });
    }

    useEffect(() => {
        setValue('project_id', props.projectId);
        setValue('id', 0);

        orderprocessingLoad();       

        flatpickr(".flat-pickr");
    }, [refresh]);

    useEffect(() => {
        if(props.projectId){
            callFetch('notes/'+ props.projectId, 'GET', []).then((res) => {
                setData(res.data)
                // setAttachment(JSON.parse(res.orderprocessing.attachments));
                for (let [key, value] of Object.entries(res.orderprocessing)) {
                    setValue(key, value);
                }
            })
        }
    }, [refresh2]);

    const onSubmit = (formData) => {
        setValue('description', description);
        formData.project_id = props.projectId;
        formData.description = description;
        setSaving(true);
        callFetch(editForm ? "notes/"+noteId:"notes", "POST", formData, setError).then((res) => {
            setData(res);
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
            setRefresh2(refresh2 + 1);
            clearForm();
        });
    };

    const editOrderProcessing = (order_id, index) => {
        if(order_id){
            callFetch('notes/'+ order_id +'/edit','GET', []).then((res) => {
                setNoteId(res.data?.notes?.id)
                setEditForm(true);
                setAttachment([]);
                setNewDropzone(true);
                setNewDropzone(false);
                window.focus();
                window.scrollTo(0, 0);

                const editData = res.data.notes;
                if(editData.id){
                    for (let [key, value] of Object.entries(editData)) {
                        setValue(key, value);
                    }

                    if(editData.attachments && editData.attachments != null && editData.attachments != 'null'){
                        setAttachment(JSON.parse(editData.attachments));
                    }            
                    setDescription(editData.description)
                }else{
                    console.log('Something wrong');
                }
            })
        }
        
    }

    const clearForm = () =>{
        reset({
            id: 0,
            title: '',
            status: '',
            description: '',
            attachments: JSON.stringify([]),
        });

        setNewDropzone(true);
        setEditForm(false);
        setAttachment([]);
        setDescription("");        
        console.log('Cancel');
    }

    const dropZoneInitialize = (name = 'dachansicht') => {

        return(
            <SoftDropzone
                key={'dfdf'}
                options={{
                    dictDefaultMessage: t('Drop files here to upload'),
                    //addRemoveLinks: true,
                    acceptedFiles: ".jpeg,.jpg,.png",
                    action: process.env.REACT_APP_API_URL + 'attachment',
                    headers:{
                        "Accept": "application/json",
                        "Authorization": "Bearer " + Cookies.get('token')
                    },
                    processing: function () {
                        document.body.classList.add('loading');
                    },
                    success: (file, response) => {
                        document.body.classList.remove('loading');
                        if(response.message == 'success'){
                            handeleAttachment(response.data);
                        }
                    },
                    maxfilesexceeded: function(file) {
                        this.removeAllFiles();
                        this.addFile(file);
                    },
                    error: function(file, response) {
                        document.body.classList.remove('loading');
                    }
                }}
            />
        )
    }
  return (
    <>
        <div className="row mb-5">
            <div className="col-lg-12 mt-lg-0">
                <div className="emb-4">
                    {editForm == false ? (
                        <>
                    <form id="createOrderProcesing" className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                        {/* <input type="hidden" defaultValue="PUT" {...register("_method")} /> */}
                        <input 
                            type="hidden"
                                {...register("id", {
                                    required: true,
                                })}
                            />
                        <SoftBox>
                            <Card sx={{ overflow: "visible" }}>
                                <SoftBox p={2} lineHeight={1}>
                                    <SoftBox
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="flex-end"
                                        height="100%"
                                        >
                                        <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                            <SoftTypography component="label" variant="caption" fontWeight="bold">{t('Title')}</SoftTypography>
                                        </SoftBox>
                                        <SoftInput 
                                            placeholder={t('Title')}
                                            {...register("title", {
                                                required: true,
                                            })}
                                        />
                                    </SoftBox>

                                    {/* <Grid item xs={12} sm={8} className="mt-3">
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={12}>
                                            <SoftBox
                                                display="flex"
                                                flexDirection="column"
                                                justifyContent="flex-end"
                                                height="100%"
                                                >
                                                <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                        textTransform="capitalize"
                                                        >
                                                        {t('Status')}
                                                    </SoftTypography>
                                                </SoftBox>
                                                <select
                                                    className="form-control"
                                                    {...register("status", {
                                                        required: true,
                                                    })}
                                                    required
                                                >   
                                                    <option value="In Progress">{t('In Bearbeitung')}</option>
                                                    <option value="Completed">{t('Abgeschlossen')}</option>
                                                    <option value="Cancelled">{t('Abgebrochen')}</option>
                                                    <option value="Issue">{t('Komplikation')}</option>
                                                </select>
                                                <div className="invalid-feedback">{errors.status && errors.status.message}</div>
                                                </SoftBox>
                                            </Grid>
                                        </Grid>
                                    </Grid> */}

                                    <SoftBox
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="flex-end"
                                        height="100%"
                                        >
                                        <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                                {t('Description')}
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftEditor
                                            value={description}
                                            onChange={setDescription}
                                        />
                                    </SoftBox>

                                    <SoftBox>
                                        <SoftBox
                                            display="flex"
                                            flexDirection="column"
                                            justifyContent="flex-end"
                                            height="100%"
                                            >
                                            <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                                                <SoftTypography component="label" variant="caption" fontWeight="bold">
                                                    {t('Files')}
                                                </SoftTypography>
                                            </SoftBox>
                                            
                                            {dropZoneInitialize()}

                                        </SoftBox>
                                    </SoftBox>
                                </SoftBox>
                                <SoftBox p={2} display="flex" justifyContent="flex-end">
                                    <a href="#" className="btn btn-danger mx-2" onClick={()=>{ clearForm() }}>
                                        {t('Cancel')}
                                    </a>

                                    {!saving && (
                                        <button type="submit" className="btn btn-primary">
                                            {t('Save')}
                                        </button>
                                    )}
                                    {saving && (
                                        <button type="submit" className="btn btn-disabled" disabled>
                                            {t('Saving ...')}
                                        </button>
                                    )}
                                </SoftBox> 
                            </Card>
                        </SoftBox>
                    </form>
                    </>
                    ) : <></>}
                </div>
                <br/>
                
            {data?.notes ? 
                data?.notes?.map((order, index) => (
                    <Card key={index} className="mb-3">
                        <SoftBox lineHeight={1} className="order-processing-text">
                        <SoftBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            flexDirection={{ xs: "column", sm: "row" }}
                            borderBottom={`${borderWidth[1]} solid ${borderColor}`}
                            py={2}
                            px={3}
                        >
                            <SoftAvatar src={order.user.photo ? process.env.REACT_APP_STORAGE_URL+order.user.photo : '/assets/img/placeholder.png'} alt="profile-image" variant="rounded" />
                            <SoftBox mx={2} lineHeight={1}>
                                <SoftTypography component="a" href="#" variant="button" fontWeight="regular">
                                    {order.user.name}
                                </SoftTypography>
                                <SoftTypography component="div" variant="button" color="text" fontWeight="regular">
                                    <Moment fromNow>{order.created_at}</Moment>
                                </SoftTypography>
                            </SoftBox>

                            <SoftBox mr={{ xs: 0, sm: "auto" }} mt={{ xs: 2, sm: 0 }}>
                                {user.id == order.user_id ? (
                                    <>
                                    <button type="button" onClick={ () => { editOrderProcessing(order.id, index) }} className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target={"#orderProcessingModal"}>{t('Edit')}</button>
                                    </>
                                ) : <></>}
                            </SoftBox>
                        </SoftBox>
                            <SoftBox
                                display="flex"
                                flexDirection="column"
                                justifyContent="flex-end"
                                height="100%"
                                p={2}
                                >
                                <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                    <SoftTypography component="p" fontWeight="bold">{t('Title')}</SoftTypography>
                                    <SoftTypography component="p" variant="caption" fontWeight="regular">{order.title}</SoftTypography>
                                </SoftBox>

                                <SoftBox
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="flex-end"
                                    height="100%"
                                    mt={3}
                                    >
                                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                        <SoftTypography component="p" fontWeight="bold">{t('Description')}</SoftTypography>
                                        <SoftTypography component="div" variant="caption" fontWeight="regular">
                                            <div dangerouslySetInnerHTML={{ __html: order.description }}></div>
                                        </SoftTypography>
                                    </SoftBox>
                                </SoftBox>
                                
                            </SoftBox>
                        </SoftBox>

                        <SoftBox p={3} className="attchments">
                            <Grid container spacing={3}>
                                {order && order.attachments && order.attachments != 'null' ? JSON.parse(order.attachments).map(function(data, i){
                                    return (
                                        <Grid item key={i}>
                                            <a target="_blank" download href={process.env.REACT_APP_STORAGE_URL+'storage/attachments/'+data.attachment}>
                                                <img src={process.env.REACT_APP_STORAGE_URL+'storage/attachments/'+data.attachment} />
                                            </a>
                                        </Grid>
                                    );
                                }) : <><Grid></Grid></>}
                            </Grid>
                        </SoftBox>
                        
                    </Card>
                )) : <></>} 
            </div>
            {/* <div className="col-lg-3">
                <OrderProcessingAssign data={data} /> 
            </div>  */}
            {editForm == true ? (
                <>
            <form id="editOrderprocessing" className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                <input type="hidden" defaultValue="PUT" {...register("_method")} />      
                <input 
                    type="hidden"
                    {...register("id", {
                        required: true,
                    })}
                />
                <div className="modal fade show" id={"orderProcessingModal"} tabindex="-1" role="dialog" aria-labelledby="calanderModalLabel" aria-hidden="true" style={{display: 'block'}}>
                    <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={"calanderModalLabel"}>{getValues('title')}</h5>
                            <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close" onClick={ () => { clearForm() }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <SoftBox
                                display="flex"
                                flexDirection="column"
                                justifyContent="flex-end"
                                height="100%"
                                >
                                <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                    <SoftTypography component="label" variant="caption" fontWeight="bold"></SoftTypography>
                                </SoftBox>
                                <SoftInput 
                                    placeholder={t('Title')}
                                    {...register("title", {
                                        required: true,
                                    })}
                                />
                            </SoftBox>

                            {/* <Grid item xs={12} sm={8} className="mt-3">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                    <SoftBox
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="flex-end"
                                        height="100%"
                                        >
                                        <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                            <SoftTypography
                                                component="label"
                                                variant="caption"
                                                fontWeight="bold"
                                                textTransform="capitalize"
                                                >
                                                {t('Status')}
                                            </SoftTypography>
                                        </SoftBox>
                                        <select
                                            className="form-control"
                                            {...register("status", {
                                                required: true,
                                            })}
                                            required
                                        >
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                            <option value="Issue">Issue</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.status && errors.status.message}</div>
                                        </SoftBox>
                                    </Grid>
                                </Grid>
                            </Grid> */}

                            <SoftBox
                                display="flex"
                                flexDirection="column"
                                justifyContent="flex-end"
                                height="100%"
                                >
                                <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                                        {t('Description')}
                                    </SoftTypography>
                                </SoftBox>
                                <SoftEditor
                                    id={'description'+props.id}
                                    value={description}
                                    onChange={setDescription}
                                />
                            </SoftBox>

                            <SoftBox>
                                <SoftBox
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="flex-end"
                                    height="100%"
                                    >
                                    <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            {t('Files')}
                                        </SoftTypography>
                                    </SoftBox>
                                    
                                    {dropZoneInitialize()}

                                </SoftBox>
                            </SoftBox>

                            <SoftBox p={3} className="attchments">
                                <Grid container spacing={3}>
                                    {attachments ? attachments.map(function(data, i){
                                        return (
                                            <Grid item key={i} className="text-center">
                                                <div>
                                                    <a target="_blank" download href={process.env.REACT_APP_STORAGE_URL+'storage/attachments/'+data.attachment}>
                                                        <img src={process.env.REACT_APP_STORAGE_URL+'storage/attachments/'+data.attachment} />
                                                    </a>
                                                </div>
                                                <a onClick={() => { removeAttachment(data.id) }}>Remove</a>
                                            </Grid>
                                        );
                                    }) : <><Grid></Grid></>}
                                </Grid>
                            </SoftBox>
                        </div>
                        <div className="modal-footer">
                            {!saving && (
                                <button type="submit" className="btn btn-primary">
                                    {t('Save')}
                                </button>
                            )}
                            {saving && (
                                <button type="submit" className="btn btn-disabled" disabled>
                                    {t('Saving ...')}
                                </button>
                            )}
                        </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="modal-backdrop fade show"></div> 
            </>
            ) : <></>}
        </div>
    </>
  )
}

export default ProjectStatus