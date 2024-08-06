import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import SupplierIndexTable from "./SupplierIndexTable";
import Cookies from 'js-cookie';

function SupplierIndex() {
    const { t } = useTranslation();
    useEffect(() => {
        document.title = "INGTEC . Supply Chain";
    }, []);
    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    {Cookies.get('permissions').indexOf("supplier-create") !== -1 ? (
                        <NavLink to="/product-management/suppliers/create" className="btn btn-icon btn-primary">
                            {t('Add Supplier')}
                        </NavLink>
                    ) : <></>}
                </div>
                <div>
                    {Cookies.get('permissions').indexOf("customer-create") !== -1 ? (
                        <button className="btn btn-icon btn-outline-dark" data-bs-toggle="modal" data-bs-target="#importModal">
                            {t('Import XLSX')}
                        </button>
                    ) : <></>}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Suppliers')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <SupplierIndexTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SupplierIndex;
