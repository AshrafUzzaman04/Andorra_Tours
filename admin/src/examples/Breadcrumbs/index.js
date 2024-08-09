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

// react-router-dom components
import { Link, Navigate, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

import { useEffect, useState } from "react";
// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";
import HomeIcon from '@mui/icons-material/Home';
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useTranslation } from 'react-i18next';
import callFetch from "../../helpers/callFetch";

function Breadcrumbs({ icon, title, route, light }) {
  const routes = route.slice(0, -1);
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState([]);
  const [breadcrumbData, setBreadcrumbData] = useState([]);
  const [breadTitel, setBreadTitel] = useState('');
  const [breadIdBaseTitel, setBreadIdBaseTitel] = useState('');

  useEffect(() => {
    callFetch("breadcrumb-data","GET",[]).then((res)=>{
      setBreadcrumbData(res.data);    })
  }, [refresh]);



  return (
    <SoftBox mr={{ xs: 0, xl: 0 }} className="d-none d-md-block">
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
          },
        }}
      >
        <Link to="/">
          <SoftTypography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <HomeIcon/>
          </SoftTypography>
        </Link>
        {routes.map((el, index) => (
          <Link
              to={`/${
                index ?
                  el == 'customer-management' ? routes[index-1]+'/'+el+'/overview'
                  : el == 'message' ? 'chat'
                  : routes[index-1]+'/'+el
                  
                  : el == 'customer-management' ? el+'/overview'
                  : el == 'human-resources' ? el+'/employees'
                  : el == 'finance' ? el+'/invoice'
                  : el == 'course-management' ? el+'/workshops'
                  : el == 'product-management' ? el+'/suppliers'
                  : el == 'project-management' ? el+'/projects'

                  : el
                }`                
                } key={index ? routes[index-1]+'/'+el : el}>
            <SoftTypography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {title == 'edit' && routes[index-1] == 'employees'  ? breadIdBaseTitel
              : title == 'edit' && routes[index-1] == 'customers' ? breadIdBaseTitel
              : title == 'edit' && routes[index-1] == 'quotations' ? breadIdBaseTitel
              : title == 'edit' && routes[index-1] == 'orders' ? breadIdBaseTitel
              : title == 'edit' && routes[index-1] == 'invoice' ? breadIdBaseTitel
              : title == 'edit' && routes[index-1] == 'workshops' ? breadIdBaseTitel
              : title == 'edit' && routes[index-1] == 'students' ? breadIdBaseTitel
              : title == 'students' && routes[index-1] == 'seminars' ? breadIdBaseTitel
              : title == 'profile' && routes[index-1] == 'employees' ? breadIdBaseTitel
              : title == 'edit' && routes[index-1] == 'seminars' ? breadIdBaseTitel
              : title == 'edit' && routes[index-1] == 'suppliers' ? breadIdBaseTitel
              : title == 'edit' && routes[index-1] == 'products' ? breadIdBaseTitel
              : title == 'edit' && routes[index-1] == 'projects' ? breadIdBaseTitel              

              : t(el.replace("-", " "))}
            </SoftTypography>
          </Link>
        ))}
        <SoftTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {breadTitel ? breadTitel : t(title.replace("-", " "))}
        </SoftTypography>
      </MuiBreadcrumbs>
      <SoftTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? "white" : "dark"}
        noWrap
      >
        {breadTitel ? breadTitel : t(title.replace("-", " "))}
      </SoftTypography>
    </SoftBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
