import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import FormIndexTable from "./FormIndexTable";
import Cookies from 'js-cookie';

function FormIndex() {
    const { t } = useTranslation();
    useEffect(() => {
        document.title = "INGTEC . Checklisten & Formulare";
    }, []);

    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    {Cookies.get('permissions').indexOf("form-create") !== -1 ? (
                        <NavLink to="/forms/create" className="btn btn-icon btn-primary">
                            {t('Add Form')}
                        </NavLink>
                    ) : <></>}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('Checklist & Forms')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <FormIndexTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormIndex;
