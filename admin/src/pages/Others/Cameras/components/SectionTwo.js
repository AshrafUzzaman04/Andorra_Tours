import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";
import SoftEditor from "components/SoftEditor";

const SectionTwo = ({ updateData }) => {
    const [editorValue, setEditorValue] = useState("");
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
        if (updateData) {
            for (let [key, value] of Object.entries(updateData)) {
                if (key !== "logo" && key !== "map") {
                    if (key === "sub_title") {
                        setEditorValue(value)
                    }else {
                        setValue(key, value);
                    }
                }
            }
        }
    }, [updateData]);

    const onSubmit = (formData) => {
        setSaving(true);
        formData.sub_title = editorValue
        callFetch("webcams/" + updateData?.id, "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };
    return submitSuccess ? <Navigate to="/others/cameras" /> : (
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t("Section Two")}</h6>
                    </div>
                    <div className="card-body">
                        <form
                            className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""
                                }`}
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            autoComplete="off"
                        >
                            <input type="hidden" defaultValue="PUT" {...register("_method")} />

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>{t("Title")} *</label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t("title")}
                                        {...register("title", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.title && errors.title.message}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label>{t("Status")} *</label>
                                    <select
                                        className="form-control"
                                        {...register("status", { required: true })}
                                        required
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        {errors.status && errors.status.message}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label>{t("Map Photo")} *</label>
                                    <input type="file" className="form-control"
                                        {...register("map")} />
                                    <div className="invalid-feedback">
                                        {errors.map && errors.map.message}
                                    </div>
                                </div>
                            </div>

                            <div className="row g-3 mt-3">
                                <div className="form-group">
                                    <label>{t("Sub Title")} *</label>
                                    <SoftEditor value={editorValue} onChange={(e) => {
                                        setEditorValue(e)
                                        setValue("sub_title", e)
                                    }} />
                                    <div className="invalid-feedback">
                                        {errors.sub_title && errors.sub_title.message}
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mb-4 mt-3">
                                {!saving && (
                                    <button type="submit" className="btn btn-primary float-end">
                                        {t("Save")}
                                    </button>
                                )}
                                {saving && (
                                    <button type="submit" className="btn btn-disabled float-end" disabled>
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


export default SectionTwo