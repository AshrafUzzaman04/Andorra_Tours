import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from "react-router-dom";
import callFetch from "../../../helpers/callFetch";

function SmtpEdit() {
    let params = useParams();
    const { t } = useTranslation();
    const [resData, setResData] = useState(null);
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        callFetch("smtp-configurations/" + params.id + "/edit", "GET", [], setError).then((res) => {
            setResData(res.data);
            for (let [key, value] of Object.entries(res.data)) {
                setValue(key, value);
            }
        });
    }, [setError, setValue, params]);

    const onSubmit = (formData) => {
        setSaving(true);
        callFetch("smtp-configurations/" + params.id, "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            //setSubmitSuccess(true);
        });
    };

    return submitSuccess ? <Navigate to='/user-settings/smtp' /> :
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t('SMTP Setup')}</h6>
                    </div>
                    <div className="card-body">
                        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <input type="hidden" defaultValue="PUT" {...register("_method")} />
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>
                                        {t('Sender Name')} <b>*</b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('Sender Name')}
                                        {...register("sender_name", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.sender_name && errors.sender_name.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <label>
                                        {t('Sender Email')} <b>*</b>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control mb-4"
                                        placeholder={t('Sender Email')}
                                        {...register("sender_email", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.sender_email && errors.sender_email.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>
                                        {t('Host')} <b>*</b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('Host')}
                                        {...register("smtp_host", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.smtp_host && errors.smtp_host.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <label>
                                        {t('Port')} <b>*</b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('Port')}
                                        {...register("smtp_port", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.smtp_port && errors.smtp_port.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>
                                        {t('User')} <b>*</b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('User')}
                                        {...register("smtp_user", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.smtp_user && errors.smtp_user.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <label>
                                        {t('Password')} <b>*</b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('Password')}
                                        {...register("smtp_password", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.smtp_password && errors.smtp_password.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Type')} <b>*</b>
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("smtp_type", {
                                                required: true,
                                            })}
                                            required
                                        >
                                            <option value="default">Default</option>
                                            <option value="ssl">SSL</option>
                                            <option value="tls">TLS</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.smtp_type && errors.smtp_type.message}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Status')} <b>*</b>
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("status", {
                                                required: true,
                                            })}
                                            required
                                        >
                                            <option value="1">{t('Active')}</option>
                                            <option value="0">{t('Inactive')}</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.status && errors.status.message}</div>
                                    </div>
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
                                        {t('Saving')} ...
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>;
}

export default SmtpEdit;
