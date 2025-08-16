import { Button, Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui'
import { Plus, Printer, Search } from 'lucide-react'
import { JSX } from 'react'

export const QuickActions = (): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <Button
            size="lg"
            className="h-20 flex flex-col space-y-2"
            onClick={() => alert('Nuevo Ticket')}
          >
            <Plus className="w-6 h-6" />
            <span>Nuevo Ticket</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-20 flex flex-col space-y-2 bg-transparent"
            onClick={() => alert('Buscar Ticket')}
          >
            <Search className="w-6 h-6" />
            <span>Buscar Ticket</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-20 flex flex-col space-y-2 bg-transparent"
            onClick={() => alert('Imprimir Ticket')}
          >
            <Printer className="w-6 h-6" />
            <span>Reimprimir</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
