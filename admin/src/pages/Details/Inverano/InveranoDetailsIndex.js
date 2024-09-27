import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import InveranoDetailsIndexTable from "./InveranoDetailsIndexTable";

function InveranoDetailsIndex() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = "Tours Andorra . Travel";
    }, []);

return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    <NavLink to="/details/inverano/create" className="btn btn-icon btn-primary">
                        {t('Add Details')}
                    </NavLink>
                </div>
            </div>

            {/* Tab Panels */}
            <div className="row">
                <div className="col-12 mt-2">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Inverano Details')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <InveranoDetailsIndexTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InveranoDetailsIndex