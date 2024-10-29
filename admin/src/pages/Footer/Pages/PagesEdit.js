import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import callFetch from "helpers/callFetch";
import SoftEditor from "components/SoftEditor";
const footerAditonalData = [
  { id: 1, name: "Email", value: "email", selected: false },
  { id: 2, name: "Phone", value: "phone", selected: false },
  { id: 3, name: "Whats App", value: "whats-app", selected: false },
  { id: 4, name: "New Page", value: "new-page", selected: false },
  { id: 5, name: "Link", value: "link", selected: false },
  { id: 6, name: "Text", value: "text", selected: true },
];
const PagesEdit = () => {
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [title, setTitle] = useState([{ title: "" }]);
  const [editorContent, setEditorContent] = useState("");
  const [selectedValue, setSelectedValue] = useState(
    footerAditonalData.find(item => item.selected)?.value || ""
  );
  const [link, setLink] = useState("");
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

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (params?.id) {
      callFetch("footer-pages/" + params.id, "GET", []).then((res) => {
        setEditorContent(res.data?.content)
        setSelectedValue(res.data?.title_for)
        setLink(res.data?.page_slug);
        for (let [key, value] of Object.entries(res.data)) {
          if (key !== "page_slug") {
            setValue(key, value);
          }
        }
      });
    }
  }, [params?.id]);

  const onSubmit = (formData) => {
    setSaving(true);
    formData.content = editorContent;
    formData.page_slug = selectedValue === "link" ? link : ""
    callFetch("footer-pages/" + params.id, "POST", formData, setError).then((res) => {
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
              <input type="hidden" defaultValue="PUT" {...register("_method")} />
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
                  <label>{t("Page Name")} (You can't change this) *</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder={t("Page name")}
                    {...register("page_name", {
                      required: true,
                    })}
                    required
                    readOnly
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
                <div className="col-md-6">
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

                <div className="col-md-6">
                  <label>{t("Title For")} *</label>
                  <select
                    class="form-control"
                    {...register("title_for", { required: true })}
                    required
                    onChange={handleSelectChange}
                  >
                    {
                      footerAditonalData && footerAditonalData?.map((data, index) => (
                        <option key={index} value={data?.value}>{data?.name}</option>
                      ))
                    }
                  </select>
                  <div className="invalid-feedback">
                    {errors.title_for && errors.title_for.message}
                  </div>
                </div>

              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  {selectedValue === "link" && (
                    <div>
                      <label>Link: </label>
                      <input type="url" className="form-control" defaultValue={link} onChange={(e) => setLink(e.target.value)} placeholder="Enter the link" />
                    </div>
                  )}
                  <div className="invalid-feedback">
                    {errors.content && errors.content.message}
                  </div>
                </div>

              </div>

              <div className="row g-3">
                <div className="col-md-12">
                  <label>{t("Content")} *</label>
                  {/* <ReactQuill/> */}
                  <SoftEditor value={editorContent}
                    onChange={handleEditorChange} />
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
export default PagesEdit