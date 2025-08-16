// ===== CONFIGURACIONES =====
export interface Configuracion {
  id: number
  nombre_negocio: string
  direccion?: string
  telefono?: string
  logo_path?: string
  moneda: string // DEFAULT 'MXN'
  simbolo_moneda: string // DEFAULT '$'
  tolerancia_minutos: number // DEFAULT 15
  multa_ticket_perdido: number // DEFAULT 0.00

  cobro_minimo: number // DEFAULT 0.00
  fraccion_minutos?: number // DEFAULT NULL - para cobro por fracciones
  redondeo_tipo: string // DEFAULT 'ninguno' - 'arriba', 'abajo', 'ninguno'
  mensaje_ticket: string // DEFAULT 'Gracias por su visita'

  activo: number // BOOLEAN DEFAULT 1
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

// ===== TIPO VEHÍCULOS =====
export interface TipoVehiculo {
  id: number
  nombre: string
  descripcion?: string
  icono: string // DEFAULT 'car' - para UI: 'car', 'truck', 'bike'
  orden_display: number // DEFAULT 1
  activo: number // BOOLEAN DEFAULT 1
}

export type TipoVehiculoCreate = Omit<TipoVehiculo, 'id'>
export type TipoVehiculoUpdate = Partial<Omit<TipoVehiculo, 'id'>>

// ===== TIPO ESPACIOS =====
export interface TipoEspacio {
  id: number
  nombre: string
  descripcion?: string
  color_hex: string // DEFAULT '#3B82F6' - para UI
  orden_display: number // DEFAULT 1
  activo: number // BOOLEAN DEFAULT 1
}

export type TipoEspacioCreate = Omit<TipoEspacio, 'id'>
export type TipoEspacioUpdate = Partial<Omit<TipoEspacio, 'id'>>

// ===== ESPACIOS =====
export interface Espacio {
  id: number
  numero: string // TEXT NOT NULL (no number!)
  tipo_espacio_id: number
  ocupado: number // BOOLEAN DEFAULT 0
  activo: number // BOOLEAN DEFAULT 1
  observaciones?: string
}

export type EspacioCreate = Omit<Espacio, 'id'>
export type EspacioUpdate = Partial<Omit<Espacio, 'id'>>

// ===== TARIFAS =====
export interface Tarifa {
  id: number
  tipo_vehiculo_id: number
  precio_hora: number // DECIMAL(10,2) NOT NULL
  fecha_creacion: Date
}

export type TarifaCreate = Omit<Tarifa, 'id' | 'fecha_creacion'>
export type TarifaUpdate = Partial<Omit<Tarifa, 'id' | 'fecha_creacion'>>

// ===== TICKETS =====
export interface Ticket {
  id: number
  numero_ticket: string // TEXT NOT NULL (no number!)
  espacio_id?: number // Puede ser NULL
  tipo_vehiculo_id: number

  // Datos del vehículo (opcionales)
  placa?: string
  marca?: string
  modelo?: string
  color?: string
  observaciones_vehiculo?: string

  // Fechas y tiempos
  fecha_entrada: Date // NOT NULL DEFAULT CURRENT_TIMESTAMP
  fecha_salida?: Date
  tiempo_total_minutos?: number

  // Estado y cálculos
  estado: string // NOT NULL DEFAULT 'activo' - 'activo', 'pagado', 'anulado'
  ticket_perdido: number // BOOLEAN DEFAULT 0
  monto_calculado?: number // DECIMAL(10,2)
  monto_cobrado?: number // DECIMAL(10,2)

  // Anulación
  anulado: number // BOOLEAN DEFAULT 0
  motivo_anulacion?: string
  fecha_anulacion?: Date

  fecha_creacion: Date
}

export type TicketCreate = Omit<Ticket, 'id' | 'fecha_creacion'>
export type TicketUpdate = Partial<Omit<Ticket, 'id' | 'fecha_creacion'>>

// ===== PAGOS =====
export interface Pago {
  id: number
  ticket_id: number
  monto: number // DECIMAL(10,2) NOT NULL
  metodo_pago: string // DEFAULT 'efectivo' - 'efectivo', 'tarjeta', 'transferencia'
  fecha_pago: Date // DEFAULT CURRENT_TIMESTAMP
  observaciones?: string

  referencia_pago?: string // Número de transacción
  comision: number // DECIMAL(10,2) DEFAULT 0 - comisión del método de pago
}

export type PagoCreate = Omit<Pago, 'id'>
export type PagoUpdate = Partial<Omit<Pago, 'id'>>

// ===== CONFIGURACIONES EXTRA =====
export interface ConfiguracionExtra {
  id: number
  clave: string // NOT NULL UNIQUE
  valor?: string
  tipo: string // DEFAULT 'string' - 'string', 'number', 'boolean', 'json'
  descripcion?: string
  categoria: string // DEFAULT 'general' - para agrupar configs
  activo: number // BOOLEAN DEFAULT 1
  fecha_creacion: Date
}

export type ConfiguracionExtraCreate = Omit<ConfiguracionExtra, 'id' | 'fecha_creacion'>
export type ConfiguracionExtraUpdate = Partial<Omit<ConfiguracionExtra, 'id' | 'fecha_creacion'>>

// ===== INTERFACES DE RELACIONES (ÚTILES PARA JOINS) =====
export interface TicketCompleto extends Ticket {
  espacio?: Espacio & { tipo_espacio: TipoEspacio }
  tipo_vehiculo: TipoVehiculo
  pagos?: Pago[]
}

export interface EspacioCompleto extends Espacio {
  tipo_espacio: TipoEspacio
  ticket_activo?: Ticket
}

export interface TarifaCompleta extends Tarifa {
  tipo_vehiculo: TipoVehiculo
}
