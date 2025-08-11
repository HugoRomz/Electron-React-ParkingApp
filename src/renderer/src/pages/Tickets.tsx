import React from 'react'

const Tickets: React.FC = () => {
  return (
    <div>
      <div className="flex gap-2 items-center ">
        <h2 className="text-xl font-bold text-gray-900">Espacios de Estacionamiento</h2>

        <div className="flex items-center gap-2 ml-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500"></div>
            <span className="text-sm text-gray-600">Disponible</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-red-500"></div>
            <span className="text-sm text-gray-600">Ocupado</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Espacio 1</h3>
          </div>
          <div className="card-body">
            <p>Estado: Disponible</p>
            <button className="btn btn-primary mt-2">Reservar</button>
          </div>
          <div className="card-footer">
            <small className="text-gray-500">Última actualización: Hace 5 minutos</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tickets
