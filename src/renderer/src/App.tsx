// src/App.tsx
import React from 'react'
import { MainLayout } from './components/layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
