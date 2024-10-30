import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { callFetch } from "../../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import DepartmentManageModal from "pages/hr/employee/DepartmentManageModal";
import DesignationManageModal from "pages/hr/employee/DesignationManageModal";
function BasicInfo() {
    const { t } = useTranslation();
    const [saving, setSaving] = useState(false);
    const [OptimizeSaving, setOptimizeSave] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [user, setUser] = useState({});
    const [output, setOutput] = useState([]);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        callFetch("admin/details", "GET", []).then((res) => {
            setUser(res.data)
            // setDesignations(res.data); 
            // setEditDelay(editDelay + 1);
            setValue('name', res.data.name);
            setValue('email', res.data.email);
            setValue('phone', res.data.phone);
            setValue('gender', res.data.gender);
            setValue('date_of_birth', res?.data?.date_of_birth);
            setValue('address', res?.data?.address);
        });
    }, [submitSuccess]);

    const onSubmit = (formData) => {
        setSaving(true);
        callFetch("admins/" + user.id, "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };

    const onOptimize = (formData) => {
        setOutput(["Optimizing..."]);
        setOptimizeSave(true);
        callFetch("optimize", "POST", formData, setError).then((res) => {
            setOptimizeSave(false);
            if (!res.ok) return;
            setOutput([]);
            if (res?.output?.length > 0) {
                res.output.forEach((item, index) => {
                    setTimeout(() => {
                        setOutput((prev) => [...prev, item]);
                    }, index * 2200);
                });
            }
            setSubmitSuccess(true);
        });
    };

    return (
        <>
            <div className="row">
                <div className="col-8">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('Edit Profile')}</h6>
                        </div>
                        <div className="card-body">
                            <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                                <input type="hidden" defaultValue="PUT" {...register("_method")} />
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label>
                                            {t('Name')} *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control mb-4"
                                            placeholder={t('eg. Jhon Doe')}
                                            {...register("name", {
                                                required: true,
                                            })}
                                            required
                                        />
                                        <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <label>
                                            {t('Email')} *
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control mb-4"
                                            placeholder={t('eg. email@mail.com')}
                                            {...register("email", {
                                                required: true,
                                            })}
                                            required
                                        />
                                        <div className="invalid-feedback">{errors.email && errors.email.message}</div>
                                    </div>
                                </div>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label>
                                            {t('Phone')}
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control mb-4"
                                            placeholder={t('eg. 98765432')}
                                            {...register("phone")} />
                                        <div className="invalid-feedback">{errors.phone && errors.phone.message}</div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                {t('Gender')}
                                            </label>
                                            <select
                                                className="form-control"
                                                {...register("gender")}>
                                                <option value="">--</option>
                                                <option value="Male">{t('Male')}</option>
                                                <option value="Female">{t('Female')}</option>
                                                <option value="Other">{t('Others')}</option>
                                            </select>
                                            <div className="invalid-feedback">{errors.gender && errors.gender.message}</div>
                                        </div>
                                    </div>
                                </div>


                                <div className="row g-3">
                                    <div className="form-group mb-4">
                                        <label>
                                            {t('Address')}
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            placeholder={t('eg. 1234 My street, City')}
                                            {...register("address")}></textarea>
                                        <div className="invalid-feedback">{errors.address && errors.address.message}</div>
                                    </div>
                                </div>
                                <div className="col-12 mb-4">
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
                            </form>
                        </div>
                    </div>

                    {/* Department, Designation Modal Start */}
                    <DesignationManageModal refreshParent={() => setRefresh(refresh + 1)} />
                    <DepartmentManageModal refreshParent={() => setRefresh(refresh + 1)} />
                    {/* Department, Designation Modal End */}
                </div>

                <div className="col-4">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('Optimize Application')}</h6>
                        </div>
                        <div className="card-body">
                            {output?.length > 0 && (
                                <div style={{
                                    backgroundColor: '#000',
                                    borderRadius: '5px',
                                    color: '#0f0',
                                    padding: '10px',
                                    fontFamily: 'monospace',
                                    maxHeight: 'auto',
                                    marginTop: '0px',
                                    animationDuration: "0.4s",
                                    transitionDuration: ".4s",
                                }}>
                                    {output?.map((log, index) => {
                                        let message = log;
                                        let icon = null;
                                        let color = '#0f0'; // default color
                                        if (log.includes("ERROR")) {
                                            message = log.replace("ERROR", "").trim();
                                            icon = <i className="fa fa-exclamation-circle" style={{ color: 'red', marginLeft: '5px' }}></i>;
                                            color = 'red';
                                        } else if (log.includes("WARNING")) {
                                            message = log.replace("WARNING", "").trim();
                                            icon = <i className="fa fa-exclamation-triangle" style={{ color: 'orange', marginLeft: '5px' }}></i>;
                                            color = 'orange';
                                        } else if (log.includes("INFO")) {
                                            message = log.replace("INFO", "").trim();
                                            icon = <i className="fa fa-check-circle" style={{ marginLeft: '5px' }}></i>;
                                        }

                                        return (
                                            <div key={index} style={{ color }}>
                                                {icon} <span style={{ marginLeft: '5px' }}>{message}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}


                            <div className="col-12 mb-2 me-auto mt-3">
                                {!OptimizeSaving && (
                                    <button onClick={() => onOptimize({})} type="submit" className="btn btn-primary float-end">
                                        {t('Optimize')}
                                    </button>
                                )}
                                {OptimizeSaving && (
                                    <button className="btn btn-disabled float-end d-flex align-items-center" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        {t('Optimizing...')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default BasicInfo;
