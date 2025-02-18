import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import callFetch from "helpers/callFetch";
import CreatableSelect from "react-select/creatable";
const VeranoEdit = () => {
  const params = useParams();
  const [editorValue, setEditorValue] = useState("");
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [title, setTitle] = useState([{ title: "" }]);
  const [metaTags, setMetaTags] = useState([]);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (params?.id) {
      callFetch("verano/" + params.id, "GET", []).then((res) => {
        for (let [key, value] of Object.entries(res.data)) {
          if (key !== "photo" && value !== "null") {
            setValue(key, value);
          }

          if (key === "meta_tags") {
            // Ensure meta_tags is an array
            const tagsArray = Array.isArray(value)
              ? value
              : typeof value === "string"
                ? value.split(",")
                : [];

            setMetaTags(tagsArray.map(tag => ({ value: tag, label: tag })));
            setValue("meta_tags", tagsArray);
          } else {
            setValue(key, value);
          }

        }
      });
    }
  }, [params?.id]);

  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("verano/" + params.id, "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };

  const handleMetaTagsChange = (selectedOptions) => {
    const newTags = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setMetaTags(selectedOptions);
    setValue("meta_tags", newTags); // Store as an array
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
                    {...register("reviews_link")} />
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
                <div className="col-md-4">
                  <label>{t("Booking Link")} </label>
                  <input type="text" className="form-control" placeholder="https://booking.com"
                    {...register("booking_link")} />
                  <div className="invalid-feedback">
                    {errors.booking_link && errors.booking_link.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Type")} *</label>
                  <select type="text" className="form-control" placeholder="https://booking.com"
                    {...register("type", { required: true })}
                    required>
                    <option value="single">{t("Single")}</option>
                    <option value="multiple">{t("Multiple")}</option>
                  </select>
                  <div className="invalid-feedback">
                    {errors.type && errors.type.message}
                  </div>
                </div>
                <div className="col-md-4">
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

                <h5 className="mt-4">Seo Settings</h5>
                <div className="col-md-6">
                  <label>{t("Meta Title")} *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("Meta Title")}
                    {...register("meta_title", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.meta_title && errors.meta_title.message}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>{t("Meta Tags")} (Optional)</label>
                  <CreatableSelect
                    isMulti
                    value={metaTags}
                    onChange={handleMetaTagsChange}
                    className={`basic-multi-select ${errors.meta_tags ? "is-invalid" : ""}`}
                    classNamePrefix="select"
                    placeholder={t("Type and press Enter")}
                  />
                  {errors.meta_tags && <div className="invalid-feedback d-block">{errors.meta_tags.message}</div>}
                </div>
                <div className="col-md-6">
                  <label>{t("Meta Description")} *</label>
                  <textarea
                    className="form-control"
                    placeholder={t("Enter Meta Description")}
                    {...register("meta_description", { required: true })}
                    required
                  ></textarea>
                  <div className="invalid-feedback">
                    {errors.meta_description && errors.meta_description.message}
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