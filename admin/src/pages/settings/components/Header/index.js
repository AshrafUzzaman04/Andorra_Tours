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

import {React, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import Cookies from 'js-cookie';
import callFetch from "../../../../helpers/callFetch";
// Images
import burceMars from "assets/images/bruce-mars.jpg";
import { useForm } from "react-hook-form";
function Header() {
  const [visible, setVisible] = useState(true);
  const [user, setUser] = useState(JSON.parse(Cookies.get('user')));
  const [uploadedImage, setUploadedImage] = useState('');
  const handleSetVisible = () => setVisible(!visible);

  const {
    reset, resetField, register, handleSubmit, setError, setValue, getValues,
    formState: { errors },
  } = useForm();

  function uploadImage(){
    document.getElementById('imageUpload').click();
  }

  const handleChangeImage = (e) => { 
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
    document.getElementById('avatarFormSubmit').click();
  }

  const onSubmit = (formData) => { 
    callFetch("update-profile-picture", "POST", formData, setError).then((res) => {  
        console.log('submitted');
    }); 
  };

  return (
    <Card id="profile">
      <SoftBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            {uploadedImage && (
              <img onClick={() => uploadImage()}
              src={uploadedImage}
              alt="profile-image" 
              className="avatar-cs"
            />
            )}

            {!uploadedImage && (
              <img onClick={() => uploadImage()}
              src={user.photo ? process.env.REACT_APP_STORAGE_URL + user.photo : '/assets/img/placeholder.png'}
              alt="profile-image" 
              className="avatar-cs"
            />
            )}
             <form onSubmit={handleSubmit(onSubmit)} id="avatarForm">
              <input id="imageUpload" type="file" {...register('attachment')} onChange={handleChangeImage}></input>
              <button type="submit" id="avatarFormSubmit"></button>
            </form>
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {user && user.name ? user.name : '' }
              </SoftTypography> 
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            <SoftBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >  
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default Header;
