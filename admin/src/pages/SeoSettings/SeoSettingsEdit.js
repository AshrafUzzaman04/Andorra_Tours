import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import callFetch from "helpers/callFetch";
import CreatableSelect from "react-select/creatable";
const SeoSettingsEdit = () => {
    const params = useParams();
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

    useEffect(() => {
        callFetch("seo-settings/" + params.id, "GET", []).then((res) => {
            Object.entries(res.data).forEach(([key, value]) => {
                if (key === "meta_tags") {
                    // Ensure meta_tags is an array
                    const tagsArray = Array.isArray(value)
                        ? value
                        : typeof value === "string"
                            ? value.split(",")
                            : [];

                    setMetaTags(tagsArray.map(tag => ({ value: tag, label: tag })));
                    setValue("meta_tags", tagsArray);
                } else {
                    setValue(key, value);
                }
            });
        });
    }, [params.id, setValue]);


    const onSubmit = (formData) => {
        setSaving(true);
        callFetch("seo-settings/" + params?.id, "POST", formData, setError).then((res) => {
            setSaving(false);
            console.log(res);
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
                        <h6>{t("Create Update")}</h6>
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
                                    <label>{t("Page Name")} *</label>
                                    <select
                                        className="form-control mb-4"
                                        {...register("page_name", { required: true })}
                                        required
                                    >
                                        <option value="home">{t("Home")}</option>
                                        <option value="about">{t("About")}</option>
                                        <option value="activities">{t("Activities")}</option>
                                        <option value="ski-rental">{t("Ski Rental")}</option>
                                        <option value="winter">{t("Winter")}</option>
                                        <option value="summer">{t("Summer")}</option>
                                        <option value="hotels">{t("Hotels")}</option>
                                        <option value="faq">{t("FAQ")}</option>
                                        <option value="become-expert">{t("Become Expert")}</option>
                                        <option value="contact">{t("Contact")}</option>
                                        <option value="blogs">{t("Blogs")}</option>
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
            </div >
        </div >
    );
};

export default SeoSettingsEdit;
