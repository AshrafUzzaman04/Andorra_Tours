import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "flatpickr/dist/themes/material_green.css";
const Pricing = ({ formData }) => {
    const { register, handleSubmit, setError, setValue, getValues, errors } = formData;
    const [pricing, setPricing] = useState([]);
    const { t } = useTranslation();
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        if (pricing?.length === 0) {
            setPricing([{ id: 0, day: "", online_price: "", shop_price: "" }])
        }
    }, [0])

    useEffect(() => {
        const jsonDetails = getValues("pricing");
        if (jsonDetails?.length > 0) {
            setPricing(JSON.parse(jsonDetails))
        }
    }, [0])


    function deleteProduct() {
        var titems = [];
        pricing.map((t) => {
            if (!t)
                return;
            titems.push(t);
        });
        setPricing(titems);
        setRefresh(refresh + 1);
        setValue("pricing", JSON.stringify(titems))
    }
    
    return (
        <>
            <div className="row">
                {
                    pricing && pricing?.map((price, i) => (
                        
                        <>
                            <div key={i} className="col-md-4">
                                <label>{t("Day")} *</label>
                                <input
                                    type="text"
                                    className="form-control mb-4"
                                    placeholder={t("0000")}
                                    defaultValue={price?.day}
                                    onChange={(e) => {
                                        pricing[i].id = i + 1;
                                        pricing[i].day = e.target.value;
                                        setPricing(pricing)
                                        setValue("pricing", JSON.stringify(pricing))
                                    }}
                                />
                                <div className="invalid-feedback">
                                    {errors.pricing && errors.pricing.message}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex align-items-center w-100">
                                    <div class="form-group w-100">
                                        <label>{t("Online Price")} *</label>
                                        <input
                                            type="number"
                                            className="form-control mb-4"
                                            placeholder={t("0000")}
                                            defaultValue={price?.online_price}
                                            onChange={(e) => {
                                                pricing[i].id = i + 1;
                                                pricing[i].online_price = e.target.value;
                                                setPricing(pricing)
                                                setValue("pricing", JSON.stringify(pricing))

                                            }}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.online_price && errors.online_price.message}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4">
                                <div className="d-flex align-items-center w-100">
                                    <div class="form-group w-100">
                                        <label>{t("Shop Price")} *</label>
                                        <input
                                            type="number"
                                            className="form-control mb-4"
                                            placeholder={t("0000")}
                                            defaultValue={price?.shop_price}
                                            onChange={(e) => {
                                                pricing[i].id = i + 1;
                                                pricing[i].shop_price = e.target.value;
                                                setPricing(pricing)
                                                setValue("pricing", JSON.stringify(pricing))

                                            }}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.shop_price && errors.shop_price.message}
                                        </div>
                                    </div>
                                    &nbsp;
                                    <i className="fa-solid fa-circle-xmark text-danger cursor-pointer" data-key={i} onClick={() => { delete pricing[i]; deleteProduct(); }}></i>
                                </div>

                            </div>

                        </>
                    ))
                }
                <div className="col-md-12">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => setPricing([...pricing, { id: 0, day: "", online_price: "", shop_price: "" }])}>Add <i class="fas fa-plus"></i> </button>
                </div>
            </div>
        </>
    )
}

export default Pricing