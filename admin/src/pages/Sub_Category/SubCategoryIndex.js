import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import SubCategoryIndexTable from "./SubCategoryIndexTable";

function SubCategoryIndex() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = "Tours Andorra . Travel";
    }, []);
    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    <NavLink to="/categories/sub-category/create" className="btn btn-icon btn-primary">
                        {t('Add Sub Category')}
                    </NavLink>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Sub Categories')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <SubCategoryIndexTable/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubCategoryIndex