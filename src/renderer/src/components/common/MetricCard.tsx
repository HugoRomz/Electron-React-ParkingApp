import { LucideIcon } from 'lucide-react'
import { JSX } from 'react'
import { Card, CardContent } from '../ui'

export interface MetricData {
  title: string
  value: string | number
  subtitle?: string
  colorText: string
  bgColor: string
  icon: LucideIcon
}

interface MetricCardProps {
  data: MetricData
  className?: string
}

export const MetricCard = ({ data, className = '' }: MetricCardProps): JSX.Element => {
  const { title, value, subtitle, colorText, bgColor, icon: Icon } = data

  return (
    <Card className={`${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <div className={`size-12 ${bgColor} rounded-lg flex items-center justify-center `}>
            <Icon className={`size-6 ${colorText}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
