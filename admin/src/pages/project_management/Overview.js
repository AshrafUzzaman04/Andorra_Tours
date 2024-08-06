import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// @mui core components
import Card from "@mui/material/Card";
import { Navigate, useParams, NavLink } from "react-router-dom";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import moment from "moment";
import { Grid, Icon, Menu } from "@mui/material";
import { useTranslation } from "react-i18next";
import Timeline from "layouts/pages/projects/timeline";
import CloseIcon from "@mui/icons-material/Close";
import callFetch from "helpers/callFetch";
import { Info } from "@mui/icons-material";
function Overview (props) {
    const {t} = useTranslation()
    const [quationdata, setQuatationData] = useState(false);
    const [salsePerson, setSalsePerson] = useState(false);
    const [project,setProject] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(null);
    useEffect(() => {
        if(props.quation_id > 0){
            callFetch("quotations/" + props.quation_id + "/edit", "GET", []).then((res) => {
                setQuatationData(res.data.quotation); 
                setProject(res?.data.project)
                // setSalsePerson(res.salse_person); 
            });
        }
    }, [props.quation_id]);

    const renderMenu = () => (
        <Menu
          anchorEl={openMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(openMenu)}
          onClose={handleCloseMenu}
          keepMounted
        >
          <CloseIcon
            onClick={handleCloseMenu}
            style={{
              width: "17px",
              height: "25px",
              cursor: "pointer",
              zIndex: "1",
            }}
          />
          <Grid mt={0} item xs={12} lg={12} pl={8}>
            {/* <Timeline /> */}
            <SoftTypography variant="caption" color="text" >Overview</SoftTypography>
          </Grid>
        </Menu>

      );

    return (
        <Card>
                <div className="row" style={{padding: '15px'}}>
                        <div className="col-md-6">
                            <SoftBox>
                                <SoftTypography variant="h6" mr={1} >{props?.title}</SoftTypography>
                            </SoftBox>
                            <SoftBox p={1}>
                                <table>
                                    <tr>
                                        <td width="110"><SoftTypography variant="caption"><strong>Name: </strong></SoftTypography></td>
                                        <td><SoftTypography variant="caption">{quationdata.customer ? quationdata.customer.name : ' '} {quationdata.name ? quationdata.name : ' '}</SoftTypography></td>
                                    </tr>
                                    <tr>
                                        <td><SoftTypography variant="caption"><strong>Phone: </strong></SoftTypography></td>
                                        <td><SoftTypography variant="caption">{quationdata.customer ? quationdata.customer.phone : ' '}</SoftTypography></td>
                                    </tr>
                                    <tr>
                                        <td><SoftTypography variant="caption"><strong>Address: </strong></SoftTypography></td>
                                        <td><SoftTypography variant="caption">{quationdata.customer ? quationdata.customer.street : ' '}, {quationdata.customer ? quationdata.customer.state : ' '}, {quationdata.customer ? quationdata.customer.city : ' '}</SoftTypography></td>
                                    </tr>
                                    {/* <tr>
                                        <td><SoftTypography variant="caption"><strong>Sales Person: </strong></SoftTypography></td>
                                        <td><SoftTypography variant="caption"><a style={{textDecoration: 'underline', color: '#005498',cursor:"pointer"}} href="#">{salsePerson ? salsePerson : ' '} </a></SoftTypography></td>
                                    </tr> */}
                                </table>
                            </SoftBox> 
                        </div>
                        <div className={`col-md-6 ${props?.title && "mt-4" } `}>
                                <table>
                                    <tr>
                                        <td width="110"><SoftTypography variant="caption"><strong>Quoation Nr.: </strong></SoftTypography></td>
                                        <td><SoftTypography variant="caption">
                                            <NavLink to={'/customer-management/quotations/' + quationdata.id + '/edit'}  data-bs-dismiss="modal" style={{textDecoration: '1px solid'}}><SoftTypography style={{textDecoration: 'underline', color: '#005498'}} variant="caption" color="text">{quationdata.id ? quationdata.identity_number : ' '} </SoftTypography></NavLink>
                                             
                                            </SoftTypography>
                                        </td>
                                        <td><SoftTypography variant="caption" color="text" mr={1} ml={1}> /</SoftTypography></td>
                                        <td> <SoftTypography variant="caption" color="text" >{quationdata && moment(quationdata?.created_at).format("D.M.Y")}</SoftTypography></td>
                                        <td> 
                                                <span style={{height: '0.375rem',marginLeft:"0.375rem", width: '0.375rem', backgroundColor: quationdata?.status == '1-Verkauft' ?
                                                        '#21d4fd' : quationdata?.status == '2-Kontte nicht verkauft werden' ? 
                                                        '#ff0080' : quationdata?.status == '3-Angebot' ? 
                                                        '#fbcf33' : quationdata?.status == '4-Überleger' ? 
                                                        '#e6980b' : quationdata?.status == '5-Kunde war nicht da' ? 
                                                        '#9320bb' : quationdata?.status == '6-Kein Interesse / Keine Beratung' ? 
                                                        '#9320bb' : quationdata?.status == '7-Technisch nicht möglich' ? 
                                                        '#9320bb' : quationdata?.status == '0-Zeitlich nicht geschaft' ? 
                                                        '#9320bb' : 'dark', borderRadius: '50%', display: 'inline-block'}}></span>
                                                <SoftTypography variant="caption" color="text" style={{position: 'relative', top: '1px', left: '3px', fontSize: '0.75rem', display: 'inline'}}>{quationdata?.status}</SoftTypography>
                                            {/* <SoftTypography mr={1} variant="caption" color="text" >
                                            {quationdata?.status}</SoftTypography> */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><SoftTypography variant="caption"><strong>Project Nr.: </strong></SoftTypography></td>
                                        <td><SoftTypography variant="caption"><NavLink to={'/project-management/projects/' + project.id + '/edit'}  data-bs-dismiss="modal" style={{textDecoration: '1px solid'}}><SoftTypography style={{textDecoration: 'underline', color: '#005498'}} variant="caption" color="text">{project ? project.identity_number : ' '}</SoftTypography></NavLink></SoftTypography></td>
                                        <td><SoftTypography variant="caption" color="text" mr={1} ml={1}> /</SoftTypography></td>
                                        <td><SoftTypography variant="caption" color="text" >{project && moment(project?.created_at).format("D.M.Y") }</SoftTypography></td>
                                        <td> 
                                            <>
                                                 <span className=" ms-2" style={{height: '0.375rem', width: '0.375rem', backgroundColor: project.status == 'In Progress' ? '#9320bb' : 'green', borderRadius: '50%', display: 'inline-block'}}></span>
                                                <SoftTypography style={{position: 'relative', top: '1px', left: '3px', fontSize: '0.75rem', display: 'inline'}}>{t(project.status)}</SoftTypography>
                                            </>
                                        </td>
                                    </tr> 
                                    <tr>
                                        <td><SoftTypography onClick={handleOpenMenu} style={{textDecoration: 'underline', color: '#005498',cursor:"pointer"}} variant="caption"><strong style={{ display:"flex", alignItems:"center", marginTop:"0.30rem" }} ><Info/>&nbsp;{t('Overview')}</strong></SoftTypography></td>
                                        {renderMenu()}
                                    </tr> 
                                </table>
                        </div>
                    
                </div>
                </Card>
    )
}

export default Overview;