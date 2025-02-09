import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import ServiceNewsletterIndexTable from "./ServiceNewsletterIndexTable";

function ServiceNewsletterIndex() {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = "Tours Andorra . Travel";
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Service Newsletters')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <ServiceNewsletterIndexTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceNewsletterIndex