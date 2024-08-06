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

  useEffect( async () => {
    for (let [key, value] of Object.entries(route)) {
      if(value == title){
        if(route[key-1] == 'message'){
          for (let [data_key, data_value] of Object.entries(breadcrumbData.message)) {
            if(data_value.id == title){
              setBreadTitel(data_value.name);                            
            }
          }          
        }else if(value == 'edit'){
          if(route[key-2] == 'employees'){
            for (let [employee_key, employee_value] of Object.entries(breadcrumbData.employee)) {
              if(route[key-1] == employee_value.id){
                setBreadIdBaseTitel(employee_value.identity_number);
              }
            }
          }else if(route[key-2] == 'customers'){
            for (let [customer_key, customer_value] of Object.entries(breadcrumbData.customer)) {
              if(route[key-1] == customer_value.id){
                setBreadIdBaseTitel(customer_value.identity_number);
              }
            }
          }else if(route[key-2] == 'quotations'){
            for (let [quotations_key, quotations_value] of Object.entries(breadcrumbData.quotations)) {
              if(route[key-1] == quotations_value.id){
                setBreadIdBaseTitel(quotations_value.identity_number);
              }
            }
          }else if(route[key-2] == 'orders'){
            for (let [orders_key, orders_value] of Object.entries(breadcrumbData.orders)) {
              if(route[key-1] == orders_value.id){
                setBreadIdBaseTitel(orders_value.identity_number);
              }
            }
          }else if(route[key-2] == 'invoice'){
            for (let [invoice_key, invoice_value] of Object.entries(breadcrumbData.invoice)) {
              if(route[key-1] == invoice_value.id){
                setBreadIdBaseTitel(invoice_value.identity_number);
              }
            }
          }else if(route[key-2] == 'workshops'){
            for (let [data_key, data_value] of Object.entries(breadcrumbData.workshops)) {
              if(route[key-1] == data_value.id){
                setBreadIdBaseTitel(data_value.identity_number);
              }
            }
          }else if(route[key-2] == 'students'){
            for (let [data_key, data_value] of Object.entries(breadcrumbData.students)) {
              if(route[key-1] == data_value.id){
                setBreadIdBaseTitel(data_value.identity_number);
              }
            }
          }else if(route[key-2] == 'seminars'){
            for (let [data_key, data_value] of Object.entries(breadcrumbData.seminars)) {
              if(route[key-1] == data_value.id){
                setBreadIdBaseTitel(data_value.identity_number);
              }
            }
          }else if(route[key-2] == 'suppliers'){
            for (let [data_key, data_value] of Object.entries(breadcrumbData.suppliers)) {
              if(route[key-1] == data_value.id){
                setBreadIdBaseTitel(data_value.identity_number);
              }
            }
          }else if(route[key-2] == 'products'){
            for (let [data_key, data_value] of Object.entries(breadcrumbData.products)) {
              if(route[key-1] == data_value.id){
                setBreadIdBaseTitel(data_value.identity_number);
              }
            }
          }else if(route[key-2] == 'projects'){
            for (let [data_key, data_value] of Object.entries(breadcrumbData.projects)) {
              if(route[key-1] == data_value.id){
                setBreadIdBaseTitel(data_value.identity_number);
              }
            }
          }
        }else if(value == 'students'){
          for (let [data_key, data_value] of Object.entries(breadcrumbData.students)) {
            if(route[key-1] == data_value.id){
              setBreadIdBaseTitel(data_value.identity_number);
            }
          }
        }else if(value == 'profile' && route[key-2] == 'employees'){
          for (let [employee_key, employee_value] of Object.entries(breadcrumbData.employee)) {
            if(route[key-1] == employee_value.id){
              setBreadIdBaseTitel(employee_value.identity_number);
            }
          }
        }else{
          if(Number.isInteger(parseInt(value)) && route[key-1] == 'projects'){
            for (let [data_key, data_value] of Object.entries(breadcrumbData.projects)) {
              if(value == data_value.id){
                setBreadTitel(data_value.identity_number);
              }
            }
          }else{
            setBreadTitel('');
          }
        }
      }
    }
  }, [route]); 

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
