import { Card, CardHeader, CardTitle, CardContent } from '@renderer/components/ui'
import { LucideIcon } from 'lucide-react'
import { JSX } from 'react'

export interface VehicleTypeData {
  name: string
  price: number
  occupied: number
  total: number
  icon: LucideIcon
}

interface VehicleTypeChartProps {
  data: VehicleTypeData[]
}

export const VehicleTypeChart = ({ data }: VehicleTypeChartProps): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Estado por Tipo de Vehículo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((vehicleType) => {
            const Icon = vehicleType.icon
            const occupancyPercentage = (vehicleType.occupied / vehicleType.total) * 100

            return (
              <div
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
                key={vehicleType.name}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{vehicleType.name}</p>
                    <p className="text-sm text-gray-500">${vehicleType.price}/hora</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {vehicleType.occupied}/{vehicleType.total}
                    </p>
                    <p className="text-sm text-gray-500">
                      {Math.round(occupancyPercentage)}% ocupado
                    </p>
                  </div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all"
                      style={{ width: `${occupancyPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
