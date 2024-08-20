import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import callFetch from "helpers/callFetch";
import HeroIndexTable from "./HeroIndexTable";
const HeroIndex = () => {
  const [editorValue, setEditorValue] = useState("");
  const { t } = useTranslation();
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
    callFetch("hero-sliders", "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return (
    <>
    <div className="d-sm-flex justify-content-between">
        <div>
            <NavLink to="/theme-customization/hero/create" className="btn btn-icon btn-primary">
                {t('Add Hero Slider')}
            </NavLink>
        </div>
    </div>
    <div className="row">
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header pb-0">
                    <h6>{t('All Hero Slider')}</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                    <HeroIndexTable/>
                </div>
            </div>
        </div>
    </div>
</>
  );
};
export default HeroIndex