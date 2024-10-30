import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";

const CamerasCreate = () => {
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [webcams, setWebcams] = useState([{ name: "", webcam: "" }]);
  const [refresh, setRefresh] = useState(1);
  const [providers, setProviders] = useState([]);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    callFetch("webcam-provider", "GET", []).then((res) => {
      setProviders(res?.data);
    });
  }, [refresh]);

  const handleWebcamChange = (index, field, value) => {
    const updatedWebcams = webcams.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setWebcams(updatedWebcams);
    setValue("cameras", JSON.stringify(updatedWebcams));
  };

  const deleteWebcam = (indexToDelete) => {
    const updatedWebcams = webcams.filter((_, index) => index !== indexToDelete);
    setWebcams(updatedWebcams);
    setValue("cameras", JSON.stringify(updatedWebcams));
  };

  const addWebcam = () => {
    const newWebcam = { name: "", webcam: "" };
    setWebcams(prevWebcams => [...prevWebcams, newWebcam]);
    setValue("cameras", JSON.stringify([...webcams, newWebcam]));
  };

  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("webcams/", "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setSubmitSuccess(true);
    });
  };
  return submitSuccess ? <Navigate to="/others/webcams" /> : (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t("Webcam Create")}</h6>
          </div>
          <div className="card-body">
            <form
              className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""
                }`}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              {/* <input type="hidden" defaultValue="PUT" {...register("_method")} /> */}

              <div className="row g-3">
                <div className="col-md-6">
                  <div className=" form-group">
                    <label>{t("Providers")} *</label>
                    <select
                      className="form-control"
                      {...register("providers", { required: true })}
                      required
                    >
                      <option>--Providers--</option>
                      {
                        providers && providers?.map((provider, i) => (
                          <option key={i} value={provider?.id}>{provider?.name}</option>
                        ))
                      }
                    </select>
                    <div className="invalid-feedback">
                      {errors.title && errors.title.message}
                    </div>
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

              <div className="row">
                <div className="col-md-12">
                  {webcams?.map((webcam, index) => (
                    <div key={index} className="row g-3 mb-3">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center w-100">
                          <div className="w-100">
                            <label>
                              {`Name (${index + 1})`} *
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ANDORRA"
                              value={webcam.name}
                              onChange={(e) => handleWebcamChange(index, "name", e.target.value)}
                            />
                            <div className="invalid-feedback">
                              {errors.name && errors.name.message}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center w-100">
                          <div className="w-100">
                            <label>
                              {`Webcam (${index + 1})`} *

                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="https://"
                              value={webcam.webcam}
                              onChange={(e) => handleWebcamChange(index, "webcam", e.target.value)}
                            />
                            <div className="invalid-feedback">
                              {errors.webcam && errors.webcam.message}
                            </div>
                          </div>
                          &nbsp;
                          <i
                            className="fa-solid fa-circle-xmark text-danger cursor-pointer mt-4"
                            onClick={() => deleteWebcam(index)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-md-12 mt-3">
                  <button type="button" className="btn btn-sm btn-primary" onClick={addWebcam}>
                    Add <i className="fas fa-plus"></i>
                  </button>
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

export default CamerasCreate