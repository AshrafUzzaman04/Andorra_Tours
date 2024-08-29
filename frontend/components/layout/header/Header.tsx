import React from 'react'
import Header1 from './Header1'
import Axios from '@/helper/axios'
const getData = async () =>{
    const data = await Axios.get("/header");
    return data?.data?.data;
}
const Header = async ({ scroll, handleLogin, handleMobileMenu, handleRegister, handleSidebar }: any) => {
    const data = await getData();
  return (
    <div>
        <Header1
            data={data}
            scroll={scroll}
            handleLogin={handleLogin}
            handleMobileMenu={handleMobileMenu}
            handleRegister={handleRegister}
            handleSidebar={handleSidebar}
        />
    </div>
  )
}

export default Header