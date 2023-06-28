import React from 'react'
import Home from './Home/Home'
import RandomImage from './RandomImage/RandomImage'
import PasswordGenerator from '../src/PasswordGenerator/PasswordGenerator'
import { Routes, Route } from 'react-router-dom'
import MyAppBar from './components/Navbar/MyAppBar'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
    return (
        <>
            <MyAppBar />
            <Navbar />
            <Routes>
                <Route index path="/home" element={<Home />}></Route>
                <Route path="/img" element={<RandomImage />}></Route>
                <Route
                    path="/password_generator"
                    element={<PasswordGenerator />}
                ></Route>
            </Routes>
            <Footer />
        </>
    )
}

export default App
