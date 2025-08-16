import BusinessInfoForm from '@renderer/components/features/configuration/business/BusinessInfoForm'
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui'
import { Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Configuration: React.FC = () => {
  const [originalData, setOriginalData] = useState<Awaited<
    ReturnType<typeof window.api.configuracion.findOne>
  > | null>(null)
  const [formData, setFormData] = useState<Awaited<
    ReturnType<typeof window.api.configuracion.findOne>
  > | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const loadConfiguration = async (): Promise<void> => {
      const configData = await window.api.configuracion.findOne()
      setOriginalData(configData)
      setFormData(configData)
      setHasChanges(false)
    }
    loadConfiguration()
  }, [])

  const checkForChanges = (newFormData): void => {
    const isEqual = JSON.stringify(newFormData) === JSON.stringify(originalData)
    setHasChanges(!isEqual)
  }

  const updateBusiness = (newBusinessData): void => {
    if (!formData) return

    // Crear nuevo borrador manteniendo todo lo demás
    const newFormData = {
      ...formData, // rates, spaces, system sin tocar
      business: newBusinessData // Solo cambiar business
    }

    // Actualizar el borrador
    setFormData(newFormData)

    // Activar detective
    checkForChanges(newFormData)
  }

  const handleSave = async (): Promise<void> => {
    if (!formData || !hasChanges) return

    try {
      await window.api.configuracion.update(formData.id, formData)
      setOriginalData(formData)
      setHasChanges(false)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDiscard = (): void => {
    if (originalData) {
      setFormData(originalData)
      setHasChanges(false)
    }
  }

  return (
    <div className="p-2 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Configuración del Sistema</h2>

        {hasChanges ? (
          <div className="flex gap-2">
            <Button onClick={handleDiscard} variant="outline">
              Descartar
            </Button>
            <Button onClick={handleSave} className="bg-success-500 hover:bg-success-600">
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        ) : (
          <Button disabled className="bg-success-500 hover:bg-success-600 opacity-50">
            <Save className="w-4 h-4 mr-2" />
            Sin Cambios
          </Button>
        )}
      </div>

      <Tabs defaultValue="business" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-neutral-200">
          <TabsTrigger value="business">Negocio</TabsTrigger>
          <TabsTrigger value="rates">Tarifas</TabsTrigger>
          <TabsTrigger value="spaces">Espacios</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="business">
          <BusinessInfoForm data={formData} onChange={updateBusiness} />
        </TabsContent>
        <TabsContent value="rates">Change your password here.</TabsContent>
        <TabsContent value="spaces">Change your password here.</TabsContent>
        <TabsContent value="system">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}

export default Configuration
