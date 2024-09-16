import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import callFetch from "helpers/callFetch";
const WhyTravelEdit = () => {
  const params = useParams();
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
    if (params?.id) {
      callFetch("why-travels/" + params.id, "GET", []).then((res) => {
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
    callFetch("why-travels/" + params.id, "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return submitSuccess ? <Navigate to="/theme-customization/why-travels" /> : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Create Category Slider")}</h6>
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
              {/* top_sub_title */}
              <div className="row g-3">
                <div className="col-md-4">
                  <label>{t("Title")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("Security Assurance")}
                    {...register("title", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.title && errors.title.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Background Color")} *</label>
                  <input
                    defaultValue="#E4F9F9"
                    type="color"
                    id="style1"
                    className="form-control mb-4 p-0"
                    placeholder={t("#00000")}
                    {...register("background_color", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.background_color && errors.background_color.message}
                  </div>
                </div>
                <div className="col-md-4">
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
                <div className="col-md-12">
                  <label>{t("Logo")} *</label>
                  <input type="file" className="form-control"
                    {...register("logo")} />
                  <div className="invalid-feedback">
                    {errors.logo && errors.logo.message}
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-12">
                  <label>{t("Description")} *</label>
                    <textarea className="form-control" placeholder="description"
                    {...register("description", { required: true })}
                    required rows="3"></textarea>
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

export default WhyTravelEdit