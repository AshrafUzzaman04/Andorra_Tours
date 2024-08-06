import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
// @mui material components
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Globe from "examples/Globe";
import breakpoints from 'assets/theme/base/breakpoints';
import CustomerIndex from 'examples/Tables/SalesTable/CustomerIndex';
import CustomerExapndTable from 'examples/Tables/SalesTable/CustomerExapndTable';
import callFetch from "../../helpers/callFetch";
import { Card, CardMedia } from '@mui/material';
import Logo from "../../assets/images/company-logo.jpg";
const CustomerDashboard = () => {
  const { t } = useTranslation();
    const { values } = breakpoints;

    const [data, setData] = useState([]);

    useEffect(() => {

      callFetch("customer/dashboard", "GET", []).then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <>
    <SoftBox py={3}>
    <Grid container>
  <Grid item xs={12} lg={7}>
    <SoftBox mb={3} p={1}>
      <Grid container >
          <Grid item xs={12} md={6} lg={6}>
            <SoftTypography
              variant={window.innerWidth < values.sm ? "h3" : "h2"}
              textTransform="capitalize"
              fontWeight="bold"
            >
              {t('Welcome')}, {data?.info?.name}
            </SoftTypography>
          </Grid>
          <Grid item xs={12} md={4} lg={4} >
              <div className="card" >
                  <div className="card-body d-flex align-items-center justify-content-center py-2">
                      <div className="d-flex align-items-center justify-content-center" style={{ width:"100%",height:"80px" }}>
                          <img style={{ width:"100%", height:"80px", borderRadius: "5px" }} src={data?.info?.logo ? process.env.REACT_APP_STORAGE_URL + data.info.logo : '/assets/img/logo.png'} />
                      </div>
                  </div>
              </div>
          </Grid>
      </Grid>
    </SoftBox>
    
    <Grid container>
      <Grid item xs={12}>
        {/* <Globe
          display={{ xs: "none", md: "block" }}
          position="absolute"
          top="10%"
          right="47%"
          mt={{ xs: -12, lg: 1 }}
          mr={{ xs: 0, lg: 10 }}
          canvasStyle={{ marginTop: "3rem" }}
        /> */}
      </Grid>
    </Grid>

  </Grid>


  
  <Grid item xs={12} md={10} lg={7}>
    <Grid item xs={12} lg={10}>
    <Card>
    <CustomerExapndTable projects={data.projects} />
      <SoftBox style={{ width:'100%' }} mb={3} position="relative">
        {/* <CustomerIndex title="My Project" rows={TableData} /> */}
        
        
      </SoftBox>
    </Card>
    </Grid>
  </Grid>
  
  
  </Grid>
  
</SoftBox>

</>
  )
}

export default CustomerDashboard
