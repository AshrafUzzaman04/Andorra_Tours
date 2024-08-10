import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import callFetch from "helpers/callFetch";

const LightLogoForm = () => {
    const { t } = useTranslation();
    const [editorValue, setEditorValue] = useState("");
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
        callFetch("categories", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };
    return (
        <form
            className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""
                }`}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
        >
            <div className="card-body p-4">
                <div class="form-group">
                    <label htmlFor="lightLogo">Select logo</label>
                    <input type="file" className="form-control" id="lightLogo" placeholder="" {...register("light_logo", { required: true })} required />
                    <div className="invalid-feedback">
                        {errors.light_logo && errors.light_logo.message}
                    </div>
                </div>

                <div className="text-center">
                    <img className="img-fluid w-50" src="https://travel.ownchoose.com/assets/imgs/template/light_tours_andorra.png" alt="light-logo"/>
                </div>
            </div>
            <div className="card-footer">
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
    )
}

export default LightLogoForm