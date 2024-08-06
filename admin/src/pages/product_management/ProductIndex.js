import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import ProductIndexTable from "./ProductIndexTable";

function ProductIndex() {
    const { t } = useTranslation();
    useEffect(() => {
        document.title = "INGTEC . Store";
    }, []);
    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    {Cookies.get('permissions').indexOf("product-create") !== -1 ? (
                        <NavLink to="/product-management/products/create" className="btn btn-icon btn-primary">
                            {t('Add Label')}
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
                            <h6>{t('All Label Stocks')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <ProductIndexTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductIndex;
