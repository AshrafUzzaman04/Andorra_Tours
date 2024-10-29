import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import callFetch from "helpers/callFetch";
import SoftEditor from "components/SoftEditor";


const HotelEdit = () => {
  const params = useParams();
  const { t } = useTranslation();
  const [editorValue, setEditorValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [categories, setCategories] = useState([]);

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
    if (refresh === 0) {
      callFetch("hotel/create", "GET", []).then((res) => {
        if (!res.ok) return;
        setCategories(res?.categories);
        setRefresh(1)
      });
    }
  }, [refresh])


  useEffect(() => {
    if (params?.id && refresh > 0) {
      callFetch("hotels/" + params.id, "GET", []).then((res) => {
        for (let [key, value] of Object.entries(res.data)) {
          if (key !== "photo" && key !== "photo_one" && key !== "photo_two" && key !== "photo_three") {
            if (key === "categorie_id") {
              setValue("categorie", value);
            }else if (key === "description"){
              setEditorValue(value)
            }else {
              setValue(key, value);
            }
          }
        }
      });
    }
  }, [params?.id,refresh]);


  const onSubmit = (formData) => {
    setSaving(true);
    formData.description = editorValue;
    callFetch("hotels/" + params?.id, "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return submitSuccess ? (
    <Navigate to="/hotels" />
  ) : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Update Hotel")}</h6>
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
                <div className="col-md-4">
                  <label>{t("Category")} *</label>
                  <select
                    className="form-control"
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
                    {...register("photo")}/>
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
                    {...register("photo_one")}
                  />
                  <div className="invalid-feedback">
                    {errors.photo_one && errors.photo_one.message}
                  </div>
                </div>

                <div className="col-md-4">
                  <label>{t("Photo Two")} *</label>
                  <input type="file" className="form-control" placeholder="0000"
                    {...register("photo_two")}
                  />
                  <div className="invalid-feedback">
                    {errors.photo_two && errors.photo_two.message}
                  </div>
                </div>

                <div className="col-md-4">
                  <label>{t("Photo Three")} *</label>
                  <input type="file" className="form-control" placeholder="0000"
                    {...register("photo_three")}
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


              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label>{t("Button Text Link")} *</label>
                  <input type="text" className="form-control" placeholder="Check"
                    {...register("button_text_link", { required: true })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.button_text_link && errors.button_text_link.message}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>{t("Button Text Map")} *</label>
                  <input type="text" className="form-control" placeholder="Google Map"
                    {...register("button_text_map", { required: true })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.button_text_map && errors.button_text_map.message}
                  </div>
                </div>
              </div>


              <div className="row g-3">
                <div className="form-group">
                  <label>{t("Description")} *</label>
                  {/* <textarea className="form-control" rows="3" placeholder="Description" {...register("description", { required: true })}></textarea> */}
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

export default HotelEdit