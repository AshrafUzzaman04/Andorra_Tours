import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import SeoSettingsIndexTable from "./SeoSettingsTable";

function SeoSettingsIndex() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = "Tours Andorra . Travel";
    }, []);
    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    <NavLink to="/seo-settings/create" className="btn btn-icon btn-primary">
                        {t('Add page SEO')}
                    </NavLink>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Seo Details')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <SeoSettingsIndexTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SeoSettingsIndex