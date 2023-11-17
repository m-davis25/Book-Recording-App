import React, { useState } from 'react'
import Header from '../Components/Header'
import Home from '../Pages/Home';
import { Outlet } from 'react-router'


const Layout = () => {
  return (
    <main>
        <Header />
        <Outlet />
        <Home />
    </main>
  )
}

export default Layout