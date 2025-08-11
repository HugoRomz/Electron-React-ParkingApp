// src/components/layout/MainLayout.tsx
import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-neutral-100">{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
