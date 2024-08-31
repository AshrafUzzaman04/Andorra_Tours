import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import CategoryIndexTable from "pages/Category/CategoryIndexTable";
import VeranoIndexTable from "./VeranoIndexTable";

function VeranoIndex() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = "Tours Andorra . Travel";
    }, []);
    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    <NavLink to="/theme-customization/verano/create" className="btn btn-icon btn-primary">
                        {t('Add Verano')}
                    </NavLink>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Veranos')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <VeranoIndexTable/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default VeranoIndex