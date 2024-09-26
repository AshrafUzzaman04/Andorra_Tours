import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import callFetch from "helpers/callFetch";
const VeranoEdit = () => {
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
    if(params?.id){
        callFetch("verano/" + params.id, "GET", []).then((res) => {
            for (let [key, value] of Object.entries(res.data)) {
                if(key !== "photo" && value !== "null"){
                    setValue(key, value);
                }
                
            }
        });
    }
}, [params?.id]);

  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("verano/"+params.id, "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
  });
  };
  return submitSuccess ? (
    <Navigate to="/theme-customization/verano" />
  ) : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Edit Verano")}</h6>
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
                <div className="col-md-4">
                  <label>{t("Label")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("Label")}
                    {...register("label", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.label && errors.label.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Reviews Point")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("4.9")}
                    {...register("reviews", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.reviews && errors.reviews.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Total Reviews")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("0000")}
                    {...register("total_reviews", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.total_reviews && errors.total_reviews.message}
                  </div>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label>{t("Reviews Link")} </label>
                  <input type="text" className="form-control" placeholder="https://example.com"
                    {...register("reviews_link")}/>
                  <div className="invalid-feedback">
                    {errors.reviews_link && errors.reviews_link.message}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>{t("Title")} *</label>
                  <input type="text" className="form-control" placeholder="Title"
                    {...register("title", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.title && errors.title.message}
                  </div>
                </div>
              </div>

              <div className="row g-3 mt-2">
                <div className="col-md-6">
                  <label>{t("Price")} *</label>
                  <input type="text" className="form-control" placeholder="00.00"
                    {...register("price", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.price && errors.price.message}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>{t("Photo")} *</label>
                  <input type="file" className="form-control" placeholder="https://booking.com"
                    {...register("photo")}
                    />
                  <div className="invalid-feedback">
                    {errors.photo && errors.photo.message}
                  </div>
                </div>
              </div>
              <div className="row g-3 mt-2">
                <div className="col-md-16">
                  <label>{t("Booking Link")} </label>
                  <input type="text" className="form-control" placeholder="https://booking.com"
                    {...register("booking_link")}/>
                  <div className="invalid-feedback">
                    {errors.booking_link && errors.booking_link.message}
                  </div>
                </div>
                <div className="col-md-16">
                  <label>{t("Status")} *</label>
                  <select type="text" className="form-control" placeholder="https://booking.com"
                    {...register("status", { required: true })}
                    required>
                      <option value="Active">{t("Active")}</option>
                      <option value="Inactive">{t("Inactive")}</option>
                  </select>
                  <div className="invalid-feedback">
                    {errors.status && errors.status.message}
                  </div>
                </div>
              </div>

              <div className="col-12 mb-4 mt-3">
                {!saving && (
                  <button type="submit" className="btn btn-primary">
                    {t("Save")}
                  </button>
                )}
                {saving && (
                  <button type="submit" className="btn btn-disabled" disabled>
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

export default VeranoEdit