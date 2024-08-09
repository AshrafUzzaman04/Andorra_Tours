import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";
const SubCategoryCreate = () => {
  const [editorValue, setEditorValue] = useState("");
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
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
    callFetch("sub-categories/all", "GET", []).then((res) => {
      setCategories(res?.data)
    });
  }, [])
  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("sub_categories", "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return submitSuccess ? (
    <Navigate to="/categories/sub-categories" />
  ) : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Create Sub Category")}</h6>
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
                  <label>{t("Sub Category Name")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("Sub Category Name")}
                    {...register("sub_category_name", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.sub_category_name && errors.sub_category_name.message}
                  </div>
                </div>

                <div className="col-md-6">
                  <label>{t("Categories")} *</label>
                  <select
                    class="form-control"
                    {...register("category", { required: true })}
                    required
                  >
                    <option value="">--Select Category--</option>
                    {
                      categories && categories?.map((category, i) => (
                        <option key={category?.id} value={category?.id}>{category?.category_name}</option>
                      ))
                    }

                  </select>
                  <div className="invalid-feedback">
                    {errors.category && errors.category.message}
                  </div>
                </div>


              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <div class="form-group">
                    <label>{t("Redirect Link")} *</label>
                    <input type="text" className="form-control" class="form-control"
                      {...register("link", { required: true })}
                      required placeholder="https://" />
                    <div className="invalid-feedback">
                      {errors.link && errors.link.message}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="form-group">
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
              </div>
              <div className="col-12 mb-4">
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
export default SubCategoryCreate;