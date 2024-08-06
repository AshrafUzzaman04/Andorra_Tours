import { useEffect } from "react";
import React from 'react'
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import InvoiceIndexTable from './InvoiceIndexTable';
const InvoiceIndex = () => {
    const { t } = useTranslation();
    useEffect(() => {
        document.title = "INGTEC . Finanzen";
    }, []);
  return (
    <>
      <div className="d-sm-flex justify-content-between">
                  <div>
                      {Cookies.get('permissions').indexOf("customer-create") !== -1 ? (
                          <NavLink to="/finance/invoice/create" className="btn btn-icon btn-primary">
                              {t('Create Invoice')}
                          </NavLink>
                      ) : <></>}
                     
                  </div>
                  <div>
                  {Cookies.get('permissions').indexOf("customer-create") !== -1 ? (
                          <a href='#' className="btn btn-outline-dark">
                              {t('Export CSV')}
                          </a>
                      ) : <></>}
                  </div>
          </div>
          <div className="row">
                  <div className="col-12">
                      <div className="card mb-4">
                          <div className="card-header pb-0">
                              <h6>{t('All Invoices')}</h6>
                          </div>
                          <div className="card-body px-0 pt-0 pb-2">
                              <InvoiceIndexTable />
                          </div>
                      </div>
                  </div>
        </div>
    </>
  )
}

export default InvoiceIndex