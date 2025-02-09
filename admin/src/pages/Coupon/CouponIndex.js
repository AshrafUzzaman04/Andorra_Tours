import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import CouponIndexTable from "./CouponIndexTable";

function CouponIndex() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = "Tours Andorra . Travel";
    }, []);
    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    <NavLink to="/coupons/create" className="btn btn-icon btn-primary">
                        {t('Add Coupon')}
                    </NavLink>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Coupon Codes')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <CouponIndexTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CouponIndex