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

  const parseSubtitle = (html) => {
    if (!html) return "";

    // Create a temporary DOM element to strip HTML tags
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Get the plain text content
    const text = tempDiv.textContent || tempDiv.innerText || "";

    // Split the text into words
    const words = text.split(" ");

    // Limit to 33 words
    const limitedText = words.slice(0, 33).join(" ");

    // Create a new temporary div for the limited text
    const limitedDiv = document.createElement("div");

    // Preserve formatting by putting the limited text back into a span or div
    limitedDiv.innerHTML = limitedText + (words.length > 33 ? "..." : "");

    return limitedDiv.innerHTML; // Return as HTML to maintain any formatting
  };

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