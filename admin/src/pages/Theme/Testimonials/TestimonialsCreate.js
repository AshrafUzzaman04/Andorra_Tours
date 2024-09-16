import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";

const TestimonialsCreate = () => {
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
    callFetch("testimonial", "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return submitSuccess ? <Navigate to="/theme-customization/testimonials" /> : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Create Testimonial")}</h6>
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
                <div className="col-md-4">
                  <label>{t("Client Name")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("client_name")}
                    {...register("client_name", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.client_name && errors.client_name.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Client Address")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("california")}
                    {...register("client_address", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.client_address && errors.client_address.message}
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

              <div className="row g-3">
                <div className="col-md-4">
                  <label>{t("Client Photo")} *</label>
                  <input type="file" className="form-control"
                    {...register("client_photo", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.client_photo && errors.client_photo.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Review Title")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("review title")}
                    {...register("review_title", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.review_title && errors.review_title.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Reviews")} *</label>
                  <select
                    class="form-control"
                    {...register("reviews", { required: true })}
                    required
                  >
                    <option value="1">&#9733;</option>
                    <option value="2">&#9733;&#9733;</option>
                    <option value="3">&#9733;&#9733;&#9733;</option>
                    <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
                    <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                  </select>
                  <div className="invalid-feedback">
                    {errors.status && errors.status.message}
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-12">
                  <label>{t("Review Text")} *</label>
                  <textarea class="form-control" {...register("review_text", { required: true })}
                    required rows="3"></textarea>
                  <div className="invalid-feedback">
                    {errors.review_text && errors.review_text.message}
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


export default TestimonialsCreate