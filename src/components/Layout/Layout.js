import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import MyAppBar from '../Navbar/MyAppBar'

function Layout() {
    return (
        <>
            <MyAppBar />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
