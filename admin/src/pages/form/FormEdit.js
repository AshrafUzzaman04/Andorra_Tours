import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { callFetch } from "../../helpers/callFetch";
import { useTranslation } from 'react-i18next';

function FormEdit() {
    let params = useParams();
    const { t } = useTranslation();
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
        callFetch("forms/" + params.id + "/edit", "GET", [], setError).then((res) => {
            for (let [key, value] of Object.entries(res.data.form)) {
                setValue(key, value);
            }
        });
    }, [setError, setValue]);

    const onSubmit = (formData) => {
        setSaving(true);
        callFetch("forms/" + params.id, "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };

    return submitSuccess ? <Navigate to='/forms' /> :
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t('Add Form')}</h6>
                    </div>
                    <div className="card-body">
                        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <input type="hidden" defaultValue="PUT" {...register("_method")} />

                            <div className="row g-3">
                                <div className="col-md-4">
                                    <label>
                                        {t('Form Name')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. Data Form')}
                                        {...register("name", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>
                                            {t('Status')}
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("status", {
                                                required: true
                                            })}
                                            required
                                        >
                                            <option value="">--</option>
                                            <option value="Active">{t('Active')}</option>
                                            <option value="Inactive">{t('Inactive')}</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.status && errors.status.message}</div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>
                                            {t('Category')}
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("category", {
                                                required: true
                                            })}
                                            required
                                        >
                                            <option value="">--</option>
                                            <option value="Maschinenbauwesen">{t('Maschinenbauwesen')}</option>
                                            <option value="Brandschutzwesen">{t('Brandschutzwesen')}</option>
                                            <option value="Eisenbahnwesen">{t('Eisenbahnwesen')}</option>
                                            <option value="Seilbahnwesen">{t('Seilbahnwesen')}</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.category && errors.category.message}</div>
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

export default FormEdit;
