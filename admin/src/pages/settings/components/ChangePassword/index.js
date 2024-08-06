/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { callFetch } from "../../../../helpers/callFetch";
import { useTranslation } from "react-i18next";
import SoftAlert from "components/SoftAlert";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Settings page components
import FormField from "layouts/pages/account/components/FormField";

function ChangePassword() {
  let params = useParams();
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [passError, setPassError] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const passwordRequirements = [
    "One special characters",
    "Min 6 characters",
    "One number (2 are recommended)",
    "Change it often",
  ];

  const onSubmit = (formData) => {
    setSaving(true);
    callFetch("admin/update/password", "POST", formData, setError).then(
      (res) => {
        setSaving(false);
        if(!res.errors){
          setValue("current_password", "");
          setValue("password", "");
          setValue("password_confirmation", "");
        }
        // setSubmitSuccess(true);
        // if(res.message !== 'error'){
        //   setSubmitSuccess(true);
        //   setPassError(false);
        // }else{
        //   setPassError(true);
        //   setSubmitSuccess(false);
        // }
      }
    );
  };

  return (
    <Card id="change-password">
      <SoftBox p={3}>
        <SoftTypography variant="h5">{t("Change Password")}</SoftTypography>
        {submitSuccess ? (
          <SoftAlert color="success" mt={3} dismissible>
            {t("Password Changed Successfully")}
          </SoftAlert>
        ) : (
          " "
        )}
        {passError ? (
          <SoftAlert color="danger" mt={3} dismissible>
            {t("Old Password Doesn't match!")}
          </SoftAlert>
        ) : (
          " "
        )}
      </SoftBox>
      <SoftBox pb={3} px={3}>
        <form
          className={`needs-validation ${
            Object.keys(errors).length ? "was-validated" : ""
          }`}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <input
                className="form-control mt-2"
                {...register("current_password")}
                label={t("Current Password")}
                placeholder={t("Current Password")}
                type="password"
              />
              <div className="invalid-feedback">
                {errors.current_password && errors.current_password.message}
              </div>
            </Grid>
            <Grid item xs={12}>
              <input
                className="form-control mt-2"
                {...register("password")}
                label={t("New Password")}
                placeholder={t("New Password")}
                type="password"
              />
              <div className="invalid-feedback">
                {errors.password && errors.password.message}
              </div>
            </Grid>
            <Grid item xs={12}>
              <input
                className="form-control mt-2"
                {...register("password_confirmation")}
                label={t("Confirm Password")}
                placeholder={t("Confirm Password")}
                type="password"
              />
              <div className="invalid-feedback">
                {errors.password_confirmation &&
                  errors.password_confirmation.message}
              </div>
            </Grid>
          </Grid>
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            flexWrap="wrap"
          >
            <SoftBox ml="auto">
              <div className="row g-3 mt-3">
                <div className="col-12 my-4">
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
              </div>
            </SoftBox>
          </SoftBox>
        </form>
      </SoftBox>
    </Card>
  );
}

export default ChangePassword;
