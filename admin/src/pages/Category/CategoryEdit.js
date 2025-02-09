import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import callFetch from "helpers/callFetch";
import SoftEditor from "components/SoftEditor";
import { Hidden } from '@mui/material/Hidden';
const CategoryEdit = () => {
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
    watch
  } = useForm();

  useEffect(() => {
    callFetch("categories/" + params.id, "GET", []).then((res) => {
      if (res.ok && res.data) {
        for (let [key, value] of Object.entries(res.data)) {
          setValue(key, value); // Set other fields
        }
        // Set the category_desc.category_desc separately
        if (res.data.category_desc && res.data.category_desc.category_desc) {
          setValue("description", res.data.category_desc.category_desc);
        }
      }
    });
  }, [params.id, setValue]);

  const descriptionValue = watch("description");

  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("categories/" + params?.id, "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };

  return submitSuccess ? (
    <Navigate to="/categories/category" />
  ) : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Create Update")}</h6>
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
                  <label>{t("Category Name")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("Category Name")}
                    {...register("category_name", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.category_name && errors.category_name.message}
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

              <div className="row g-3">
                <div className="col-md-12">
                  <label>{t("Redirect Link")} *</label>
                  <input type="text" className="form-control" placeholder="https://example.com"
                    {...register("link")}
                  />
                  <div className="invalid-feedback">
                    {errors.link && errors.link.message}
                  </div>
                </div>
                <div className="col-md-12">
                  <div class="form-group">
                    <label>{t("Description")} *</label>
                    <SoftEditor
                      value={descriptionValue} // Pass the watched value to SoftEditor
                      onChange={(value) => setValue("description", value)} // Update form value on editor change
                    />
                    <div className="invalid-feedback">
                      {errors.description && errors.description.message}
                    </div>
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
      </div >
    </div >
  );
};

export default CategoryEdit;
