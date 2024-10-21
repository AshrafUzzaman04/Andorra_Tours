import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ProductIndexTable from "./ProductIndexTable";

function ProductIndex() {
  const params = useParams()
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    document.title = "Tours Andorra . Travel";
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <div className="d-sm-flex justify-content-between">
        <div>
          <NavLink to={`/products/${params?.slug}/product/create`} className="btn btn-icon btn-primary">
            {t('Add '+params?.slug+ " Product")}
          </NavLink>
        </div>
      </div>


      {/* Tab Panels */}
      <div className="row">
        <div className="col-12 mt-2">
          <div className="card mb-4">
            <div className="card-header pb-0">
              <h6 className=" text-capitalize">{t(`${params?.slug} Products`)}</h6>
            </div>
            <div className="card-body px-0 pt-0 pb-2">
              <ProductIndexTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductIndex