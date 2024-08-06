import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import CustomerIndexTable from "./CustomerIndexTable";
import Cookies from 'js-cookie';

function CustomerIndex() {
    const { t } = useTranslation();
    useEffect(() => {
        document.title = "INGTEC . Marketing & Vertrieb";
    }, []);
    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    {Cookies.get('permissions').indexOf("customer-create") !== -1 ? (
                        <NavLink to="/customer-management/customers/create" className="btn btn-icon btn-primary">
                            {t('Add Customer')}
                        </NavLink>
                    ) : <></>}
                </div>
                <div>
                    {Cookies.get('permissions').indexOf("customer-create") !== -1 ? (
                        <button className="btn btn-icon btn-outline-dark" data-bs-toggle="modal" data-bs-target="#importModal">
                            {t('Import CSV,XLSX')}
                        </button>
                    ) : <></>}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Customers')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <CustomerIndexTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerIndex;
