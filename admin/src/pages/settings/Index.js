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
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";

// Settings page components 
import Sidenav from "./components/Sidenav";
import Header from "./components/Header";
import BasicInfo from "./components/BasicInfo";
import ChangePassword from "./components/ChangePassword"; 
import Language from "./components/Language"; 
import Notifications from "./components/Notifications"; 
import DeleteAccount from "./components/DeleteAccount";

function Index() {
  return ( 
      <SoftBox mt={4}>
        <Grid container spacing={3}> 
          <Grid item xs={12} lg={12}>
            <SoftBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Header />
                </Grid>
                <Grid item xs={12}>
                  <BasicInfo />
                </Grid>
                <Grid item xs={6}>
                  <ChangePassword />
                </Grid> 
                <Grid item xs={6}>
                  <Language />

                  <br/>

                  <Notifications/>
                </Grid>  
              </Grid>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox> 
  );
}

export default Index;
