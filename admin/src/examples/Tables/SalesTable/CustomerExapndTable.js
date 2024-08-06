import { useMemo, useEffect, useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { TableBody, TableCell } from "@mui/material";
import breakpoints from "assets/theme/base/breakpoints";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import * as React from "react";
import { IoDocumentText } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import dateFormat from "dateformat";
import { json } from "react-router-dom";

const CustomerExapndTable = (props) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(true);
  const [showKey, setShowKey] = React.useState(0);
  const { values } = breakpoints;
  const [data, setData] = useState([]);

  const HandleShow = (e) => {
    if(showKey === e){
      setShowKey(0);
    }else{
      setShowKey(e);
    }
    
  };
  
  /*
  const data = [
    {
      id: 1,
      project_nr: "KRS-01",
      username: "Super Admin",
      date: "19.09.2022",
    },
    {
      id: 2,
      project_nr: "500002",
      username: "Username Ingtec",
      date: "12.08.2022",
    },
    {
      id: 3,
      project_nr: "500003",
      username: "Username Ingtec",
      date: "12.08.2022",
    },
  ];
  */

  useEffect(() => {
    setData(props.projects)   
    data?.map((project, index) => {
      console.log(project.forms)      
    })
  }, [props.projects]);
  
  return (
    <div className="container">
      <div className="col-md-12">
        <div className="panel panel-default">
          <div
            style={{ fontSize: "18px" }}
            className="panel-heading fw-bolder mt-4 mb-3 ms-2"
          >
          <SoftBox display="flex" flexDirection="column">
          <SoftTypography
            variant={window.innerWidth < values.sm ? "h3" : "h2"}
            textTransform="capitalize"
            fontWeight="bold"
            fontSize="18px"
          >
            {t('My Projects')}
          </SoftTypography>
          </SoftBox>
          </div>
          <div className="panel-body">
            <table style={{ width:"100%" }}  className="table table-borderless table-responsive ">

                {data?.map((project, index) => {
                  return (
                    <React.Fragment key={index}>
                     <thead className=" text-start">
                      <tr style={{ fontSize:"11px" }} className="text-start ">
                        <td className="ps-2 pb-0 fw-bolder">{t('Project Nr')}:</td>
                        <td className="ps-2 pb-0 fw-bolder">{t('Contact Person')}:</td>
                        <td className="ps-2 pb-0 fw-bolder">{t('Date')}:</td>
                        <td className="ps-2 pb-0"></td>
                        <td className="ps-2 pb-0"></td>
                        
                      </tr>
                    </thead>
                    <tbody style={{ borderBottom:"1px solid #E2E8F0", marginBottom:"2px", width:"100%" }} >
                      <tr
                      
                        style={{borderBottom:"1px" }}
                        data-toggle="collapse"
                        data-target="#demo1"
                        className="accordion-toggle"
                        
                      >

                        <td className="w-25 pt-0">
                          <SoftBox display="flex" flexDirection="column">
                            <SoftTypography color="text" align="right" variant="button" fontWeight="bold" textTransform="capitalize">
                              {project.identity_number}
                            </SoftTypography>
                          </SoftBox>
                        </td>
                        <td style={{ fontSize:"14px" }} className="w-25 pt-0" >
                          <SoftTypography color="text" align="right" variant="button" fontWeight="bold" textTransform="capitalize">
                            {project.creator.name}
                          </SoftTypography>
                        </td>
                        <td style={{ fontSize:"14px" }} className=" w-25 pt-0">
                          <SoftTypography color="text" align="right" variant="button" fontWeight="bold" textTransform="capitalize">
                            {dateFormat(project.created_at, "dd.mm.yyyy")}
                          </SoftTypography>
                        </td>
                        <td style={{ fontSize:"14px" }} className=" w-25 pt-0"></td>
                        
                        <td onClick={() => HandleShow(project.id)} style={{ fontSize:"12px",color:"#A0AEC0", cursor:"pointer" }} className=" pt-0 w-25 d-flex"> 
                          <SoftTypography color="secondary" align="right" fontSize="12px" variant="button" fontWeight="bold" textTransform="capitalize">
                            {showKey === project.id ? t("Show less"):t("Show more")}
                          </SoftTypography>
                          <div onClick={() => HandleShow(project.id)}>
                            {
                             showKey === project.id ? <KeyboardArrowUp style={{ height: "1.5rem", width: "1.5rem" }}/>:<KeyboardArrowDown
                              style={{ height: "1.5rem", width: "1.5rem" }}
                                onClick={() => HandleShow(project.id)}
                              />
                            }
                          </div>
                        </td>


                        
                      </tr>
                      
                      <tr
                        className={`${showKey === project.id ? "hidden" : "d-none"} borderless`}
                      >
                        <td colSpan="5" className="pe-0 ps-0">
                          <div style={{
                            backgroundColor: "#F5F5F5",
                            transition: "ease-in-out",
                            textAlign:"center",
                            margin:"5px",
                            padding:"5px 10px",
                            marginBottom:"5px",
                            width:`${window.innerWidth < values.sm ? "25rem":"45rem"}`,
                            borderRadius:"5px"
                            
                          }} className="attchments dashboard-project-table-attachments d-flex align-items-center justify-content-center justify-content-between" >
                            {project?.forms.map((form, forms_index) => {
                              return (
                              <div className="attchement me-5" key={forms_index} >
                                <a href={process.env.REACT_APP_STORAGE_URL + 'projects/' + project.id + '/' + form.id + '/export'} target="_blank">
                                <IoDocumentText
                                  color="#A5C212"
                                  className="align-items-center cursor-pointer"
                                  style={{ width:"33px",height:"40px" }}
                                />
                                </a>
                                <p style={{ fontSize:"8px" }}>{form.name}</p>
                              </div>
                              )
                            })}
                          </div>
                        </td>
                        
                      </tr>
                        
                      </tbody>
                      
                    </React.Fragment>
                  );
                })}
                
              
              
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerExapndTable;
