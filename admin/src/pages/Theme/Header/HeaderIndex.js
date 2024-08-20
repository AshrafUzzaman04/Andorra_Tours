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
import Cookies from "js-cookie";
const HeaderIndex = () => {
    const { t } = useTranslation();
    const [headerData, setHeaderData] = useState({});
    const [modalTitle, setModalTitle] = useState({modalTitle: "Language Create"})
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
    useEffect(() => {
        callFetch("headers","GET",[]).then((res)=>{
            setHeaderData(res?.data);
        });
    },[refresh]);
    // useEffect(() => {
    //     callFetch(`/getAllLanguages/${JSON.parse(Cookies.get('lang')).lang}/translations.json`).then((res)=>{
    //         console.log(res)
    //         //i18n.addResourceBundle(currentLanguage, 'translation', data, true, true);
    //     });
    //   }, [JSON.parse(Cookies.get('lang')).lang]);

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
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t("Light Logo")}</h6>
                        </div>
                        <LightLogoForm refreshParent={()=>setRefresh(refresh + 1)} headerData={headerData}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t("Dark Logo")}</h6>
                        </div>
                        <DarkLogoForm headerData={headerData} refreshParent={()=>setRefresh(refresh + 1)}/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t("Languages")}</h6>
                        </div>
                        <div className="ms-auto">
                            <button className="btn btn-primary me-2" onClick={()=>setModalTitle({modalTitle:"Language Create"})} type="button" data-bs-toggle="modal" data-bs-target="#customerCategoryModal" >{t('Add')}</button>
                        </div>
                        <LanguageIndexTable modalTitle={modalTitle}/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card mb-4">
                        {/* <div className="card-header pb-0">
                            <h6>{t("Manage Items")}</h6>
                        </div> */}
                        <HeaderManagment headerData={headerData} refreshParent={()=>setRefresh(refresh + 1)}/>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default HeaderIndex;
