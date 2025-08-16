import React from 'react'

interface BusinessInfoFormProps {
  data: Awaited<ReturnType<typeof window.api.configuracion.findOne>> | null
  onChange: (updates: any) => void
}

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({ data, onChange }) => {
  if (!data) return <div>Cargando...</div>

  const handleChange = (field: string, value: string): void => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-4 p-4 border rounded">
      <h3 className="font-semibold">Información del Negocio</h3>

      <input
        type="text"
        placeholder="Nombre del negocio"
        value={data.nombre_negocio}
        onChange={(e) => handleChange('nombre_negocio', e.target.value)}
        className="w-full p-2 border rounded"
      />

      {/* aQUI VAN LOS DEMAS PERO TRANQUILO */}
    </div>
  )
}

export default BusinessInfoForm
