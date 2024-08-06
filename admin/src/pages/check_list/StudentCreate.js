import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import callFetch from 'helpers/callFetch';
const StudentCreate = () => {
    const { t } = useTranslation();
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();
    
    useEffect(()=>[
        callFetch("student/create", "GET" ,[]).then((res)=>{
            setValue('student_nr',res.data)
        })
    ],[refresh])
    const onSubmit = (formData) =>{
        setSaving(true);
        callFetch("student", "POST", formData, setError).then((res)=>{
            setSaving(false)
            if(!res.ok)return;
            setSubmitSuccess(true)
        })
    }
return submitSuccess ? <Navigate to='/course-management/students' /> :
    <div className="row">
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header pb-0">
                    <h6>{t('Add Student')}</h6>
                </div>
                <div className="card-body">
                    <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label>
                                    {t('Student NR')} *
                                </label>
                                <input
                                    type="text"
                                    className="form-control mb-4"
                                    placeholder={t('eg. 123')}
                                    {...register("student_nr", {
                                        required: true,
                                    })}
                                    readOnly
                                    required
                                />
                                <div className="invalid-feedback">{errors.student_nr && errors.student_nr.message}</div>
                            </div>
                            <div className="col-md-6">
                                <label>
                                    {t('Student Name')} *
                                </label>
                                <input
                                    type="text"
                                    className="form-control mb-4"
                                    placeholder={t('eg. Jhon Doe')}
                                    {...register("student_name", {
                                        required: true,
                                    })}
                                    required
                                />
                                <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label>
                                    {t('Student Email')} *
                                </label>
                                <input
                                    type="email"
                                    className="form-control mb-4"
                                    placeholder={t('eg. email@mail.com')}
                                    {...register("student_email", {
                                        required: true,
                                    })}
                                    required
                                />
                                <div className="invalid-feedback">{errors.email && errors.email.message}</div>
                            </div>
                            <div className="col-md-6">
                                <label>{t('Student Profile Picture')}</label>
                                <input type="file" className="form-control mb-4" {...register("student_photo")} />
                                <div className="invalid-feedback">{errors.photo && errors.photo.message}</div>
                            </div>
                        </div>
                        <div className="row g-3">
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
                            <div className="col-md-6">
                                <label>
                                    {t('Mobile')}
                                </label>
                                <input
                                    type="text"
                                    className="form-control mb-4"
                                    placeholder={t('eg. 98765432')}
                                    {...register("mobile")} />
                                <div className="invalid-feedback">{errors.mobile && errors.mobile.message}</div>
                            </div>
                        </div>

                        <div className="row g-3">
                            <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Date of Birth')}
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control mb-4 flatpickr"
                                            placeholder={t('eg. 16-04-2022')}
                                            {...register("date_of_birth")} />
                                        <div className="invalid-feedback">{errors.date_of_birth && errors.date_of_birth.message}</div>
                                    </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>
                                        {t('Joining Date')} *
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control mb-4 flatpickr"
                                        placeholder={t('eg. 16-04-2022')}
                                        {...register("joining_date", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.joining_date && errors.joining_date.message}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3">
                            
                        </div>
                        <div className="row g-3">
                            <div className="form-group mb-4">
                                <label>
                                    {t('Address')}
                                </label>
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <select
                                            className="form-control"
                                            {...register("com_pri_address", {
                                                required: true,
                                            })}
                                        >
                                            <option value="">--</option>
                                            <option value="Company Address">{t('Company Address')}</option>
                                            <option value="Private Address">{t('Private Address')}</option>
                                        </select>
                                    </div>
                                </div>
                                <textarea
                                    className="form-control mt-3"
                                    rows="4"
                                    placeholder={t('eg. 1234 My street, City')}
                                    {...register("adress")}></textarea>
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

            
        </div>
    </div>;
}

export default StudentCreate