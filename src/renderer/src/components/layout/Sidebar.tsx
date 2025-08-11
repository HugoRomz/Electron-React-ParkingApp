import { ChartColumn, CircleParking, ClipboardMinus, ClockAlert, Settings } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar: React.FC = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: ChartColumn },
    { path: '/tickets', label: 'Tickets Activos', icon: ClockAlert },
    { path: '/reports', label: 'Reportes', icon: ClipboardMinus },
    { path: '/configs', label: 'Configuración', icon: Settings }
  ]

  return (
    <aside className="w-64 bg-white text-text-primary flex-shrink-0 border-r border-border-primary">
      <div className="py-6 px-4 border-b border-border-primary flex gap-2 items-center">
        <div className="relative">
          <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
            <CircleParking size={24} className="text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-text-primary">ParkingPro</span>
          <span className="text-sm font-semibold text-text-secondary">Estacionamiento Central</span>
        </div>
      </div>

      <nav className="mt-4 inline-flex flex-col gap-2 w-full">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 mx-4 text-sm hover:bg-primary-100 hover:ring-1 ring-primary-200 rounded-md hover:text-primary-500 font-semibold ${
                location.pathname === item.path
                  ? 'bg-primary-100  ring-1 ring-primary-200 text-primary-500'
                  : ''
              }`}
            >
              <IconComponent size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
