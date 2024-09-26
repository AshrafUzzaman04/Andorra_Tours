"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const DynamicPage = () => {
    const {slug} = useParams()
  return (
    <div>DynamicPage {slug}</div>
  ) 
}

export default DynamicPage