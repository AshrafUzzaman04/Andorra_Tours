import { useEffect } from "react";
import OrderIndexTable from './OrderIndexTable'
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import CustomerIndexTable from '../customer/CustomerIndexTable';
const OrderIndex = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "INGTEC . Marketing & Vertrieb";
}, []);
  return (
    <>
        <div className="d-sm-flex justify-content-between">
                <div>
                    {Cookies.get('permissions').indexOf("customer-create") !== -1 ? (
                        <NavLink to="/customer-management/orders/create" className="btn btn-icon btn-primary">
                            {t('Add Order')}
                        </NavLink>
                    ) : <></>}
                </div>
        </div>
        <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Orders')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <OrderIndexTable />
                        </div>
                    </div>
                </div>
        </div>
    </>
  )
}

export default OrderIndex