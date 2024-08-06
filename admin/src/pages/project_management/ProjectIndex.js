import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

import ProjectIndexTable from './ProjectIndexTable';

function ProjectIndex() {
    const { t } = useTranslation();
    
    useEffect(() => {
        document.title = "INGTEC . Projekt Management";
    }, []);
    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    {Cookies.get('permissions').indexOf("project-create") !== -1 ? (
                        <NavLink to="/project-management/projectscreate" className="btn btn-icon btn-primary">
                            {t('Add Project')}
                        </NavLink>
                    ) : <></>}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Projects')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <ProjectIndexTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectIndex;
