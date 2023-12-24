import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/landingPage'
import SignUpForm from '../pages/signupForm'
import ManufacturerMain from '../pages/Manufacturer/manuMain'
import DistributorMain from '../pages/Distributor/distMain'

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="manufacturer/*" element={<ManufacturerMain/>} />
            <Route path="distributor/*" element={<DistributorMain/>} />
        </Routes>
    )
}
