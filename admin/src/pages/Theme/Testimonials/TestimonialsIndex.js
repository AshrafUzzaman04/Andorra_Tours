import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Tabs, Tab, Box } from '@mui/material';
import TestimonialsIndexTable from './TestimonialsIndexTable';
import HeadingTestimonials from './Heading/HeadingTestimonials';

function TestimonialsIndex() {
    const { t } = useTranslation();
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        document.title = "Tours Andorra";
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    <NavLink to="/theme-customization/testimonials/create" className="btn btn-icon btn-primary">
                        {t('Add Testimonial')}
                    </NavLink>
                </div>
            </div>

            {/* Tabs Navigation */}
            <Box sx={{ borderBottom: 0, borderColor: 'divider', width: 350, backgroundColor: "#fff" }}>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab className="fw-medium" label={t('All Testimonials')} />
                    <Tab className="fw-medium" label={t('Testimonial Heading')} />
                </Tabs>
            </Box>

            {/* Tab Panels */}
            <div className="row mt-2">
                <div className="col-12">
                    {tabIndex === 0 && (
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <h6 className="text-capitalize">{t('All Testimonials')}</h6>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <TestimonialsIndexTable />
                            </div>
                        </div>
                    )}
                    {tabIndex === 1 && (
                        <HeadingTestimonials />
                    )}
                </div>
            </div>
        </>
    );
}

export default TestimonialsIndex;
