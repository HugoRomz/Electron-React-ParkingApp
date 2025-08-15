import React from 'react'
import { Car, CheckCircle, Clock, DollarSign, ParkingCircle, Truck } from 'lucide-react'
import { MetricCard, MetricData } from '@renderer/components/common/MetricCard'
import { QuickActions } from '@renderer/components/features/dashboard/QuickActions'
import {
  VehicleTypeChart,
  VehicleTypeData
} from '@renderer/components/features/dashboard/VehicleTypeChart'

const dashboardMetrics: MetricData[] = [
  {
    title: 'Espacios Ocupados',
    value: 40,
    subtitle: 'de 60 total',
    colorText: 'text-blue-600',
    bgColor: 'bg-blue-100',
    icon: ParkingCircle
  },
  {
    title: 'Ingresos del Día',
    value: '$1,230',
    subtitle: '+12% vs ayer', // Mejoré el subtitle
    colorText: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: DollarSign
  },
  {
    title: 'Tickets Activos',
    value: 30,
    subtitle: 'pendientes de salida',
    colorText: 'text-orange-600',
    bgColor: 'bg-orange-100',
    icon: Clock
  },
  {
    title: 'Disponibles',
    value: 20,
    subtitle: 'espacios libres',
    colorText: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: CheckCircle
  }
]

const vehicleData: VehicleTypeData[] = [
  {
    name: 'Automóvil',
    price: 15,
    occupied: 65,
    total: 100,
    icon: Car
  },
  {
    name: 'Camioneta',
    price: 20,
    occupied: 15,
    total: 30,
    icon: Truck
  }
]

const Dashboard: React.FC = () => {
  return (
    <div className="p-2 space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard
            key={metric.title} // Mejor usar title como key única
            data={metric}
            className="py-0"
          />
        ))}
      </div>
      <QuickActions />
      <VehicleTypeChart data={vehicleData} />
    </div>
  )
}

export default Dashboard
