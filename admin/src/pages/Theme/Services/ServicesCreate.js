import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";
const ServicesCreate = () => {
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
    callFetch("service", "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return submitSuccess ? <Navigate to="/theme-customization/servcios-exclusivos" /> : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Create Service")}</h6>
          </div>
          <div className="card-body">
            <form
              className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""
                }`}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <label>{t("Service Name")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("service name")}
                    {...register("service_name", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.service_name && errors.service_name.message}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>{t("Status")} *</label>
                  <select
                    class="form-control"
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

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label>{t("Service Image")} *</label>
                  <input type="file" className="form-control"
                    {...register("service_image", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.service_image && errors.service_image.message}
                  </div>
                </div>

                <div className="col-md-6">
                  <label>{t("Total Services")} *</label>
                  <input type="text" className="form-control" placeholder="0000"
                    {...register("total_services", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.total_services && errors.total_services.message}
                  </div>
                </div>

              </div>

              <div className="row g-3 mt-2">
                <div className="col-md-12">
                  <label>{t("Service Link")} *</label>
                  <input type="text" className="form-control" placeholder="https://toursandorra.com"
                    {...register("service_link", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.service_link && errors.service_link.message}
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

export default ServicesCreate