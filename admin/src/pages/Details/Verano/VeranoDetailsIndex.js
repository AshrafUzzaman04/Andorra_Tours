import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import VeranoDetailsIndexTable from "./VeranoDetailsIndexTable";

function VeranoDetailsIndex() {
    const { t } = useTranslation();
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        document.title = "Tours Andorra . Travel";
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    <NavLink to="/details/verano/create" className="btn btn-icon btn-primary">
                        {t('Add Details')}
                    </NavLink>
                </div>
            </div>

            {/* Tab Panels */}
            <div className="row">
                <div className="col-12 mt-2">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Verano Details')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <VeranoDetailsIndexTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default VeranoDetailsIndex