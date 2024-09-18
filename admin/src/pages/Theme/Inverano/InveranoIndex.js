import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import InveranoIndexTable from "./InveranoIndexTable";
import HeadingInverano from "./Heading/HeadingInverano";

function InveranoIndex() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = "Tours Andorra . Travel";
    }, []);
    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    <NavLink to="/theme-customization/inverano/create" className="btn btn-icon btn-primary">
                        {t('Add Inverano')}
                    </NavLink>
                </div>
            </div>
            <HeadingInverano/>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Inveranos')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <InveranoIndexTable/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default InveranoIndex