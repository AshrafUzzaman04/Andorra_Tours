import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";
const HeroCreate = () => {
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
  return submitSuccess ? <Navigate to="/theme-customization/hero" /> : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Create Hero Slider")}</h6>
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
                    placeholder={t("Title")}
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
                <div className="col-md-6">
                  <label>{t("Slider Image")} *</label>
                  <input type="file" className="form-control"
                    {...register("slider_image", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.slider_image && errors.slider_image.message}
                  </div>
                </div>

                <div className="col-md-6">
                  <label>{t("Slider Thumnail")} *</label>
                  <input type="file" className="form-control" placeholder="Discover the world"
                    {...register("thumnail_image", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.thumnail_image && errors.thumnail_image.message}
                  </div>
                </div>

              </div>
              <div className="row g-3">
                <div className="col-md-4">
                  <label>{t("Button Text")} *</label>
                  <input type="text" className="form-control" placeholder="https://example.com"
                    {...register("button_text", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.button_text && errors.button_text.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Button Link")} *</label>
                  <input type="text" className="form-control" placeholder="https://example.com"
                    {...register("button_link", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.button_link && errors.button_link.message}
                  </div>
                </div>

                <div className="col-md-4">
                  <label>{t("Button Color")} *</label>
                  <input type="color" className="form-control m-0 p-0" id="style1" placeholder="https://example.com"
                    {...register("button_color", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.button_color && errors.button_color.message}
                  </div>
                </div>
              </div>
              <div className="row g-3 mt-2">
                <div className="col-md-4">
                  <label>{t("Title Color")} *</label>
                  <input type="color" class="form-control m-0 p-0" id="style1"
                    {...register("title_color", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.title_color && errors.title_color.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Description Color")} *</label>
                  <input type="color" class="form-control m-0 p-0" id="style1"
                    {...register("description_text_color", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.description_text_color && errors.description_text_color.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Button Text Color")} *</label>
                  <input type="color" class="form-control m-0 p-0" id="style1"
                    {...register("button_text_color", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.button_text_color && errors.button_text_color.message}
                  </div>
                </div>
              </div>
              <div className="row g-3 mt-2">
                <div className="col-md-12">
                  <label>{t("Description")} *</label>
                  <textarea class="form-control"
                    {...register("description", { required: true })}
                    required placeholder="Description"></textarea>
                  <div className="invalid-feedback">
                    {errors.status && errors.status.message}
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

export default HeroCreate