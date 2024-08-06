import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { callFetch } from "../../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import DepartmentManageModal from "pages/hr/employee/DepartmentManageModal";
import DesignationManageModal from "pages/hr/employee/DesignationManageModal";
import Cookies from 'js-cookie';
function BasicInfo() {
    let params = useParams();
    const { t } = useTranslation();
    const [designations, setDesignations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [editDelay, setEditDelay] = useState(0);
    const [user, setUser] = useState({});
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

    return (
        <div className="row">
            <div className="col-12">
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
        </div>
    )
        
}

export default BasicInfo;
