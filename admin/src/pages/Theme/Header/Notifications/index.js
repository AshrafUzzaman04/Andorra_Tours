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
  const [isUpdate, setIsUpdate] = useState(0);
  const [languageStatus, setlanguageStatus] = useState(0);
  const [currencyStatus, setCurrencyStatus] = useState(0);
  const [lightDarkStatus, setLightDarkStatus] = useState(0);
  const [signInButtonStatus, setSignInButtonStatus] = useState(0);
  useEffect(() => {
    setlanguageStatus(props?.headerData?.show_language);
    setCurrencyStatus(props?.headerData?.show_currency);
    setLightDarkStatus(props?.headerData?.show_light_dark);
    setSignInButtonStatus(props?.headerData?.show_signin_button);
  }, [props]);

  const setIsChecked = (type) =>{
    const formData = {};
    if(type === "languageStatus"){
      formData.show_language = languageStatus;
    }else if (type === "currencyStatus"){
      formData.show_currency = currencyStatus;
    }else if (type === "lightDarkStatus"){
      formData.show_light_dark = lightDarkStatus;
    }else if (type === "signInButtonStatus"){
      formData.show_signin_button = signInButtonStatus;
    }
    try {
      callFetch("headers?toast=false", "POST", formData, []).then((res) => {
        if (!res.ok) return;
      });
    } catch (error) {
      
    }finally{
      props.refreshParent()
    }
    
    
  }

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
          <table className="" style={{ width: '100%' }}>
            <tr style={{ borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>
              <td width={'700px'} style={{ padding: '10px' }}>
                <SoftBox>
                  <SoftTypography display="block" variant="button" fontWeight="regular">
                    {t('Language')}
                  </SoftTypography>
                </SoftBox>
              </td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" checked={languageStatus === 1} type="checkbox" onChange={(e) => setlanguageStatus(e.target.checked ? 1 : 0)} onClick={()=>setIsChecked("languageStatus")} />
                </div>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>
              <td width={'700px'} style={{ padding: '10px' }}>
                <SoftBox>
                  <SoftTypography display="block" variant="button" fontWeight="regular">
                    {t('Currency')}
                  </SoftTypography>
                </SoftBox>
              </td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" checked={currencyStatus === 1} type="checkbox" onChange={(e) => setCurrencyStatus(e.target.checked ? 1 : 0)} onClick={()=>setIsChecked("currencyStatus")} />
                </div>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>
              <td width={'700px'} style={{ padding: '10px' }}>
                <SoftBox>
                  <SoftTypography display="block" variant="button" fontWeight="regular">
                    {t('Light / Dark')}
                  </SoftTypography>
                </SoftBox>
              </td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" checked={lightDarkStatus === 1} type="checkbox" onChange={(e) => setLightDarkStatus(e.target.checked ? 1 : 0)} onClick={()=>setIsChecked("lightDarkStatus")} />
                </div>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>
              <td width={'700px'} style={{ padding: '10px' }}>
                <SoftBox>
                  <SoftTypography display="block" variant="button" fontWeight="regular">
                    {t('Sign In Button')}
                  </SoftTypography>
                </SoftBox>
              </td>
              <td>
                <div className="form-check form-switch">
                  <input className="form-check-input" checked={signInButtonStatus === 1} type="checkbox" onChange={(e) => setSignInButtonStatus(e.target.checked ? 1 : 0)} onClick={()=>setIsChecked("signInButtonStatus")} />
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
