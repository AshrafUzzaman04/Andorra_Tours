import React from 'react'
import ExperienceInvirenoSlider from '../slider/ExperienceInvirenoSlider'
import Axios from '@/helper/axios'
import Fetch from '@/helper/Fetch';
const getData = async () =>{
    const res = await Fetch.get("/inverano");
    const inverano = res?.data?.data;
    const heading = res?.data?.heading;
    return {inverano, heading}
    
}

export const ExperienceInverano = async () => {
    const {inverano, heading} = await getData();
  return (
    <>
        <ExperienceInvirenoSlider inverano={inverano} headingData={heading}/>
    </>
  )
}
