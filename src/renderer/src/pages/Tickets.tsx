import { Badge } from '@renderer/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@renderer/components/ui/card'

import React from 'react'

const Tickets: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-2 items-center ">
        <CardTitle className="text-xl font-bold text-gray-900">
          Espacios de Estacionamiento
        </CardTitle>

        <CardDescription>
          <Badge variant="secondary" className="bg-white text-gray-600 ">
            <div className="w-2 h-2 bg-green-500"></div>
            Disponible
          </Badge>
          <Badge variant="secondary" className="bg-white text-gray-600">
            <div className="w-2 h-2 bg-red-500"></div>
            Ocupado
          </Badge>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default Tickets
