import {AppBar, Badge, Card, Grid, Tab, Tabs } from '@mui/material'
import SoftAvatar from 'components/SoftAvatar'
import React, { useEffect, useState } from 'react'
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import Cube from 'examples/Icons/Cube';
import Document from 'examples/Icons/Document';
import ProfilesList from 'examples/Lists/ProfilesList';
import profilesListData from "layouts/pages/profile/profile-overview/data/profilesListData";
import Table from 'examples/Tables/Table';
import tableData from "layouts/pages/users/reports/data/tableData";
import { useParams } from 'react-router-dom';
import { ModeEdit } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Settings from 'examples/Icons/Settings';
import callFetch from 'helpers/callFetch';
import SummaryCard from 'pages/customer_management/customer/components/SummaryCard';
import { useTranslation } from 'react-i18next';
import ProjectIndexTable from './ProjectIndexTable';

const EmployeeDetails = () => {
    const params = useParams()
    const {t} = useTranslation()
    const { columns, rows } = tableData;
    const [editDelay, setEditDelay] = useState(0);
    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
    const [tabValue, setTabValue] = useState(0);
    const [customer,setCustomer] = useState({})
    const [employeeId, setEmployeeId] = useState(0)
    const [totalProject,setTotalProject] = useState(0);
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
          callFetch("EmployeeDetails/" + params.id, "GET", []).then((res) => {
            setCustomer(res?.data)
            setTotalProject(res?.totalproject)
            setEmployeeId(res?.data?.user_id);
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
              badgeContent={
                <SmallAvatar>
                  <ModeEdit/>
                </SmallAvatar>
                
              }
            >
            <SoftAvatar
              src={customer?.user?.photo ? process.env.REACT_APP_STORAGE_URL + customer?.user?.photo : '/assets/img/placeholder.png'}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
            </Badge>
            <input id="file" type="file" className=" d-none" />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {customer?.user?.name}
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
              <Tab style={{ fontSize:"11px", fontWeight:"bold" }} label="OVERVIEW" icon={<Cube />} />
              <Tab style={{ fontSize:"11px", fontWeight:"bold" }} label="PROJECTS" icon={<Settings />} />
            </Tabs>
          </AppBar>
        </Grid>
      </div>
      
      <TabPanel value={tabValue} index={0}>
        <div className='row' >
          <div className='col-md-9 col-lg-9' >
            <div className="card w-100" >
              <div className="card-body">
                <h6 className=' fw-normal' >{t('Employee')}</h6>
                <div className='d-flex align-content-center gap-6' >
                  <SoftTypography variant="button" fontWeight="medium">
                    Name:
                  </SoftTypography>
                  <SoftTypography variant="small" color="text">
                    {customer?.user?.name}
                  </SoftTypography>
                </div>
                <div className='d-flex align-content-center gap-6' >
                  <SoftTypography variant="button" fontWeight="medium">
                    Phone:
                  </SoftTypography>
                  <SoftTypography variant="small" color="text">
                    {customer?.user?.mobile}
                  </SoftTypography>
                </div>
                <div className='d-flex align-content-center gap-6' >
                  <SoftTypography variant="button" fontWeight="medium">
                    E-Mail:
                  </SoftTypography>
                  <p className='p-0 m-0'>{customer?.user?.email}</p>
                </div>
                <div className='d-flex align-content-center gap-5' >
                  <SoftTypography variant="button" fontWeight="medium">
                    Address:
                  </SoftTypography>
                  <p className='p-0 m-0'>
                    {customer?.user?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 mt-3 mt-sm-0 mt-md-0 mt-lg-0" >
            <SummaryCard
              title="Projects"
              icon="language_icon"
              count={totalProject}
            />
          </div>
        </div>
      </TabPanel>
    
    <TabPanel value={tabValue} index={1} >
      <div className="row">
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header pb-0">
                    <h6>{t('All Projects')}</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                    <ProjectIndexTable id={params.id} />
                </div>
            </div>
        </div>
      </div>            
    </TabPanel>
                  
      
    </>
  )
}

export default EmployeeDetails