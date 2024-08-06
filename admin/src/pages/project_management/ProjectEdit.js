import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import callFetch from "../../helpers/callFetch";
import flatpickr from "flatpickr";
import Select from 'react-select';
import SoftDropzone from "components/SoftDropzone";
import Cookies from 'js-cookie';
import SoftBox from "components/SoftBox";
import Grid from "@mui/material/Grid";

function ProjectEdit() {
    let params = useParams();
    const { t } = useTranslation();
    const submitBtn = useRef();
    const [data, setData] = useState([]);
    const [formIds, setFormIds] = useState([]);
    const [options, setOptions] = useState([]);
    const [formOptions, setFormOptions] = useState([]);
    const [optionsSelected, setOptionsSelected] = useState([]);
    const [formOptionsSelected, setFormOptionsSelected] = useState([]);
    const [employeeIds, setEmployeeIds] = useState('');
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [files, setFiles] = useState([]);
    const [attachments, setAttachment] = useState([]);

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        flatpickr(".flat-pickr");

        callFetch("projects/" + params.id + "/edit", "GET", []).then((res) => {
            setData(res.data);
            let employeeOptions = [];
            let os = [];
            let employeeSelectedIds = '0';
            res.data.employees.map((employee) => {
                employeeOptions.push({ 'value': employee.user.id, 'label': employee.user.name });
                if (res.data.selected_employees.indexOf(employee.user.id) !== -1) {
                    os.push({ 'value': employee.user.id, 'label': employee.user.name });
                    employeeSelectedIds += '-' + employee.user.id;
                }
            });
            setOptions(employeeOptions);
            setOptionsSelected(os);
            setEmployeeIds(employeeSelectedIds);
            setAttachment(JSON.parse(res.data.project.attachments && res.data.project.attachments != 'null' ? res.data.project.attachments : '[]'));

            let fOptions = [];
            let fs = [];
            let formSelectedIds = '0';
            res.data.forms.map((form) => {
                fOptions.push({ 'value': form.id, 'label': form.name });
                if (res.data.selected_forms.indexOf(form.id) !== -1) {
                    fs.push({ 'value': form.id, 'label': form.name });
                    formSelectedIds += '-' + form.id;
                }
            });
            setFormOptions(fOptions);
            setFormOptionsSelected(fs);
            setFormIds(formSelectedIds);

            setTimeout(() => {
                for (let [key, value] of Object.entries(res.data.project)) {
                    setValue(key, value);
                }
            }, 400);
        });
    }, []);

    function submitForm(e) {
        submitBtn.current && submitBtn.current.click();
    }

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

    const dropZoneInitialize = (name = '') => {

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

    const onSubmit = (formData) => {
        setSaving(true);
        formData.employee_ids = employeeIds;
        formData.form_ids = formIds;
        callFetch("projects/" + params.id, "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };

    return submitSuccess ? <Navigate to='/project-management/projects' /> :
        <div className="row">
            <div className="col-md-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t('Edit Project')}</h6>
                    </div>
                    <div className="card-body">
                        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <input type="hidden" defaultValue="PUT" {...register("_method")} />

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>
                                        {t('Project Number')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. 400001')}
                                        {...register("identity_number", {
                                            required: true,
                                        })}
                                        readOnly
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <label>
                                        {t('Project Name')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. Project One')}
                                        {...register("name", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Checklist & Forms')} *
                                        </label>
                                        <br />
                                        <Select noOptionsMessage={() => t('No Options')} placeholder={t('Select')} getStyles="form-control" isMulti={true} options={formOptions} value={formOptionsSelected} onChange={(selectedOptions) => {
                                            let ids = '0';
                                            let os = [];
                                            selectedOptions.map((op) => {
                                                ids += '-' + op.value;
                                                os.push({ 'value': op.value, 'label': op.label });
                                            });
                                            setFormIds(ids);
                                            setFormOptionsSelected(os);
                                        }} />
                                        <div className="invalid-feedback">{errors.form_ids && errors.form_ids.message}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Quotation')} *
                                        </label>
                                        <br />
                                        <select
                                            className="form-control"
                                            {...register("quotation_id", {
                                                required: true,
                                            })}
                                            required
                                        >
                                            <option value="">--</option>
                                            {data.quotations && data.quotations.map((quote) => (
                                                <option key={quote.id} value={quote.id}>{quote.identity_number}</option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">{errors.quotation_id && errors.quotation_id.message}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Employee')}
                                        </label>
                                        <br />
                                        <Select noOptionsMessage={() => t('No Options')} placeholder={t('Select')} getStyles="form-control" isMulti={true} options={options} value={optionsSelected} onChange={(selectedOptions) => {
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
                                <div className="col-md-6">
                                    <label>
                                        {t('Description')}
                                    </label>
                                    <textarea className="form-control mb-4" cols="30" rows="3" {...register("description")} placeholder={t('eg. Project Description')}></textarea>
                                    <div className="invalid-feedback">{errors.description && errors.description.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <label>
                                                {t('Start Date')} *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mb-4 flat-pickr"
                                                placeholder={t('eg. 2001-03-20')}
                                                {...register("start_date", {
                                                    required: true,
                                                })}
                                                required
                                            />
                                            <div className="invalid-feedback">{errors.start_date && errors.start_date.message}</div>
                                        </div>
                                        <div className="col-sm-4">
                                            <label>
                                                {t('Start Time')} *
                                            </label>
                                            <select
                                                className="form-control mb-4 flat-pickr"
                                                {...register("start_time", {
                                                    required: true,
                                                })}
                                                required
                                                >
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
                                            <div className="invalid-feedback">{errors.start_time && errors.start_time.message}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <label>
                                                {t('End Date')} *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mb-4 flat-pickr"
                                                placeholder={t('eg. 2001-03-20')}
                                                {...register("end_date", {
                                                    required: true,
                                                })}
                                                required
                                            />
                                            <div className="invalid-feedback">{errors.end_date && errors.end_date.message}</div>
                                        </div>
                                        <div className="col-sm-4">
                                            <label>
                                                {t('End Time')} *
                                            </label>
                                            <select
                                                className="form-control mb-4 flat-pickr"
                                                {...register("end_time", {
                                                    required: true,
                                                })}
                                                required
                                                >
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
                                            <div className="invalid-feedback">{errors.start_time && errors.start_time.message}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button ref={submitBtn} type="submit" className="btn btn-primary d-none">
                                {t('Save')}
                            </button>
                        </form>
                        <div className="row g-3">
                            <div className="col-md-12">
                                <label>{t('Attachments')}</label>
                                {dropZoneInitialize()}
                            </div>
                        </div>
                        
                        <div className="col-md-12">
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

                        <div className="col-12 my-4">
                            {!saving && (
                                <button type="button" onClick={(e) => submitForm(e)} className="btn btn-primary">
                                    {t('Save')}
                                </button>
                            )}
                            {saving && (
                                <button type="button" className="btn btn-disabled" disabled>
                                    {t('Saving ...')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>;
}

export default ProjectEdit;
