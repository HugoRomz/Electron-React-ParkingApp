import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const Dashboard: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
        <CardDescription>Estadísticas y resumen general</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, delectus. Consequatur
          nesciunt aut dolorum? Aspernatur nihil amet, fugit nulla necessitatibus aliquam maxime in
          sequi magni distinctio esse porro numquam sapiente!
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button>hola</Button>
        <Button>hola</Button>
      </CardFooter>
    </Card>
  )
}

export default Dashboard
