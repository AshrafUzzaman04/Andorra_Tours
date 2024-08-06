import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { callFetch } from "../../helpers/callFetch";
import { useTranslation } from 'react-i18next';

function ProductEdit() {
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
        callFetch("products/" + params.id + "/edit", "GET", []).then((res) => {
            for (let [key, value] of Object.entries(res.data)) {
                setValue(key, value);
            }
        });
    }, []);

    const onSubmit = (formData) => {
        setSaving(true);
        callFetch('products/' + params.id, "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };

    return submitSuccess ? <Navigate to='/product-management/products' /> :
        <div className="row">
            <div className="col-md-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t('Edit Label Stock')}</h6>
                    </div>
                    <div className="card-body">
                        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <input type="hidden" defaultValue="PUT" {...register("_method")} />

                            <div className="row g-3">
                                <div className="col-md-4">
                                    <label>{t('Product Number')} *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={t('eg: 500001')}
                                        {...register("identity_number", {
                                            required: true,
                                        })}
                                        readOnly
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.identity_number && errors.identity_number.message}</div>
                                </div>
                                <div className="col-md-4">
                                    <label>{t('Label Stock')} *</label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. Label Stock')}
                                        {...register("label_stock", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                                </div>
                                <div className="col-md-4">
                                    <label>{t('P/N')} *</label>
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            className="form-control mb-4"
                                            placeholder={t('eg. P/N')}
                                            {...register("p_n", {
                                                required: true,
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="invalid-feedback">{errors.price && errors.price.message}</div>
                                </div>
                                <div className="col-md-3">
                                    <label>{t('MSI')} *</label>
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            className="form-control mb-4"
                                            placeholder={t('eg. MSI')}
                                            {...register("msi", {
                                                required: true,
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="invalid-feedback">{errors.price && errors.price.message}</div>
                                </div>
                                <div className="col-md-3">
                                    <label>{t('Width')} *</label>
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            className="form-control mb-4"
                                            placeholder={t('eg. 00')}
                                            {...register("width", {
                                                required: true,
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="invalid-feedback">{errors.price && errors.price.message}</div>
                                </div>
                                <div className="col-md-3">
                                    <label>{t('Cost Per Leniea Inch')} *</label>
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            className="form-control mb-4"
                                            placeholder={t('eg. Cost Per Leniea Inch')}
                                            {...register("cost_per_leniea_inch", {
                                                required: true,
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="invalid-feedback">{errors.price && errors.price.message}</div>
                                </div>
                                <div className="col-md-3">
                                    <label>{t('Aztec Label Webpage')} *</label>
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            className="form-control mb-4"
                                            placeholder={t('eg. 00')}
                                            {...register("aztec_label_webpage")}
                                        />
                                    </div>
                                    <div className="invalid-feedback">{errors.aztec_label_webpage && errors.aztec_label_webpage.message}</div>
                                </div>
                                <div className="col-md-12">
                                    <label>{t('Description')}</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder={t('eg. Product Description')}
                                        {...register("description")}></textarea>
                                    <div className="invalid-feedback">{errors.description && errors.description.message}</div>
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>;
}

export default ProductEdit;