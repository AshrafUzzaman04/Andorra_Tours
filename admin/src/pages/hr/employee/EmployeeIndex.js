import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import EmployeeIndexTable from "./EmployeeIndexTable";
import Cookies from 'js-cookie';

function EmployeeIndex() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = "INGTEC . Human Resources";
    }, []);
    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    {Cookies.get('permissions').indexOf("employee-create") !== -1 ? (
                        <NavLink to="/human-resources/employees/create" className="btn btn-icon btn-primary">
                            {t('Add Employee')}
                        </NavLink>
                    ) : <></>}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Employees')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <EmployeeIndexTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmployeeIndex;
