import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";
import SoftEditor from "components/SoftEditor";

const HotelCreate = () => {
  const [editorValue, setEditorValue] = useState("");
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [categories, setCategories] = useState([]);
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
  return submitSuccess ? <Navigate to="/hotels" /> : (
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

              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label>{t("Review")} *</label>
                  <input type="text" className="form-control" placeholder="5.00"
                    {...register("review", { required: true })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.review && errors.review.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Total Review")} *</label>
                  <input type="text" className="form-control" placeholder="100"
                    {...register("total_review", { required: true })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.total_review && errors.total_review.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Location")} *</label>
                  <input type="text" className="form-control" placeholder="california"
                    {...register("location", { required: true })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.location && errors.location.message}
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label>{t("Photo One")} *</label>
                  <input type="file" className="form-control"
                    {...register("photo_one", { required: true })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.photo_one && errors.photo_one.message}
                  </div>
                </div>

                <div className="col-md-4">
                  <label>{t("Photo Two")} *</label>
                  <input type="file" className="form-control" placeholder="0000"
                    {...register("photo_two", { required: true })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.photo_two && errors.photo_two.message}
                  </div>
                </div>

                <div className="col-md-4">
                  <label>{t("Photo Three")} *</label>
                  <input type="file" className="form-control" placeholder="0000"
                    {...register("photo_three", { required: true })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.photo_three && errors.photo_three.message}
                  </div>
                </div>

              </div>



              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label>{t("Hotel Link")} *</label>
                  <input type="text" className="form-control" placeholder="https://hotel.com"
                    {...register("hotel_link", { required: true })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.hotel_link && errors.hotel_link.message}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>{t("Map Location")} *</label>
                  <input type="text" className="form-control" placeholder="https://maps.app.goo.gl/tyehx5okCCeNf6Zn6"
                    {...register("map_location", { required: true })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.map_location && errors.map_location.message}
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

export default HotelCreate