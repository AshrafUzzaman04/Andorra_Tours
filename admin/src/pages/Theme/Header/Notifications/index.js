// @mui material components
import Card from "@mui/material/Card"; 
import { useMemo, useEffect, useState, React } from "react";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from "react-i18next";
import SoftTypography from "components/SoftTypography";
import callFetch from "../../../../helpers/callFetch"; 

function HeaderManagment(props) {
  const [user, setUser] = useState([]);
  const { t } = useTranslation();  
  const [isUpdate, setIsUpdate] = useState(false);
  const [projectStatus, setProjectStatus] = useState('0');
  const [orderStatus, setOrderStatus] = useState('0');
  const [offerStatus, setOfferStatus] = useState('0');
  const [orderProcessingStatus, setOrderProcessingStatus] = useState('0');
  useEffect(() => {
    callFetch("get-notification-status", "GET", []).then((res) => {  
      setProjectStatus(res.user.alert_project_notification);
      setOrderStatus(res.user.alert_order_notification);
      setOfferStatus(res.user.alert_offer_notification);
      setOrderProcessingStatus(res.user.alert_status_orderprocessing_notification); 
    });
  }, []); 

  const updateStatus = (type) => {
    if(type == 'project'){
      if(projectStatus == '1'){
        setProjectStatus('0');
      }else{
        setProjectStatus('1');
      }
    } 

    if(type == 'order'){
      if(projectStatus == '1'){
        setOrderStatus('0');
      }else{
        setOrderStatus('1');
      }
    } 

    if(type == 'offer'){
      if(projectStatus == '1'){
        setOfferStatus('0');
      }else{
        setOfferStatus('1');
      }
    } 

    if(type == 'status_order_processing'){
      if(projectStatus == '1'){
        setOrderProcessingStatus('0');
      }else{
        setOrderProcessingStatus('1');
      }
    } 
    callFetch("update-notification-status/"+type, "GET", []).then((res) => { 
    });
  };

  return (
    <Card id="notifications">
      <SoftBox p={3} lineHeight={1}>
        <SoftBox>
          <SoftTypography variant="h5">{t('Manage')}</SoftTypography>
        </SoftBox>
        {/* <SoftTypography variant="button" color="text" fontWeight="regular">
          Choose how you receive notifications. These notification settings apply to the things
          you’re watching.
        </SoftTypography> */}
      </SoftBox>
      <SoftBox pb={3} px={3}>
        <SoftBox minWidth="auto">
          <table className="" style={{width: '100%'}}>
            <tr style={{borderBottom: '1px solid #eee', borderTop: '1px solid #eee'}}>
              <td width={'700px'} style={{padding: '10px'}}>
                  <SoftBox>
                    <SoftTypography display="block" variant="button" fontWeight="regular">
                      {t('Language')} 
                    </SoftTypography> 
                  </SoftBox>
              </td>
              <td>
                <div className="form-check form-switch">
                   {projectStatus != '0' && (
                      <input className="form-check-input" checked type="checkbox" onClick={() => updateStatus('project')}/>
                   )}
                   {projectStatus == '0' && (
                      <input className="form-check-input" type="checkbox" onClick={() => updateStatus('project')}/>
                   )}          
                </div>  
              </td>
            </tr>
            <tr style={{borderBottom: '1px solid #eee', borderTop: '1px solid #eee'}}>
              <td width={'700px'} style={{padding: '10px'}}>
                  <SoftBox>
                    <SoftTypography display="block" variant="button" fontWeight="regular">
                    {t('Currency')} 
                    </SoftTypography> 
                  </SoftBox>
              </td>
              <td> 
                <div className="form-check form-switch">
                  {orderStatus != '0' && (
                      <input className="form-check-input" checked type="checkbox" onClick={() => updateStatus('order')}/>
                   )}
                   {orderStatus == '0' && (
                      <input className="form-check-input" type="checkbox" onClick={() => updateStatus('order')}/>
                   )}    
                </div> 
              </td>
            </tr>
            <tr style={{borderBottom: '1px solid #eee', borderTop: '1px solid #eee'}}>
              <td width={'700px'} style={{padding: '10px'}}>
                  <SoftBox>
                    <SoftTypography display="block" variant="button" fontWeight="regular">
                    {t('Light / Dark')} 
                    </SoftTypography> 
                  </SoftBox>
              </td>
              <td>
                <div className="form-check form-switch">
                  {offerStatus != '0' && (
                      <input className="form-check-input" checked type="checkbox" onClick={() => updateStatus('offer')}/>
                   )}
                   {offerStatus == '0' && (
                      <input className="form-check-input" type="checkbox" onClick={() => updateStatus('offer')}/>
                   )}               
                </div>  
              </td>
            </tr>
            <tr style={{borderBottom: '1px solid #eee', borderTop: '1px solid #eee'}}>
              <td width={'700px'} style={{padding: '10px'}}>
                  <SoftBox>
                    <SoftTypography display="block" variant="button" fontWeight="regular">
                    {t('Sign In Button')} 
                    </SoftTypography> 
                  </SoftBox>
              </td>
              <td>
                <div className="form-check form-switch">
                  {orderProcessingStatus != '0' && (
                      <input className="form-check-input" checked type="checkbox" onClick={() => updateStatus('status_order_processing')}/>
                   )}
                   {orderProcessingStatus == '0' && (
                      <input className="form-check-input" type="checkbox" onClick={() => updateStatus('status_order_processing')}/>
                   )}   
                </div> 
              </td>
            </tr>
          </table> 
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default HeaderManagment;
