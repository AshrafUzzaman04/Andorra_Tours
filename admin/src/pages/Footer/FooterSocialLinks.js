import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import SocialLinkIndexTable from "./SocialLinks/SocialLinkIndexTable";

const FooterSocialLinks = () => {
  const { t } = useTranslation();
  return (
    <>
    <div className="d-sm-flex justify-content-between">
        <div>
            <NavLink to="/footer/social-links/create" className="btn btn-icon btn-primary">
                {t('Add Social Link')}
            </NavLink>
        </div>
    </div>
    <div className="row">
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header pb-0">
                    <h6>{t('All Socail Links')}</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                    <SocialLinkIndexTable/>
                </div>
            </div>
        </div>
    </div>
</>
  );
};

export default FooterSocialLinks