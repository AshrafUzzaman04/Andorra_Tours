import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";
import SoftEditor from "components/SoftEditor";

const ResortsCreate = () => {
  const { t } = useTranslation();
  const [editorValue, setEditorValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [refresh, setRefresh] = useState(1);
  const [providers, setProviders] = useState([]);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    callFetch("resorts-provider", "GET", []).then((res) => {
      setProviders(res?.data);
    });
  }, [refresh]);



  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("resorts", "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return submitSuccess ? <Navigate to="/others/resorts" /> : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Resort Create")}</h6>
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
                  <div className=" form-group">
                    <label>{t("Providers")} *</label>
                    <select
                      className="form-control"
                      {...register("providers", { required: true })}
                      required
                    >
                      <option>--Providers--</option>
                      {
                        providers && providers?.map((provider, i) => (
                          <option key={i} value={provider?.id}>{provider?.name}</option>
                        ))
                      }
                    </select>
                    <div className="invalid-feedback">
                      {errors.title && errors.title.message}
                    </div>
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

              <div className="row g-3">
                <div className="col-md-4">
                  <div className=" form-group">
                    <label>{t("Name")} *</label>
                    <input type="text" className="form-control" placeholder="name"
                      {...register("name", { required: true })}
                      required />
                    <div className="invalid-feedback">
                      {errors.name && errors.name.message}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className=" form-group">
                    <label>{t("Country")} *</label>
                    <input type="text" className="form-control" placeholder="Andorra"
                      {...register("country", { required: true })}
                      required />
                    <div className="invalid-feedback">
                      {errors.country && errors.country.message}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className=" form-group">
                    <label>{t("Photo")} *</label>
                    <input type="file" className="form-control"
                      {...register("photo", { required: true })}
                      required />
                    <div className="invalid-feedback">
                      {errors.photo && errors.photo.message}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-4">
                  <div className=" form-group">
                    <label>{t("Height")} *</label>
                    <input type="height" className="form-control" placeholder="2050-2640 m"
                      {...register("height", { required: true })}
                      required />
                    <div className="invalid-feedback">
                      {errors.height && errors.height.message}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>{t("Alpine Skiing")} *</label>
                    <input type="text" className="form-control" placeholder="210 km"
                      {...register("alpine_skiing")}/>
                    <div className="invalid-feedback">
                      {errors.alpine_skiing && errors.alpine_skiing.message}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className=" form-group">
                    <label>{t("Ski Lifts")} *</label>
                    <input type="text" className="form-control" placeholder="65"
                      {...register("ski_lifts")}/>
                    <div className="invalid-feedback">
                      {errors.ski_lifts && errors.ski_lifts.message}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className=" form-group">
                    <label>{t("Clues")} *</label>
                    <input type="text" className="form-control" placeholder="18 | 38 | 32 | 22"
                      {...register("clues")}/>
                    <div className="invalid-feedback">
                      {errors.clues && errors.clues.message}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>{t("Details Title")} *</label>
                    <input type="text" className="form-control" placeholder="title"
                      {...register("details_title")}/>
                    <div className="invalid-feedback">
                      {errors.details_title && errors.details_title.message}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div class="form-group">
                  <label>{t("Description")} *</label>
                  <SoftEditor value={editorValue} onChange={(e) => {
                    setEditorValue(e)
                    setValue("description", e)
                  }} />
                  <div className="invalid-feedback">
                    {errors.description && errors.description.message}
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

export default ResortsCreate