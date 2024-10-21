import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import callFetch from "helpers/callFetch";
import { Grid, Step, StepLabel, Stepper } from "@mui/material";
import BookingForm from "./components/BookingForm";
import Pricing from "./components/Pricing";
import ProductInfo from "./components/ProductInfo";

function getSteps() {
  return ["Product", "Pricing", "Form"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <ProductInfo formData={formData} />;
    case 1:
      return <Pricing formData={formData} /> ;
    case 2:
      return <BookingForm formData={formData} />;
    default:
      return null;
  }
}

const ProductEdit = () => {
  const [activeStep, setActiveStep] = useState(0);
  const params = useParams()
  const steps = getSteps();
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [data, setData] = useState(null);
  const isLastStep = activeStep === steps.length - 1;
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (params?.id) {
      // reset();
      callFetch("multiples/" + params?.id +"?product_for="+params?.slug, "GET", []).then((res) => {
        for (let [key, value] of Object.entries(res.data)) {
          if (key !== "photos" && value !== "null" && key !== "verano_id" && key !== "inverano_id") {
            setValue(key, value);
          }
        }
        setData(res?.data);
      });
    }
  }, [params?.id]);

  const handleBack = () => {if(activeStep !== 0)setActiveStep(activeStep - 1)};

  const onSubmit = (formData) => {
    setSaving(true);
    formData.details = JSON.stringify(formData?.details)
    formData.photos = formData?.photos
    callFetch("multiples/"+params?.id+"?step="+activeStep+`&product_for=${params?.slug}`, "POST", formData, setError).then((res) => {
      setSaving(false);
      if (!res.ok) return;
      setActiveStep(Number(res?.step))
      if (res.step === "done"){
        setSubmitSuccess(true);
        setActiveStep(0)
      }
    });
  };
  return submitSuccess ? (
    <Navigate to={`/products/${params?.slug}/product`} />
  ) : (
    <div className="row">
      <div className="col-12">
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>{t(steps[activeStep])}</h6>
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
              {getStepContent(activeStep, {
                register,
                handleSubmit,
                setError,
                setValue,
                getValues,
                errors,
                params,
                data
              })}

              <div className="col-12 mb-4 mt-3">
                {
                  isLastStep ? <div className=" d-flex align-items-center justify-content-between">
                    <button onClick={handleBack} type="button" className="btn btn-secondary">
                    <i class="fa fa-chevron-left me-2"></i> {t("Back")} 
                    </button>
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
                    
                  </div> : <div className=" d-flex align-items-center justify-content-between">

                    <button onClick={handleBack} type="button" className="btn btn-secondary">
                    <i class="fa fa-chevron-left me-2"></i> {t("Back")} 
                    </button>

                    <button type="submit" className="btn btn-primary">
                      {t("Next")} <i class="fa fa-chevron-right ms-2"></i>
                    </button>
                  </div>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit