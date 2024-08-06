import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";


// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftBadgeDot from "components/SoftBadgeDot";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard PRO React example components
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";


// Overview page components
import ChannelsChart from "layouts/ecommerce/overview/components/ChannelsChart";

// Data
import defaultLineChartData from "layouts/ecommerce/overview/data/defaultLineChartData";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import callFetch from "helpers/callFetch";
import { NumericFormat } from "react-number-format";
import { useTranslation } from 'react-i18next';
const OverView = () => {
  const { t } = useTranslation();
  const [status_wise_projects, setStatusWiseProjects] = useState([])
  const [order,setOrder] = useState("")
  const [quotation,setQuotation] = useState("")
  const [project,setProject] = useState(0)
  const [quotationChart,setQuotationChart] = useState([])
      // DefaultStatisticsCard state for the dropdown value
      function taskDate(dateMilli) {
        const d = (new Date(dateMilli) + '').split(' ');
        return [d[2],d[1],"-",d[2] - 7,d[1]].join(' ');
      }
    const datemilli = new Date();
  const [salesDropdownValue, setSalesDropdownValue] = useState(taskDate(datemilli));
  const [customersDropdownValue, setCustomersDropdownValue] = useState("6 May - 7 May");
  const [revenueDropdownValue, setRevenueDropdownValue] = useState(taskDate(datemilli));
  // DefaultStatisticsCard state for the dropdown action
  const [salesDropdown, setSalesDropdown] = useState(null);
  const [projectssDropdown, setCustomersDropdown] = useState(null);
  const [revenueDropdown, setRevenueDropdown] = useState(null);
  const [totalProject,setTotalProject] = useState(0);
  const [projectStatus,setProjectStatus] = useState([])
  // DefaultStatisticsCard handler for the dropdown action
  const openSalesDropdown = ({ currentTarget }) => setSalesDropdown(currentTarget);
  const closeSalesDropdown = ({ currentTarget }) => {
    setSalesDropdown(null);
    if( currentTarget.innerText === "Last 7 days" || currentTarget.innerText === "Last week" || currentTarget.innerText === "Last 30 days"){
      callFetch('onselect/'+currentTarget.innerText, "GET", []).then((res)=>{
        setOrder(res?.data)
      })
    }
    
    setSalesDropdownValue(currentTarget.innerText || salesDropdownValue);
  };




  const openRevenueDropdown = ({ currentTarget }) => setRevenueDropdown(currentTarget);
  const closeRevenueDropdown = ({ currentTarget }) => {
    setRevenueDropdown(null);
    if( currentTarget.innerText === "Last 7 days" || currentTarget.innerText === "Last week" || currentTarget.innerText === "Last 30 days"){
      callFetch('onselectquot/'+currentTarget.innerText, "GET", []).then((res)=>{
        setQuotation(res?.data)
      })
    }
    setRevenueDropdownValue(currentTarget.innerText || salesDropdownValue);
  };

  useEffect(()=>{
    callFetch('order/OrderSum',"GET",[]).then((res)=>{
      setOrder(res?.data?.orders)
      setQuotation(res?.data?.quotations)
      setQuotationChart(res?.data?.ChartData)
      setProject(res?.data?.totalproject)
      setStatusWiseProjects(res?.data?.status_wise_projects)
    })
  },[0])


  const channelsChartData = {
    labels: ["In Progress", "Done"],
    datasets: {
      label: "Projects",
      backgroundColors: ["info", "primary"],
      data: [projectStatus?.done, projectStatus?.Inprogress],
    },
  };

  
  const defaultLineChartDatas = {
    labels: quotationChart?.order_labels,
    datasets: [
      {
        label: t("Orders"),
        color: "info",
        data: quotationChart?.order_data,
      },
      {
        label: t("Quotations"),
        color: "dark",
        data: quotationChart?.quotaiaion_data,
      },
    ],
  };
    const renderMenu = (state, close) => (
        <Menu
          anchorEl={state}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          open={Boolean(state)}
          onClose={close}
          keepMounted
          disableAutoFocusItem
        >
          <MenuItem onClick={close}>{t('Last 7 days')}</MenuItem>
          <MenuItem onClick={close}>{t('Last week')}</MenuItem>
          <MenuItem onClick={close}>{t('Last 30 days')}</MenuItem>
        </Menu>
      );

      useEffect(() => {
        document.title = "INGTEC . Marketing & Vertrieb";
      }, []);
  return (
    <>
        <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title={t("Orders")}
                count={<NumericFormat
                  value={order}
                  displayType="text"
                  thousandSeparator={","}
                  decimalSeparator="."
                  decimalScale={2}
                  fixedDecimalScale
                  suffix=' €'
              />}
                percentage={{
                  color: "success",
                  value: "",
                  label: t(""),
                }}
                dropdown={{
                  action: openSalesDropdown,
                  menu: renderMenu(salesDropdown, closeSalesDropdown),
                  value: salesDropdownValue,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title={t("Project")}
                count={<NumericFormat
                  value={project}
                  displayType="text"
              />}
                percentage={{
                  color: "success",
                  value: "",
                  label: t(""),
                }}
                /*
                dropdown={{
                  action: openProjectsDropdown,
                  menu: renderMenu(projectssDropdown, closeProjectsDropdown),
                  value: customersDropdownValue,
                }}
                */
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title={t("Quotations")}
                count={<NumericFormat
                  value={quotation}
                  displayType="text"
                  thousandSeparator={","}
                  decimalSeparator="."
                  decimalScale={2}
                  fixedDecimalScale
                  suffix=' €'
              />}
                percentage={{
                  color: "secondary",
                  value: "",
                  label: t(""),
                }}
                dropdown={{
                  action: openRevenueDropdown,
                  menu: renderMenu(revenueDropdown, closeRevenueDropdown),
                  value: revenueDropdownValue,
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <ChannelsChart status_wise_projects={status_wise_projects} />
            </Grid>
            <Grid item xs={12} sm={6} lg={8}>
              <DefaultLineChart
                title={t("Revenue")}
                description={
                  <SoftBox display="flex" justifyContent="space-between">
                    <SoftBox display="flex" ml={-1}>
                      <SoftBadgeDot color="info" size="sm" badgeContent={t("Orders")} />
                      <SoftBadgeDot color="dark" size="sm" badgeContent={t("Quotations")} />
                    </SoftBox>
                    <SoftBox mt={-5.25} mr={-1}>
                      <Tooltip title="See which works perform better" placement="left" arrow>
                        <SoftButton
                          variant="outlined"
                          color="secondary"
                          size="small"
                          circular
                          iconOnly
                        >
                          <PriorityHighIcon/>
                        </SoftButton>
                      </Tooltip>
                    </SoftBox>
                  </SoftBox>
                }
                chart={defaultLineChartDatas}
              />
            </Grid>
          </Grid>
        </SoftBox>
        {/* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <HorizontalBarChart title="Sales by age" chart={horizontalBarChartData} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <SalesTable title="Sales by Country" rows={salesTableData} />
            </Grid>
          </Grid>
        </SoftBox> */}

      </SoftBox>
    </>
  )
}

export default OverView