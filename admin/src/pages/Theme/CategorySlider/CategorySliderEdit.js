import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import callFetch from "helpers/callFetch";
const CategorySliderEdit = () => {
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
      callFetch("card-category/" + params.id, "GET", []).then((res) => {
        for (let [key, value] of Object.entries(res.data)) {
          if (key !== "image" && key !== "tag" && key !== "tag_slug" && key !== "slug") {
            setValue(key, value);
          }

        }
      });
    }
  }, [params?.id]);

  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("card-category/" + params.id, "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return submitSuccess ? <Navigate to="/theme-customization/category-slider" /> : (
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
                  <label>{t("Top Title")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("service name")}
                    {...register("top_title", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.top_title && errors.top_title.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Top Sub Title")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("top sub title")}
                    {...register("top_sub_title", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.top_sub_title && errors.top_sub_title.message}
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
                <div className="col-md-4">
                  <label>{t("Card Image")} *</label>
                  <input type="file" className="form-control"
                    {...register("image")}
                  />
                  <div className="invalid-feedback">
                    {errors.image && errors.image.message}
                  </div>
                </div>

                <div className="col-md-4">
                  <label>{t("Card Tag")} *</label>
                  <input type="file" className="form-control" placeholder="0000"
                    {...register("tag")}
                  />
                  <div className="invalid-feedback">
                    {errors.tag && errors.tag.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Tag Title")} *</label>
                  <select
                    class="form-control"
                    {...register("tag_title", { required: true })}
                    required
                  >

                    <option value="Top-10-Hotels">Top-10-Hotels</option>
                    <option value="Top-25-Hotels">Top-25-Hotels</option>
                  </select>
                  <div className="invalid-feedback">
                    {errors.tag_title && errors.tag_title.message}
                  </div>
                </div>
              </div>

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
                  <label>{t("Sub Title")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("title")}
                    {...register("sub_title", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.sub_title && errors.sub_title.message}
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-12">
                  <label>{t("Link")} *</label>
                  <input type="text" className="form-control" placeholder="https://toursandorra.com"
                    {...register("link")}
                  />
                  <div className="invalid-feedback">
                    {errors.link && errors.link.message}
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

export default CategorySliderEdit