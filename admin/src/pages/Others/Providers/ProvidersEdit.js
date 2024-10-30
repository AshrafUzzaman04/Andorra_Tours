import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import callFetch from "helpers/callFetch";

const ProvidersEdit = () => {
  const params = useParams();
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    if (params?.id) {
      callFetch("providers/" + params.id, "GET", []).then((res) => {
        for (let [key, value] of Object.entries(res.data)) {
          if (key !== "logo") {
            setValue(key, value);
          }
        }
      });
    }
  }, [params?.id]);


  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("providers/" + params?.id, "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return submitSuccess ? <Navigate to="/others/providers" /> : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Create Provider")}</h6>
          </div>
          <div className="card-body">
            <form
              className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""
                }`}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              <input type="hidden" defaultValue="PUT" {...register("_method")} />
              <div className="row g-3">
                <div className="col-md-6">
                  <label>{t("Name")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("name")}
                    {...register("name", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.name && errors.name.message}
                  </div>
                </div>

                <div className="col-md-6">
                  <label>{t("Status")} *</label>
                  <select
                    className="form-control"
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
                  <label>{t("Provider For")} *</label>
                  <select
                    className="form-control"
                    {...register("provider_for", { required: true })}
                    required
                  >
                    <option>--Select--</option>
                    <option value="Webcams">Webcams</option>
                    <option value="Resorts">Resorts</option>
                  </select>
                  <div className="invalid-feedback">
                    {errors.provider_for && errors.provider_for.message}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>{t("Logo")} *</label>
                  <input type="file" className="form-control"
                    {...register("logo")}/>
                  <div className="invalid-feedback">
                    {errors.logo && errors.logo.message}
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
export default ProvidersEdit