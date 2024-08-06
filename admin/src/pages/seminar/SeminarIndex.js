import { useEffect } from "react";
import Cookies from 'js-cookie'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import SeminarTable from './SeminarTable'

const SeminarIndex = () => {
  const {t} = useTranslation()
  useEffect(() => {
    document.title = "INGTEC . Akademie";
  }, []);
  return (
    <>
    <div className=' d-sm-flex justify-content-between' >
        <div>
            {Cookies.get('permissions').indexOf("employee-create") !== -1 ? (
              <NavLink to="/course-management/seminars/create" className="btn btn-icon btn-primary" >
                {t('Add Seminar')}
              </NavLink>
            ):<></>}
            
        </div>
    </div>
    <div className="row">
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header pb-0">
                    <h6>{t('Seminar List')}</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                    <SeminarTable/>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default SeminarIndex