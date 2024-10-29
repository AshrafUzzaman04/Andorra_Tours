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
    const [benefits, setBenefits] = useState({ title: "", benefits: [{ benefit: "" }], voucer_title: "" });
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
                if (key !== "image") {
                    if (key === "sub_title") {
                        setEditorValue(value)
                    } else if (key === "company_benifits") {
                        setBenefits(JSON.parse(value) || []);
                    } else {
                        setValue(key, value);
                    }
                }
            }
        }
        //setPricingCards(JSON.parse("[{\"title\":\"1 Sitio Alta\",\"sub_title\":\"Alta en portal turistico\",\"tag\":\"Básico\",\"price\":\"39.99\",\"duration\":\"Mensual\",\"button_text\":\"Lo quiero\"}]"))
    }, [updateData]);

    const handleBenefitsCardChange = (index, value) => {
        const updatedBenefits = benefits.benefits.map((item, idx) =>
            idx === index ? { benefit: value } : item
        );
        setBenefits(prevState => ({
            ...prevState,
            benefits: updatedBenefits
        }));
        setValue("company_benifits", JSON.stringify({ ...benefits, benefits: updatedBenefits }));
    };
    
    const deleteProduct = (indexToDelete) => {
        const updatedBenefits = benefits.benefits.filter((_, index) => index !== indexToDelete);
        setBenefits(prevState => ({
            ...prevState,
            benefits: updatedBenefits
        }));
        setValue("company_benifits", JSON.stringify({ ...benefits, benefits: updatedBenefits }));
    };
    
    const addBenefit = () => {
        setBenefits(prevState => ({
            ...prevState,
            benefits: [...(prevState.benefits || []), { benefit: "" }]
        }));
        setValue("company_benifits", JSON.stringify({ ...benefits, benefits: [...(benefits.benefits || []), { benefit: "" }] }));
    };

    const onSubmit = (formData) => {
        setSaving(true);
        formData.company_benifits = JSON.stringify(benefits)
        callFetch("company-promotions/" + updateData?.id, "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };
    return submitSuccess ? <Navigate to="/others/partners" /> : (
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
                                    <div className="form-group">
                                        <div className="w-100">
                                            <label>Benefit Title *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="BENEFET FOR THE COMPANY"
                                                value={benefits?.title}
                                                onChange={(e) => setBenefits({ ...benefits, title: e.target.value })}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                {errors.title && errors.title.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    {benefits?.benefits?.map((benefit, index) => (
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-12">
                                                <div className="d-flex align-items-center w-100">
                                                    <div className="w-100">
                                                        <label>
                                                            {`Benefit (${index + 1})`} *

                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="POPULER"
                                                            value={benefit.benefit}
                                                            onChange={(e) => handleBenefitsCardChange(index, e.target.value)}
                                                            required
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errors.benefit && errors.benefit.message}
                                                        </div>
                                                    </div>
                                                    &nbsp;
                                                    <i
                                                        className="fa-solid fa-circle-xmark text-danger cursor-pointer mt-4"
                                                        onClick={() => deleteProduct(index)}
                                                    ></i>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="col-md-12 mt-3">
                                    <button type="button" className="btn btn-sm btn-primary" onClick={addBenefit}>
                                        Add <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <div className="w-100">
                                            <label>Voucer Title *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="VOUCER MODEL"
                                                value={benefits?.voucer_title}
                                                onChange={(e) => setBenefits({ ...benefits, voucer_title: e.target.value })}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                {errors.voucer_title && errors.voucer_title.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label>{t("Image")} *</label>
                                    <input type="file" className="form-control"
                                        {...register("image")} />
                                    <div className="invalid-feedback">
                                        {errors.image && errors.image.message}
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 mt-3">
                                <div className="form-group">
                                    <label>{t("Description")} *</label>
                                    <SoftEditor value={editorValue} onChange={(e) => {
                                        setEditorValue(e)
                                        setValue("sub_title", e)
                                    }} />
                                    <div className="invalid-feedback">
                                        {errors.description && errors.description.message}
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