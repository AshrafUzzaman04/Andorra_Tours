import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import callFetch from 'helpers/callFetch';
import parse from 'html-react-parser';
import SoftBadgeDot from 'components/SoftBadgeDot';

function PartnersIndexTable() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (refresh === 0) {
      callFetch("company-promotions", "GET", []).then((res) => {
        setData(res.data);
        setRefresh(1)
      });
    }
  }, [pageNumber]);

  return (
    <div className="row p-3">
      {
        data?.length !== 0 && data?.map((item, index) => (
          <div key={index} className="col-md-6">
            <div className="card shadow-sm overflow-hidden">
              <div className="card-header p-3 d-flex align-items-center justify-content-between" style={{ backgroundColor: "#F8F9FA" }}>
                <p className="fw-bold p-0 m-0 d-flex">
                  {item?.content_for
                    ?.replace(/_/g, ' ')
                    .replace(/\b\w/g, char => char.toUpperCase())}
                  <SoftBadgeDot
                    color={item?.status === "Active" ? "success" : "error"}
                    badgeContent={item?.status}
                    size="md"
                  />
                </p>
                <div className="d-flex align-items-center gap-2">
                  <NavLink to={"/others/partners/" + item?.content_for + "/edit"}><i className="fa fa-edit cursor-pointer"></i></NavLink>
                </div>
              </div>
              <div className="card-body">
                <p className="fw-bold p-0 m-0 text-center mb-3">{item?.title}</p>
                <div className="text-center">
                  {parse(item?.sub_title)}
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default PartnersIndexTable