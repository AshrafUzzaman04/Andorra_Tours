import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";
const CouponCreate = () => {
    const [editorValue, setEditorValue] = useState("");
    const { t } = useTranslation();
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [title, setTitle] = useState([{ title: "" }]);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = (formData) => {
        setSaving(true);
        console.log(formData);
        callFetch("coupons", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };
    return submitSuccess ? (
        <Navigate to="/coupons" />
    ) : (
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t("Create Coupon")}</h6>
                    </div>
                    <div className="card-body">
                        <form
                            className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""
                                }`}
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            autoComplete="off"
                        >
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>{t("Coupon Code")} *</label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t("Coupon Code")}
                                        {...register("code", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.code && errors.code.message}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label>{t("Discount Percentage")} (%) *</label>
                                    <input type="number" className="form-control" placeholder={t("Percentage %")}
                                        {...register("percentage", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.percentage && errors.percentage.message}
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mb-4 mt-3">
                                {!saving && (
                                    <button type="submit" className="btn btn-primary">
                                        {t("Save")}
                                    </button>
                                )}
                                {saving && (
                                    <button type="submit" className="btn btn-disabled" disabled>
                                        {t("Saving ...")}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CouponCreate;
