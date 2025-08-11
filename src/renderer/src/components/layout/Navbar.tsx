import { CircleParking, Clock, Plus } from 'lucide-react'
import React from 'react'

const Navbar: React.FC = () => {
  return (
    <header className="h-12 bg-white border-b border-border-primary flex items-center px-4">
      <div className="flex items-center gap-4">
        <h2 className="text-lg text-text-primary font-bold">Estacionamiento Central</h2>
        <div className="inline-flex items-center gap-2">
          <div className="size-2 bg-success-500 rounded-full"></div>
          <span className="text-text-secondary text-sm">Sistema Activo</span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="inline-flex items-center gap-1.5">
          <CircleParking size={16} className="text-success-500" />
          <span className="font-extrabold text-success-500">43</span>
          <span className="text-text-secondary text-sm font-medium">libres</span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <Clock size={16} className="text-danger-500" />
          <span className="font-extrabold text-danger-500">42</span>
          <span className="text-text-secondary text-sm font-medium">ocupados</span>
        </div>
        <button className="btn btn-success px-3 py-1">
          <Plus size={16} />
          Ticket Rápido
        </button>
      </div>
    </header>
  )
}

export default Navbar
