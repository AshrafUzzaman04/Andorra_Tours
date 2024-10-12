import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";

const HotelCreate = () => {
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
    callFetch("advertisements", "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return submitSuccess ? <Navigate to="/theme-customization/advertisement" /> : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Create Hotel")}</h6>
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
                  <label>{t("Photo")} *</label>
                  <input type="file" className="form-control"
                    {...register("photo", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.photo && errors.photo.message}
                  </div>
                </div>
              </div>

              

              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label>{t("Image One")} *</label>
                  <input type="file" className="form-control"
                    {...register("image_one")}
                  />
                  <div className="invalid-feedback">
                    {errors.image_one && errors.image_one.message}
                  </div>
                </div>

                <div className="col-md-4">
                  <label>{t("Image Two")} *</label>
                  <input type="file" className="form-control" placeholder="0000"
                    {...register("image_two")}
                  />
                  <div className="invalid-feedback">
                    {errors.image_two && errors.image_two.message}
                  </div>
                </div>

                <div className="col-md-4">
                  <label>{t("Image Three")} *</label>
                  <input type="file" className="form-control" placeholder="0000"
                    {...register("image_three")}
                  />
                  <div className="invalid-feedback">
                    {errors.image_three && errors.image_three.message}
                  </div>
                </div>

              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label>{t("Image Four")} *</label>
                  <input type="file" className="form-control"
                    {...register("image_four")}
                  />
                  <div className="invalid-feedback">
                    {errors.image_four && errors.image_four.message}
                  </div>
                </div>

                <div className="col-md-6">
                  <label>{t("Image Five")} *</label>
                  <input type="file" className="form-control" placeholder="0000"
                    {...register("image_five")}
                  />
                  <div className="invalid-feedback">
                    {errors.image_five && errors.image_five.message}
                  </div>
                </div>

              </div>

              <div className="row g-3 mb-4">
              <div className="col-md-6">
                  <label>{t("Button Link")} *</label>
                  <input type="text" className="form-control" placeholder="https://toursandorra.com"
                    {...register("button_link")}
                  />
                  <div className="invalid-feedback">
                    {errors.button_link && errors.button_link.message}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>{t("Button Link")} *</label>
                  <input type="text" className="form-control" placeholder="https://toursandorra.com"
                    {...register("button_link")}
                  />
                  <div className="invalid-feedback">
                    {errors.button_link && errors.button_link.message}
                  </div>
                </div>
              </div>


              <div className="row g-3">
                <div class="form-group">
                  <label>{t("Description")} *</label>
                  <textarea class="form-control" rows="3" placeholder="Description" {...register("description", { required: true })}></textarea>
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

export default HotelCreate