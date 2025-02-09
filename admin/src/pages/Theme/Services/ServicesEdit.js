import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import callFetch from "helpers/callFetch";
import CreatableSelect from "react-select/creatable";
const ServicesEdit = () => {
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
      callFetch("service/" + params.id, "GET", []).then((res) => {
        for (let [key, value] of Object.entries(res.data)) {
          if (key !== "service_image") {
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
          }

        }
      });
    }
  }, [params?.id]);

  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("service/" + params.id, "POST", formData, setError).then((res) => {
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
  return submitSuccess ? <Navigate to="/theme-customization/servcios-exclusivos" /> : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Create Service")}</h6>
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
                  <label>{t("Service Name")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("service name")}
                    {...register("service_name", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.service_name && errors.service_name.message}
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
                  <label>{t("Service Image")} *</label>
                  <input type="file" className="form-control"
                    {...register("service_image")} />
                  <div className="invalid-feedback">
                    {errors.service_image && errors.service_image.message}
                  </div>
                </div>

                <div className="col-md-6">
                  <label>{t("Total Services")} *</label>
                  <input type="text" className="form-control" placeholder="0000"
                    {...register("total_services", { required: true })}
                    required />
                  <div className="invalid-feedback">
                    {errors.total_services && errors.total_services.message}
                  </div>
                </div>

              </div>

              <div className="row g-3 mt-2">
                <div className="col-md-12">
                  <label>{t("Service Link")} *</label>
                  <input type="text" className="form-control" placeholder="https://toursandorra.com"
                    {...register("service_link")}
                  />
                  <div className="invalid-feedback">
                    {errors.service_link && errors.service_link.message}
                  </div>
                </div>
              </div>

              <h5 className="mt-4">Seo Settings</h5>
              <div className="row g-3 mt-2">
                <div className="col-md-6">
                  <label>{t("Meta Title")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("Meta Title")}
                    {...register("seo_title", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.seo_title && errors.seo_title.message}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>{t("Meta Tags")} (Optional)</label>
                  <CreatableSelect
                    isMulti
                    value={metaTags}
                    onChange={handleMetaTagsChange}
                    className={`basic-multi-select mb-4 ${errors.meta_tags ? "is-invalid" : ""}`}
                    classNamePrefix="select"
                    placeholder={t("Type and press Enter")}
                  />
                  {errors.meta_tags && <div className="invalid-feedback d-block">{errors.meta_tags.message}</div>}
                </div>
                <div className="col-md-6">
                  <label>{t("Meta Description")} *</label>
                  <textarea
                    className="form-control mb-4"
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
}

export default ServicesEdit