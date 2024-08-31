import React from 'react'
import ExperienceInvirenoSlider from '../slider/ExperienceInvirenoSlider'
import Axios from '@/helper/axios'
import Fetch from '@/helper/Fetch';
const getData = async () =>{
    const res = await Fetch.get("/inverano");
    return res?.data?.data
}
export const ExperienceInverano = async () => {
    const inverano = await getData();
  return (
    <>
        <ExperienceInvirenoSlider inverano={inverano}/>
    </>
  )
}
