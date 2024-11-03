import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import ResortsIndexTable from './ResortsIndexTable';

function ResortsIndex() {
    const { t } = useTranslation();
    useEffect(() => {
        document.title = "Tours Andorra . Travel";
    }, []);
    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    <NavLink to="/others/resorts/create" className="btn btn-icon btn-primary">
                        {t('Add Resort')}
                    </NavLink>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6 className="text-capitalize">{t('Resorts')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <ResortsIndexTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResortsIndex