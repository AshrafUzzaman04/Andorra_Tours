import {AppBar, Badge, Card, Grid, Tab, Tabs } from '@mui/material'
import SoftAvatar from 'components/SoftAvatar'
import React, { useEffect, useState } from 'react'
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import Cube from 'examples/Icons/Cube';
import Document from 'examples/Icons/Document';
import SummaryCard from './components/SummaryCard';
import CustomerMapContact from './components/CustomerMapContact';
import ProfilesList from 'examples/Lists/ProfilesList';
import profilesListData from "layouts/pages/profile/profile-overview/data/profilesListData";
import Table from 'examples/Tables/Table';
import tableData from "layouts/pages/users/reports/data/tableData";
import { useParams } from 'react-router-dom';
import callFetch from 'helpers/callFetch';
import { ModeEdit } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Settings from 'examples/Icons/Settings';
import ProjectsTable from './ProjectsTable';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';

const CustomerDetails = () => {
    const params = useParams();
    const { t } = useTranslation();
    const { columns, rows } = tableData;
    const [editDelay, setEditDelay] = useState(0);
    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
    const [tabValue, setTabValue] = useState(0);
    const [customer,setCustomer] = useState({})
    const [customerOverview,setCustomerOverview] = useState({})
    const handleSetTabValue = (event, newValue) => setTabValue(newValue);
    function TabPanel(props) {
      const { children, value, index, ...other } = props;
      
      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            
             <div className='mt-4'>{children}</div>
            
          )}
        </div>
      );
    }
    useEffect(()=>{setEditDelay(editDelay + 1)},[0])
    useEffect(() => {
      if (editDelay == 1)
          callFetch("customers/" + params.id, "GET", []).then((res) => {
            setCustomer(res.data.customer);
            setCustomerOverview(res.data.overview);
          });
  }, [editDelay,params.id]);

  const SmallAvatar = styled(SoftAvatar)(({ theme }) => ({
    width: 22,
    height: 22,
    backgroundColor:"#fff",
    color:"darkgray",
    cursor:"pointer"
  }));
  return (
    <>
    <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          py: 2,
          px: 2,
        }}
        className="mt-5"
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Badge
              htmlFor="file"
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
            
            <SoftAvatar
              src={customer?.logo ? process.env.REACT_APP_STORAGE_URL + customer?.logo : '/assets/img/placeholder.png'}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
            </Badge>
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {customer?.name}
              </SoftTypography>
            </SoftBox>
          </Grid>
          
        </Grid>
      </Card>

            <div className="col-md-2 mt-4" >
            <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
              <AppBar position="static">
                <Tabs
                  orientation={tabsOrientation}
                  value={tabValue}
                  onChange={handleSetTabValue}
                  sx={{ background: "transparent" }}
                  
                > 
                  <Tab style={{ fontSize:"11px", fontWeight:"bold" }} label={t("OVERVIEW")} icon={<Cube />} />
                  <Tab style={{ fontSize:"11px", fontWeight:"bold" }} label={t("PROJECTS")} icon={<Settings />} />
                </Tabs>
              </AppBar>
            </Grid>
            </div>
      
                  <TabPanel value={tabValue} index={0}>
                  <div className='row' >
                  <div className='col-md-8 col-lg-8' >
                    <div className="card w-100" >
                          <div className="card-body">
                              <h6 className=' fw-normal' >Kunde</h6>
                              <div className='d-flex align-content-center' >
                                <SoftTypography className="w-15" variant="button" fontWeight="medium">{t('Name')}:</SoftTypography>
                                <SoftTypography variant="small" color="text" fontSize="0.9rem">{customer?.name}</SoftTypography>
                              </div>
                              <div className='d-flex align-content-center' >
                                <SoftTypography className="w-15" variant="button" fontWeight="medium">{t('Phone')}:</SoftTypography>
                                <SoftTypography variant="small" color="text" fontSize="0.9rem">{customer?.phone}</SoftTypography>
                              </div>
                              <div className='d-flex align-content-center' >
                                <SoftTypography className="w-15" variant="button" fontWeight="medium">{t('E-Mail')}:</SoftTypography>
                                <SoftTypography variant="small" color="text" fontSize="0.9rem">{customer?.email}</SoftTypography>
                              </div>
                              <div className='d-flex align-content-center'>
                                <SoftTypography className="w-15" variant="button" fontWeight="medium">{t('Address')}:</SoftTypography>
                                <SoftTypography variant="small" color="text" fontSize="0.9rem">{customer?.city +", " +customer?.street + ", "+ customer?.state + ", " + customer?.zip_code+ ", " + customer?.country}</SoftTypography>
                              </div>
                          </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-lg-4 mt-3 mt-sm-0 mt-md-0 mt-lg-0" >
                        <div className="row" >
                            <div className="col-md-6 mt-xs-3 mt-sm-3 mt-md-0 mt-lg-0" >
                              <SummaryCard
                                title={t("Orders")}
                                icon="wallet"
                                count={<NumericFormat
                                  value={customerOverview.orders_amount}
                                  displayType="text"
                                  thousandSeparator={","}
                                  decimalSeparator="."
                                  decimalScale={2}
                                  fixedDecimalScale
                                  suffix=' €'
                              />}
                              />
                            </div>
                            <div className="col-md-6 mt-xs-3 mt-3 mt-sm-3 mt-md-0 mt-lg-0" >
                              <SummaryCard
                                title={t("Quotations")}
                                icon="description"
                                count={<NumericFormat
                                  value={customerOverview.quotations_amount}
                                  displayType="text"
                                  thousandSeparator={","}
                                  decimalSeparator="."
                                  decimalScale={2}
                                  fixedDecimalScale
                                  suffix=' €'
                              />}
                              />
                            </div>
                            <div className="col-md-6 mt-3" >
                              <SummaryCard
                                title={t("Projects")}
                                icon="language_icon"
                                count={<NumericFormat
                                  value={customerOverview.total_project}
                                  displayType="text"
                                  thousandSeparator={","}
                                  decimalSeparator="."
                                  decimalScale={0}
                                  fixedDecimalScale
                                  suffix=''
                              />}
                              />
                            </div>
                            <div className="col-md-6 mt-3" >
                              <SummaryCard
                                title={t("Total Sales")}
                                icon="shopping_cart"
                                count={<NumericFormat
                                  value={customerOverview.total_sales}
                                  displayType="text"
                                  thousandSeparator={","}
                                  decimalSeparator="."
                                  decimalScale={2}
                                  fixedDecimalScale
                                  suffix=' €'
                              />}
                              />
                              
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="row mt-3" >
                      <div className="col-md-8 mt-2 mt-sm-3 mt-md-3 mt-lg-0" >
                          <CustomerMapContact info={customer} />
                      </div>
                      <div className="col-md-4 mt-2 mt-sm-3 mt-md-3 mt-lg-0" >
                        <Grid item xs={12} xl={4}>
                              <ProfilesList title={t("Contact Person")} contact={customer.id ? JSON.parse(customer.contact_person):[]} profiles={profilesListData} />
                        </Grid>
                      {/* <div className="card" >
                        <div className="card-body" >
                            <h6>Contact Person</h6>
                            
                        </div>
                      </div> */}
                            
                      </div>
                  </div>
              </TabPanel>
    
              <TabPanel value={tabValue} index={1} >
                <div className="row">
                  <div className="col-12">
                    <div className="card mb-4">
                      <div className="card-header pb-0">
                            
                      </div>
                      <div className="card-body px-0 pt-0 pb-2">
                        <ProjectsTable customer_id={customer.id ? customer.id : 0 } />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
                  
      
    </>
  )
}

export default CustomerDetails
