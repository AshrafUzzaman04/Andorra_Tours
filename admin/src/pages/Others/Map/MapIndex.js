import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";

const MapIndex = () => {
    const { t } = useTranslation();
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(1);
    const [mapData, setMapData] = useState();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const inputRef = useRef(null);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        callFetch("map/show", "GET", []).then((res) => {
            setMapData(res?.data);
        });
    }, [refresh]);

    const onSubmit = (formData) => {
        setSaving(true);
        callFetch(mapData?.id ? "maps/" + mapData?.id : "maps", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
            setRefresh(refresh + 1);
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        });
    };
    return (
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t("Map Upload")}</h6>
                    </div>
                    <div className="card-body">
                        <form
                            className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""
                                }`}
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            autoComplete="off"
                        >

                            {mapData?.id && <input type="hidden" defaultValue="PUT" {...register("_method")} />}
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <div className=" form-group">
                                        <label>{t("Map Photo")} *</label>
                                        <input ref={inputRef} type="file" className="form-control"
                                            {...register("map_photo", { required: mapData?.id ? false:true })}
                                            required={mapData?.id ? false:true} onChange={(e) => setSelectedPhoto(e.target.files[0])} />
                                        <div className="invalid-feedback">
                                            {errors.map_photo && errors.map_photo.message}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className=" form-group">
                                        {(selectedPhoto || mapData?.map_photo) && <img src={
                                            selectedPhoto ?
                                                URL.createObjectURL(selectedPhoto)
                                                :
                                                process.env.REACT_APP_STORAGE_URL + mapData?.map_photo
                                        } alt="map-photo" className="w-100" />}
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

export default MapIndex