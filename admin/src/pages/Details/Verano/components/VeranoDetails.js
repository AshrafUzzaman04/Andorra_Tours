import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import callFetch from "helpers/callFetch";
import SoftEditor from "components/SoftEditor";

const VeranoDetails = ({ formData }) => {
    
    const { register, handleSubmit, setError, setValue, getValues, errors } = formData;
    const [editorContent, setEditorContent] = useState("");
    const [details, setDetails] = useState([]);
    const { t } = useTranslation();
    const [refresh, setRefresh] = useState(0);
    const [veranos, setVeranos] = useState([]);

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    useEffect(() => {
        if(details?.length === 0 ){
            setDetails([{ id: 0, title: "", description: "" }])
        }
    }, [0])

    useEffect(() => {
        callFetch("veranos?for=verano", "GET", []).then((res) => {
            setVeranos(res?.data);
            if(formData?.params?.id){
                setValue("verano", formData?.data?.verano_id)
            }
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
                }else{
                    setDetails(savedDetails);
                }
                
            }else{
                if (parsedDetails?.length > 0) {
                    setDetails(parsedDetails);
                }
            }
        } else {
            if (parsedDetails?.length > 0) {
                setDetails(parsedDetails);
            }
        }
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
    

    return (
        <>
            <div className="row g-3">
                <div className="col-md-6">
                    <div class="form-group">

                        <label>{t("Inveranos")} *</label>
                        <select placeholder={t("verano")}
                            {...register("verano", {
                                required: true,
                            })}
                            required className=" form-control">
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
                            <>
                                <div key={index + 1} className="col-md-12">
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
                            </>
                        )
                    })
                }
                <div className="col-md-12">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => setDetails([...details, { id: 0, title: "", description: "" }])}>Add <i class="fas fa-plus"></i> </button>
                </div>
            </div>
        </>
    )
}

export default VeranoDetails