import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Tabs, Tab, Box } from '@mui/material';
import CategoryIndexTable from "pages/Category/CategoryIndexTable";
import VeranoIndexTable from "./VeranoIndexTable";
import HeadingVerano from "./Heading/HeadingInverano";

function VeranoIndex() {
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
                    <NavLink to="/theme-customization/verano/create" className="btn btn-icon btn-primary">
                        {t('Add Verano')}
                    </NavLink>
                </div>
            </div>

            {/* Tabs Navigation */}
            <Box sx={{ borderBottom: 0, borderColor: 'divider', width: 350, backgroundColor: "#fff" }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab className="fw-medium" label={t('All Veranos')} />
                    <Tab className="fw-medium" label={t('Verano Heading')} />
                </Tabs>
            </Box>

            {/* Tab Panels */}
            <div className="row">
                <div className="col-12 mt-2">
                    {tabIndex === 1 && <HeadingVerano />}
                    {tabIndex === 0 && (
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <h6>{t('All Veranos')}</h6>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <VeranoIndexTable />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default VeranoIndex;
