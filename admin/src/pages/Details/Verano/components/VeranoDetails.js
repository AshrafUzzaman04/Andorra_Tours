import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import callFetch from "helpers/callFetch";
import SoftEditor from "components/SoftEditor";
import CreatableSelect from "react-select/creatable";
import { useParams } from "react-router-dom";

const VeranoDetails = ({ formData }) => {
    const { register, setValue, getValues, errors, data } = formData;
    const [details, setDetails] = useState([]);
    const { t } = useTranslation();
    const [refresh, setRefresh] = useState(0);
    const [veranos, setVeranos] = useState([]);
    const [veranoId, setVeranoId] = useState(0);
    const params = useParams();
    const [metaTags, setMetaTags] = useState([]);


    useEffect(() => {
        if (details?.length === 0) {
            setDetails([{ id: 0, title: "", description: "" }])
        }
    }, [0])

    useEffect(() => {
        if (params?.id) {
            callFetch("veranoDeatils/" + params.id + "?for=verano", "GET", []).then((res) => {
                for (let [key, value] of Object.entries(res.data)) {
                    if (key === "meta_tags") {
                        // Ensure meta_tags is an array
                        if (key === "meta_tags") {
                            // Ensure meta_tags is an array
                            const tagsArray = Array.isArray(value)
                                ? value
                                : typeof value === "string"
                                    ? value.split(",")
                                    : [];

                            setMetaTags(tagsArray.map(tag => ({ value: tag, label: tag })));
                            setValue("meta_tags", tagsArray);
                        }
                    }
                }
            });
        }
    }, [params?.id]);

    useEffect(() => {
        callFetch("veranos?for=verano", "GET", []).then((res) => {
            setVeranos(res?.data);
            // if(formData?.params?.id){
            //     setValue("verano", formData?.data?.verano_id)
            // }
        });
        const jsonDetails = getValues("details");
        const handleJSONDetails = (data) => {
            if (typeof data === 'string') {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    return data;
                }
            }
            return data;
        };
        const parsedDetails = handleJSONDetails(jsonDetails);
        if (formData?.params?.id) {
            const savedDetails = handleJSONDetails(formData?.data?.details);
            if (savedDetails && savedDetails.length > 0 && parsedDetails?.length === savedDetails?.length) {
                if (typeof savedDetails === 'string') {
                    setDetails(JSON.parse(savedDetails));
                } else {
                    setDetails(savedDetails);
                }

            } else {
                if (parsedDetails?.length > 0) {
                    setDetails(parsedDetails);
                }
            }
        } else {
            if (parsedDetails?.length > 0) {
                setDetails(parsedDetails);
            }
        }
        setVeranoId(data?.verano_id)
        setValue("verano", data?.verano_id)
    }, [formData?.params?.id, formData.data, getValues]);


    function deleteProduct() {
        var titems = [];
        details.map((t) => {
            if (!t)
                return;
            titems.push(t);
        });
        setDetails(titems);
        setRefresh(refresh + 1);
        setValue("details", details)
    }

    const handleMetaTagsChange = (selectedOptions) => {
        const tagsArray = selectedOptions ? selectedOptions.map(tag => tag.value) : [];
        setMetaTags(selectedOptions);
        setValue("meta_tags", tagsArray);
    };


    return (
        <>
            <div className="row g-3">
                <div className="col-md-6">
                    <div className="form-group">

                        <label>{t("Veranos")} *</label>
                        <select placeholder={t("verano")}
                            {...register("verano", {
                                required: true,
                            })}
                            required className=" form-control" value={veranoId} onChange={(e) => {
                                setVeranoId(e.target.value)
                                setValue("verano", e.target.value)
                            }}>
                            <option>{t("--Select--")}</option>
                            {
                                veranos && veranos?.map((verano, i) => (
                                    <option key={verano?.id} value={verano?.id}>{verano?.title}</option>
                                ))
                            }
                        </select>
                        <div className="invalid-feedback">
                            {errors.verano && errors.verano.message}
                        </div>

                    </div>
                </div>
                <div className="col-md-6">
                    <div class="form-group">
                        <label>{t("Status")} *</label>
                        <select placeholder={t("status")}
                            {...register("status", {
                                required: true,
                            })}
                            required className=" form-control">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <div className="invalid-feedback">
                            {errors.status && errors.status.message}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row ">
                {
                    details && details?.map((detail, index) => {
                        return (
                            <Fragment key={index + 1}>
                                <div className="col-md-12">
                                    <div className="d-flex align-items-center w-100">
                                        <div class="form-group w-100">
                                            <label>{t("Title")} *</label>
                                            <input
                                                type="text"
                                                className="form-control mb-4"
                                                placeholder={t("Title")}
                                                defaultValue={detail?.title}
                                                onChange={(e) => {
                                                    details[index].id = index + 1;
                                                    details[index].title = e.target.value;
                                                    setDetails(details)
                                                    setValue("details", details)
                                                }}
                                            />
                                            <div className="invalid-feedback">
                                                {errors.title && errors.title.message}
                                            </div>
                                        </div>
                                        &nbsp;
                                        <i className="fa-solid fa-circle-xmark text-danger cursor-pointer" data-key={index} onClick={() => { delete details[index]; deleteProduct(); }}></i>
                                    </div>

                                </div>
                                <div className="col-md-12">
                                    <div class="form-group">
                                        <label>{t("Description")} *</label>
                                        <SoftEditor value={detail?.description} onChange={(e) => {
                                            details[index].description = e;
                                            setDetails(details)
                                            setValue("details", details)
                                        }} />
                                        <div className="invalid-feedback">
                                            {errors.description && errors.description.message}
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    })
                }
                <div className="col-md-12">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => setDetails([...details, { id: 0, title: "", description: "" }])}>Add <i class="fas fa-plus"></i> </button>
                </div>
            </div>

            <div className="row g-4">
                <h5 className="mt-4">Seo Settings</h5>
                <div className="col-md-6">
                    <label>{t("Meta Title")} *</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t("Meta Title")}
                        {...register("meta_title", {
                            required: true,
                        })}
                        required
                    />
                    <div className="invalid-feedback">
                        {errors.meta_title && errors.meta_title.message}
                    </div>
                </div>
                <div className="col-md-6">
                    <label>{t("Meta Tags")} (Optional)</label>
                    <CreatableSelect
                        isMulti
                        value={metaTags}
                        onChange={handleMetaTagsChange}
                        className={`basic-multi-select ${errors.meta_tags ? "is-invalid" : ""}`}
                        classNamePrefix="select"
                        placeholder={t("Type and press Enter")}
                    />
                    {errors.meta_tags && <div className="invalid-feedback d-block">{errors.meta_tags.message}</div>}
                </div>
                <div className="col-md-6 mb-3">
                    <label>{t("Meta Description")} *</label>
                    <textarea
                        className="form-control"
                        placeholder={t("Enter Meta Description")}
                        {...register("meta_description", { required: true })}
                        required
                    ></textarea>
                    <div className="invalid-feedback">
                        {errors.meta_description && errors.meta_description.message}
                    </div>
                </div>
            </div>
        </>
    )
}

export default VeranoDetails