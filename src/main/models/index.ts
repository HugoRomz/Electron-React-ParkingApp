export interface Configuracion {
  id: number
  nombre_negocio: string
  direccion?: string
  telefono?: string
  logo_path?: string
  moneda: string
  simbolo_moneda: string
  tolerancia_minutos: number
  multa_ticket_perdido: number
  activo: number
  fecha_creacion: Date
  fecha_modificacion: Date
}
export type ConfiguracionCreate = Omit<
  Configuracion,
  'id' | 'fecha_creacion' | 'fecha_modificacion'
>
export type ConfiguracionUpdate = Partial<
  Omit<Configuracion, 'id' | 'fecha_creacion' | 'fecha_modificacion'>
>

export interface tipo_vehiculo {
  id: number
  nombre: string
  descripcion?: string
  activo: number
}
export type tipo_vehiculoCreate = Omit<tipo_vehiculo, 'id'>
export type tipo_vehiculoUpdate = Partial<Omit<tipo_vehiculo, 'id'>>

export interface tipo_espacio {
  id: number
  nombre: string
  descripcion?: string
  activo: number
}
export type tipo_espacioCreate = Omit<tipo_espacio, 'id'>
export type tipo_espacioUpdate = Partial<Omit<tipo_espacio, 'id'>>

export interface espacio {
  id: number
  numero: number
  tipo_espacio_id: number
  ocupado: number
  activo: number
  observaciones?: string
}
export type espacioCreate = Omit<espacio, 'id'>
export type espacioUpdate = Partial<Omit<espacio, 'id'>>

export interface tarifa {
  id: number
  tipo_vehiculo_id: number
  precio_hora: number
  fecha_desde: Date
  fecha_hasta: Date
  fecha_creacion: Date
}
export type tarifaCreate = Omit<tarifa, 'id' | 'fecha_creacion'>
export type tarifaUpdate = Partial<Omit<tarifa, 'id' | 'fecha_creacion'>>

export interface ticket {
  id: number
  numero_ticket: number
  espacio_id: number
  tipo_vehiculo_id: number
  placa?: string
  marca?: string
  modelo?: string
  color?: string
  observaciones_vehiculo?: string
  fecha_entrada?: Date
  fecha_salida?: Date
  estado: string
  ticket_perdido?: number
  tiempo_total_minutos?: number
  monto_calculado?: number
  monto_cobrado?: number
  anulado?: number
  motivo_anulacion?: string
  token_anulacion?: string
  fecha_anulacion?: Date
  fecha_creacion: Date
}
export type ticketCreate = Omit<ticket, 'id' | 'fecha_creacion'>
export type ticketUpdate = Partial<Omit<ticket, 'id' | 'fecha_creacion'>>

export interface pago {
  id: number
  ticket_id: number
  monto: number
  metodo_pago: string
  fecha_pago: Date
  observaciones?: string
}
export type pagoCreate = Omit<pago, 'id'>
export type pagoUpdate = Partial<Omit<pago, 'id'>>
