import callFetch from "helpers/callFetch";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from "react-router-dom";
const CustomerPasswordChange = () => {
    let params = useParams();
    const { t } = useTranslation();
    const [passwords, setPasswords] = useState({ current_password: "", new_password: "", conform_password: "", id: '' })
    const [saving, setSaving] = useState(false);
    const [perror, setPerror] = useState([])
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = (formData) => {
        setSaving(true);
        formData.id = params.id
        callFetch("admin/update/password", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            if(!res.errors){
                setValue("current_password", "");
                setValue("password", "");
                setValue("password_confirmation", "");
            }
        })

    }
    return (
        <>
            <div className="col-12">
                <div className="card mb-4" >
                    <div className="card-header pb-0" >
                        <h6>{t('Password Update')}</h6>
                    </div>
                    <div className="card-body">
                        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <div>
                                <label>
                                    {t('Current Password')} *
                                </label>
                                <input
                                    type="password"
                                    className="form-control "
                                    placeholder={t('Current Passwrod')}
                                    {...register("current_password", {
                                        required: true
                                    })}
                                    required
                                />

                                <div className="invalid-feedback">{errors.current_password && errors.current_password.message}</div>

                            </div>

                            <div>
                                <label className="mt-4">
                                    {t('New Password')} *
                                </label>
                                <input
                                    type="password"
                                    className="form-control "
                                    placeholder={t('New Password')}
                                    {...register("password", {
                                        required: true
                                    })}
                                    required
                                />

                                <div className="invalid-feedback">{errors.password && errors.password.message}</div>
                            </div>

                            <div>
                                <label className="mt-4">
                                    {t('Conform Password')} *
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder={t('Conform Password')}
                                    {...register("password_confirmation", {
                                        required: true
                                    })}
                                    required
                                />

                                <div className="invalid-feedback">{errors.password_confirmation && errors.password_confirmation.message}</div>
                            </div>

                            <div className="col-12 mb-2 mt-4 mb-4">
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
        </>
    )
}

export default CustomerPasswordChange