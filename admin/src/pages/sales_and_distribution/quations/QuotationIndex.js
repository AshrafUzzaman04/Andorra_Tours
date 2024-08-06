import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

import QuotationIndexTable from './QuotationIndexTable';

function QuotationIndex() {
    const { t } = useTranslation();
    useEffect(() => {
        document.title = "INGTEC . Store & Vertrieb";
    }, []);

    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                {Cookies.get('permissions').indexOf("quotation-create") !== -1 ? (
                    <NavLink to="/customer-management/quotations/create" className="btn btn-icon btn-primary">
                        {t('Add Quotation')}
                    </NavLink>
                ) : <></>}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Quotations')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <QuotationIndexTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuotationIndex;
