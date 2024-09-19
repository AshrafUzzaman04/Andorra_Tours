import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Tabs, Tab, Box } from '@mui/material';
import CategorySliderIndexTable from './CategorySliderIndexTable';
// Assuming you will add a Heading component or another section for tab switching.
import HeadingCategorySlider from './Heading/HeadingCategorySlider'; 

function CategorySliderIndex() {
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
                    <NavLink to="/theme-customization/category-slider/create" className="btn btn-icon btn-primary">
                        {t('Add Card Category')}
                    </NavLink>
                </div>
            </div>

            {/* Tabs Navigation */}
            <Box sx={{ borderBottom: 0, borderColor: 'divider', width: 350, backgroundColor: "#fff" }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab className="fw-medium" label={t('All Sliders')} />
                    <Tab className="fw-medium" label={t('Heading')} />
                </Tabs>
            </Box>

            {/* Tab Panels */}
            <div className="row">
                <div className="col-12 mt-2">
                    {tabIndex === 1 && (
                        <HeadingCategorySlider /> 
                    )}
                    {tabIndex === 0 && (
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <h6 className="text-capitalize">{t('All category sliders')}</h6>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <CategorySliderIndexTable />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CategorySliderIndex;
