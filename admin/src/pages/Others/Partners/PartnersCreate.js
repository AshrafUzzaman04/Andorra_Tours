import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";
import SoftEditor from "components/SoftEditor";

const PartnersCreate = () => {
  const [editorValue, setEditorValue] = useState("");
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [categories, setCategories] = useState([]);
  const [pricingCards, setPricingCards] = useState([{title: "",sub_title: "",tag: "",price: 0,duration: "",button_text: ""}]);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (refresh === 0) {
      callFetch("hotel/create", "GET", []).then((res) => {
        if (!res.ok) return;
        setCategories(res?.categories);
        setRefresh(1)
      });
    }
  }, [refresh])

  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("hotels", "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return submitSuccess ? <Navigate to="/partners" /> : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Design Partner")}</h6>
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
                  <label>{t("Title")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("title")}
                    {...register("title", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.title && errors.title.message}
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
                <div className="col-md-4">
                  <label>{t("Category")} *</label>
                  <select
                    class="form-control"
                    {...register("categorie", { required: true })}
                    required
                  >
                    <option>---Select---</option>
                    {
                      categories && categories?.map((category, i) => (
                        <option key={i} value={category?.id}>{category?.title}</option>
                      ))
                    }
                  </select>
                  <div className="invalid-feedback">
                    {errors.categorie && errors.categorie.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Photo")} *</label>
                  <input type="file" className="form-control"
                    {...register("photo", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.photo && errors.photo.message}
                  </div>
                </div>

                <div className="col-md-4">
                  <label>{t("Tag")} *</label>
                  <input type="text" className="form-control" placeholder="Top Hotel"
                    {...register("tag", { required: true })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.tag && errors.tag.message}
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div class="form-group">
                  <label>{t("Description")} *</label>
                  {/* <textarea class="form-control" rows="3" placeholder="Description" {...register("description", { required: true })}></textarea> */}
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

export default PartnersCreate