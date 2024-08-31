import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ServicesIndexTable from './ServicesIndexTable';

function ServicesIndex() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = "Tours Andorra . Travel";
    }, []);
    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    <NavLink to="/theme-customization/servcios-exclusivos/create" className="btn btn-icon btn-primary">
                        {t('Add Service')}
                    </NavLink>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Services')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <ServicesIndexTable/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ServicesIndex