import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";
import SoftEditor from "components/SoftEditor";
import { Divider } from "@mui/material";

const SectionOne = ({ updateData }) => {
    const [editorValue, setEditorValue] = useState("");
    const { t } = useTranslation();
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [categories, setCategories] = useState([]);
    const [pricingCards, setPricingCards] = useState([{ title: "", sub_title: "", tag: "", price: 0, duration: "", button_text: "" }]);
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
                    } else if (key === "pricing_cards") {
                        setPricingCards(JSON.parse(value) || []);
                    } else {
                        setValue(key, value);
                    }
                }
            }
        }
        //setPricingCards(JSON.parse("[{\"title\":\"1 Sitio Alta\",\"sub_title\":\"Alta en portal turistico\",\"tag\":\"Básico\",\"price\":\"39.99\",\"duration\":\"Mensual\",\"button_text\":\"Lo quiero\"}]"))
    }, [updateData]);

    const handlePricingCardChange = (index, field, value) => {
        const updatedCards = [...pricingCards];
        updatedCards[index][field] = value;
        setPricingCards(updatedCards);
        setValue(`pricing_cards`, JSON.stringify(updatedCards)); // Update the entire pricingCards array in useForm
    };

    function deleteProduct() {
        var titems = [];
        pricingCards.map((t) => {
            if (!t)
                return;
            titems.push(t);
        });
        setPricingCards(titems);
        setRefresh(refresh + 1);
        setValue("pricing_cards", JSON.stringify(titems))
    }

    const onSubmit = (formData) => {
        setSaving(true);
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
                        <h6>{t("Section One")}</h6>
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

                            <div className="row">
                                <div className="col-md-12">
                                    {
                                        pricingCards && pricingCards.map((card, index) => (
                                            <div key={index} className={`card ${index >= 1 && 'mt-3'} shadow-sm p-2 px-4`}>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-4">
                                                        <label>{t("Title (" + (index + 1) + ")")} *</label>
                                                        <input type="text" className="form-control" placeholder="Title"
                                                            value={card.title}
                                                            onChange={(e) => handlePricingCardChange(index, 'title', e.target.value)}
                                                            required
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errors.tag && errors.tag.message}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label>{t("Sub Title (" + (index + 1) + ")")} *</label>
                                                        <input type="text" className="form-control" placeholder="Sub Title"
                                                            value={card.sub_title}
                                                            onChange={(e) => handlePricingCardChange(index, 'sub_title', e.target.value)}
                                                            required
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errors.sub_title && errors.sub_title.message}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div class="d-flex align-items-center w-100">
                                                            <div className="w-100">
                                                                <label className="d-flex align-items-center justify-content-between">
                                                                    {t("Tag (" + (index + 1) + ")")} *
                                                                    &nbsp;
                                                                    <i className="fa-solid fa-circle-xmark text-danger cursor-pointer" data-key={index} onClick={() => { delete pricingCards[index]; deleteProduct(); }}></i>
                                                                </label>
                                                                <input type="text" className="form-control" placeholder="POPULER"
                                                                    value={card.tag}
                                                                    onChange={(e) => handlePricingCardChange(index, 'tag', e.target.value)}
                                                                    required
                                                                />
                                                                <div className="invalid-feedback">
                                                                    {errors.tag && errors.tag.message}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>{t("Price (" + (index + 1) + ")")} *</label>
                                                        <input type="text" className="form-control" placeholder="00.00"
                                                            value={card.price}
                                                            onChange={(e) => handlePricingCardChange(index, 'price', e.target.value)}
                                                            required
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errors.price && errors.price.message}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>{t("Duration (" + (index + 1) + ")")} *</label>
                                                        <input type="text" className="form-control" placeholder="Month/Year"
                                                            value={card.duration}
                                                            onChange={(e) => handlePricingCardChange(index, 'duration', e.target.value)}
                                                            required
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errors.price && errors.price.message}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label>{t("Button Text (" + (index + 1) + ")")} *</label>
                                                        <input type="text" className="form-control" placeholder="Buy"
                                                            value={card.button_text}
                                                            onChange={(e) => handlePricingCardChange(index, 'button_text', e.target.value)}
                                                            required
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errors.button_text && errors.button_text.message}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="col-md-12 mt-3">
                                    <button type="button" className="btn btn-sm btn-primary" onClick={() => setPricingCards([...pricingCards, { title: "", sub_title: "", tag: "", price: 0, duration: "", button_text: "" }])}>Add <i class="fas fa-plus"></i> </button>
                                </div>
                            </div>

                            <div className="row g-3">
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

export default SectionOne