import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SectionOne from './components/SectionOne';
import SectionTwo from './components/SectionTwo';
import callFetch from 'helpers/callFetch';

const PartnersEdit = () => {
  const [data, setData] = useState()
  const params = useParams();
  const routes = useNavigate();
  useEffect(() => {
    if (params?.id) {
      callFetch("company-promotions/" + params.id, "GET", []).then((res) => {
        setData(res?.data)
      });
    }
  }, [params?.id])
  switch (params?.id) {
    case "section_one":
      return <SectionOne updateData={data}/>
    case "section_two":
      return <SectionTwo updateData={data}/>
    default:
      routes("/others/partners")
      break;
  }
}

export default PartnersEdit