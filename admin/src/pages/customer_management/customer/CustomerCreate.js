import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { callFetch } from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import CustomerCategoryModal from "./CustomerCategoryModal";

import AddressMap from "../../Map/AddressMap";

function CustomerCreate() {
    const { t } = useTranslation();
    const [customerCategories, setCustomerCategories] = useState([]);
    const [contactPersons, setContactPersons] = useState([{ name: '', gender: '', emails: [''], phones: [''] }]);
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const [latlang, setLangLat] = useState({})

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();


    const onSubmit = (formData) => {
        setSaving(true);
        callFetch("admins", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };

    const AddressHandle = (event) => {
        setLangLat({ latitude: event.latLng.lat(), longitude: event.latLng.lng() })
    }

    return submitSuccess ? <Navigate to='/customer-management/customers' /> :
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t('Add User')}</h6>
                    </div>
                    <div className="card-body">
                        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <div className="row g-3">
                            <div className="col-md-4">
                                    <label>
                                        {t('Name')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. Google')}
                                        {...register("name", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                                </div>
                                <div className="col-md-4">
                                    <label>
                                        {t('Email')}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. email@mail.com')}
                                        {...register("email")}
                                    />
                                    <div className="invalid-feedback">{errors.email && errors.email.message}</div>
                                </div>
                                <div className="col-md-4">
                                    <label>
                                        {t('Gender')}
                                    </label>
                                    <select
                                            className="form-control"
                                            {...register("gender", {
                                                required: true
                                            })}
                                            required
                                        >
                                            <option value="">--</option>
                                            <option value="Male">{t('Male')}</option>
                                            <option value="Female">{t('Female')}</option>
                                            <option value="Others">{t('Others')}</option>
                                        </select>
                                    <div className="invalid-feedback">{errors.gender && errors.gender.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>{t('Password')}</label>
                                    <input type="password" className="form-control mb-4" {...register("password", { required: true })} required placeholder="password" />
                                    <div className="invalid-feedback">{errors.password && errors.password.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <label>
                                        {t('Phone')}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. 98765432')}
                                        {...register("phone")}
                                    />
                                    <div className="invalid-feedback">{errors.phone && errors.phone.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
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

                                <div className="col-md-6">

                                    <label>{t('Photo')}</label>
                                    <input type="file" className="form-control mb-4" {...register("photo")} />
                                    <div className="invalid-feedback">{errors.photo && errors.photo.message}</div>
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

export default CustomerCreate;
