import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";

const HeadingTestimonials = () => {
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
  useEffect(() => {
    callFetch("section-heading/testimonials", "GET", []).then((res) => {
      if (res.data){
        for (let [key, value] of Object.entries(res.data)) {
          setValue(key, value);
        }
      }
    });
  }, [submitSuccess]);
  
  const onSubmit = (formData) => {
    setSaving(true);
    formData.heading_for = "testimonials"
    callFetch("section-heading", "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return(
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Heading")}</h6>
          </div>
          <div className="card-body">
            <form
              className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""
                }`}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              {/* top_sub_title */}
              <div className="row g-3">
                <div className="col-md-6">
                  <label>{t("Heading")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("AD500, Andorra la Vella, la Margineda")}
                    {...register("heading")}
                  />
                  <div className="invalid-feedback">
                    {errors.heading && errors.heading.message}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>{t("Sub Heading")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("Hours: 8:00 - 17:00, Mon - Sat")}
                    {...register("sub_heading")}
                  />
                  <div className="invalid-feedback">
                    {errors.sub_heading && errors.sub_heading.message}
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

export default HeadingTestimonials