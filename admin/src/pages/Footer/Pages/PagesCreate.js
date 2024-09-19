import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";
import ReactQuill from "react-quill";
import SoftEditor from "components/SoftEditor";


const PagesCreate = () => {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    callFetch("page-categories", "GET", []).then((res) => {
      setCategories(res?.data)
    });
  }, [0]);

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const onSubmit = (formData) => {
    setSaving(true);
    formData.content = editorContent
    callFetch("footer-pages", "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return submitSuccess ? <Navigate to="/footer/pages" /> : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Create Page Category")}</h6>
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
                <div className="col-md-4">
                  <label>{t("Categories")} *</label>
                  <select
                    class="form-control"
                    {...register("category", { required: true })}
                    required
                  >
                    <option value="">--Selecte--</option>
                    {
                      categories && categories?.map((category, index) => (
                        <option key={index} value={category?.id}>{category?.category_name}</option>

                      ))
                    }
                  </select>
                  <div className="invalid-feedback">
                    {errors.category && errors.category.message}
                  </div>
                </div>
                <div className="col-md-4">
                  <label>{t("Page Name")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("Page name")}
                    {...register("page_name", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.page_name && errors.page_name.message}
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

              <div className="row g-3">
                <div className="col-md-12">
                  <label>{t("Page Title")} *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("Page title")}
                    {...register("page_title", {
                      required: true,
                    })}
                    required
                  />
                  <div className="invalid-feedback">
                    {errors.page_title && errors.page_title.message}
                  </div>
                </div>

              </div>

              <div className="row g-3">
                <div className="col-md-12">
                  <label>{t("Content")} *</label>
                  {/* <ReactQuill/> */}
                  <SoftEditor   value={editorContent}
          onChange={handleEditorChange}/>
                  <div className="invalid-feedback">
                    {errors.content && errors.content.message}
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

export default PagesCreate