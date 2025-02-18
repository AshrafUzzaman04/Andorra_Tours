import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";
import CreatableSelect from "react-select/creatable";
const SeoSettingsCreate = () => {
    const { t } = useTranslation();
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [metaTags, setMetaTags] = useState([]);

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
        callFetch("seo-settings", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };

    const handleMetaTagsChange = (selectedOptions) => {
        const newTags = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setMetaTags(selectedOptions);
        setValue("meta_tags", newTags); // Store as an array
    };
    return submitSuccess ? (
        <Navigate to="/seo-settings" />
    ) : (
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t("Create Seo Details")}</h6>
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
                                    <label>{t("Page Name")} *</label>
                                    <select
                                        className="form-control mb-4"
                                        {...register("page_name", { required: true })}
                                        required
                                    >
                                        <option value="">{t("Select Page")}</option>
                                        <option value="home">{t("Home")}</option>
                                        <option value="ski-rental">{t("Ski Rental")}</option>
                                        <option value="winter">{t("Winter")}</option>
                                        <option value="summer">{t("Summer")}</option>
                                        <option value="blogs">{t("Blogs")}</option>
                                        <option value="hotels">{t("Hotels")}</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        {errors.page_name && errors.page_name.message}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label>{t("Meta Title")} *</label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t("Meta Title")}
                                        {...register("seo_title", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        {errors.seo_title && errors.seo_title.message}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label>{t("Meta Tags")} (Optional)</label>
                                    <CreatableSelect
                                        isMulti
                                        value={metaTags}
                                        onChange={handleMetaTagsChange}
                                        className={`basic-multi-select mb-4 ${errors.meta_tags ? "is-invalid" : ""}`}
                                        classNamePrefix="select"
                                        placeholder={t("Type and press Enter")}
                                    />
                                    {errors.meta_tags && <div className="invalid-feedback d-block">{errors.meta_tags.message}</div>}
                                </div>
                                <div className="col-md-6">
                                    <label>{t("Meta Description")} *</label>
                                    <textarea
                                        className="form-control mb-4"
                                        placeholder={t("Enter Meta Description")}
                                        {...register("meta_description", { required: true })}
                                        required
                                    ></textarea>
                                    <div className="invalid-feedback">
                                        {errors.meta_description && errors.meta_description.message}
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
export default SeoSettingsCreate;
