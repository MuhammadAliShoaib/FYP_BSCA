import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/landingPage'
import SignUpForm from '../pages/signupForm'
import MainLayout from '../pages/Manufacturer/mainLayout'

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="manufacturer/*" element={<MainLayout/>} />
            {/* // <Route path="/distributor" element={<Dashboard />} /> */}
        </Routes>
    )
}
