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

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftBadgeDot from "components/SoftBadgeDot";
import PieChart from "examples/Charts/PieChart";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// Data
//import channelChartData from "layouts/ecommerce/overview/components/ChannelsChart/data";
import { NavLink } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from 'react-i18next';

function ChannelsChart(props) {
  const { t } = useTranslation();

  const [channelChartData, setChannelChartData] = useState({})
  
  /*
  const channelsChartData = {
    labels: ["In Progress", "Done"],
    datasets: {
      label: "Projects",
      backgroundColors: ["info", "primary"],
      data: [15, 20],
    },
  };
  */

  useEffect(()=>{
    var status_wise_projects = props.status_wise_projects;
    if(props?.status_wise_projects?.labels){      
      var labels = [];    
      for (let [key, value] of Object.entries(status_wise_projects.labels)) {
        labels[key] = t(value);
      }
      status_wise_projects.labels = labels
      setChannelChartData(status_wise_projects);   
    }
    
  },[props.status_wise_projects])

  return (
    <Card sx={{ overflow: "visible" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6">{t('Projects')}</SoftTypography>
        <Tooltip title="Siehe alle Projekte" placement="bottom" arrow>
          <SoftButton variant="outlined" color="secondary" size="small" circular iconOnly>
            <PriorityHighIcon/>
          </SoftButton>
        </Tooltip>
      </SoftBox>
      <SoftBox p={2} mt={3}>
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <PieChart chart={channelChartData} height="100%" />
          </Grid>
          <Grid item xs={5}>
            <SoftBox px={1}>
            {channelChartData ? 
                channelChartData?.labels?.map((data, index) => (
                <SoftBox mb={0.5}>
                  <SoftBadgeDot color={channelChartData.datasets.backgroundColors[index]} size="sm" badgeContent={t(data)} />
                </SoftBox>
                )) : <></>}                           
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox
        pt={4}
        pb={2}
        px={2}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        mt="auto"
      >
        <SoftBox width={{ xs: "100%", sm: "60%" }} lineHeight={1}>
          {/* <SoftTypography variant="button" color="text" fontWeight="regular">
            More than <strong>1,200,000</strong> developers used Creative Tim&apos;s products and
            over <strong>700,000</strong> projects were created.
          </SoftTypography> */}
        </SoftBox>
        <SoftBox width={{ xs: "100%", sm: "40%" }} textAlign="left" mt={{ xs: 2, sm: "auto" }}>
          <NavLink to="/project-management/projects"><SoftButton color="light">{t('All Projects')}</SoftButton></NavLink>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default ChannelsChart;
