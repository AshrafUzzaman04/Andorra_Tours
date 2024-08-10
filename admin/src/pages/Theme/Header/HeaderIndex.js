import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import callFetch from "helpers/callFetch";
import DarkLogoForm from "./DarkLogoForm";
import LightLogoForm from "./LightLogoForm";
import LanguageIndex from "./Languages/LanguageIndex";
import LanguageIndexTable from "./Languages/LanguageIndexTable";
import LanguageCreateModal from "./Languages/LanguageCreateModal";
import HeaderManagment from "./Notifications";
const HeaderIndex = () => {
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
        <>
            <div className="row mt-5">
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t("Light Logo")}</h6>
                        </div>
                        <LightLogoForm/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t("Dark Logo")}</h6>
                        </div>
                        <DarkLogoForm/>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t("Languages")}</h6>
                        </div>
                        <div className="ms-auto">
                            <button className="btn btn-primary me-2" type="button" data-bs-toggle="modal" data-bs-target="#customerCategoryModal" >{t('Add')}</button>
                        </div>
                        <LanguageIndexTable/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card mb-4">
                        {/* <div className="card-header pb-0">
                            <h6>{t("Manage Items")}</h6>
                        </div> */}
                        <HeaderManagment/>
                    </div>
                </div>
            </div>
            <LanguageCreateModal refreshParent={() => setRefresh(refresh + 1)}/>
        </>
    );
};

export default HeaderIndex;
