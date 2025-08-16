export interface Migration {
  version: number
  name: string
  sql: string
}

export const MIGRATIONS: Migration[] = [
  {
    version: 1,
    name: 'initial_schema',
    sql: `CREATE TABLE IF NOT EXISTS configuraciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_negocio TEXT NOT NULL,
    direccion TEXT,
    telefono TEXT,
    logo_path TEXT,
    moneda TEXT DEFAULT 'MXN',
    simbolo_moneda TEXT DEFAULT '$',
    tolerancia_minutos INTEGER DEFAULT 15,
    multa_ticket_perdido DECIMAL(10,2) DEFAULT 0.00,
    
    cobro_minimo DECIMAL(10,2) DEFAULT 0.00,           -- Para clientes que sí cobran mínimo
    fraccion_minutos INTEGER DEFAULT NULL,              -- NULL = sin fracciones, 15 = cada 15min
    redondeo_tipo TEXT DEFAULT 'ninguno',               -- 'arriba', 'abajo', 'ninguno'
    mensaje_ticket TEXT DEFAULT 'Gracias por su visita', -- Mensaje personalizable
    
    activo BOOLEAN DEFAULT 1,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tipo_vehiculos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE,
    descripcion TEXT,
    icono TEXT DEFAULT 'car',                           -- Para UI: 'car', 'truck', 'bike'
    orden_display INTEGER DEFAULT 1,
    activo BOOLEAN DEFAULT 1
);

CREATE TABLE IF NOT EXISTS tipo_espacios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE,
    descripcion TEXT,
    color_hex TEXT DEFAULT '#3B82F6',                   -- Color para UI
    orden_display INTEGER DEFAULT 1,
    activo BOOLEAN DEFAULT 1
);

CREATE TABLE IF NOT EXISTS espacios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero TEXT NOT NULL UNIQUE,
    tipo_espacio_id INTEGER NOT NULL,
    ocupado BOOLEAN DEFAULT 0,
    activo BOOLEAN DEFAULT 1,
    observaciones TEXT,
      
    FOREIGN KEY (tipo_espacio_id) REFERENCES tipo_espacios(id)
);

CREATE TABLE IF NOT EXISTS tarifas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_vehiculo_id INTEGER NOT NULL,
    precio_hora DECIMAL(10,2) NOT NULL,
    -- fecha_desde DATE NOT NULL,
    -- fecha_hasta DATE,
    
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tipo_vehiculo_id) REFERENCES tipo_vehiculos(id)
);

CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_ticket TEXT NOT NULL UNIQUE,
    espacio_id INTEGER,
    tipo_vehiculo_id INTEGER NOT NULL,
    
    -- Datos del vehículo (opcionales)
    placa TEXT,
    marca TEXT,
    modelo TEXT,
    color TEXT,
    observaciones_vehiculo TEXT,
    
    -- Fechas y tiempos
    fecha_entrada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_salida DATETIME,
    tiempo_total_minutos INTEGER,
    
    -- Estado y cálculos
    estado TEXT NOT NULL DEFAULT 'activo',              -- 'activo', 'pagado', 'anulado'
    ticket_perdido BOOLEAN DEFAULT 0,
    monto_calculado DECIMAL(10,2),
    monto_cobrado DECIMAL(10,2),
    
    -- Anulación
    anulado BOOLEAN DEFAULT 0,
    motivo_anulacion TEXT,
    fecha_anulacion DATETIME,
    
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (espacio_id) REFERENCES espacios(id),
    FOREIGN KEY (tipo_vehiculo_id) REFERENCES tipo_vehiculos(id)
);

CREATE TABLE IF NOT EXISTS pagos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id INTEGER NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    metodo_pago TEXT DEFAULT 'efectivo',                -- 'efectivo', 'tarjeta', 'transferencia'
    fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,
    observaciones TEXT,
    
    referencia_pago TEXT,                               -- Número de transacción
    comision DECIMAL(10,2) DEFAULT 0,                   -- Comisión del método de pago
    
    FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);

CREATE TABLE IF NOT EXISTS configuraciones_extra (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clave TEXT NOT NULL UNIQUE,
    valor TEXT,
    tipo TEXT DEFAULT 'string',                         -- 'string', 'number', 'boolean', 'json'
    descripcion TEXT,
    categoria TEXT DEFAULT 'general',                   -- Para agrupar configs
    activo BOOLEAN DEFAULT 1,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. ÍNDICES PARA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_ticket_estado ON tickets(estado);
CREATE INDEX IF NOT EXISTS idx_ticket_fecha_entrada ON tickets(fecha_entrada);
CREATE INDEX IF NOT EXISTS idx_ticket_numero ON tickets(numero_ticket);
CREATE INDEX IF NOT EXISTS idx_espacio_ocupado ON espacios(ocupado, activo);
CREATE INDEX IF NOT EXISTS idx_pago_fecha ON pagos(fecha_pago);
CREATE INDEX IF NOT EXISTS idx_tarifa_activa ON tarifas(tipo_vehiculo_id);
CREATE INDEX IF NOT EXISTS idx_config_extra_clave ON configuraciones_extra(clave, activo);
    `
  },
  {
    version: 2,
    name: 'add initial_columns_to_configuraciones',
    sql: `
    
    INSERT OR IGNORE INTO configuraciones (
    id, nombre_negocio, direccion, telefono, 
    moneda, simbolo_moneda, tolerancia_minutos, 
    multa_ticket_perdido, cobro_minimo, fraccion_minutos
) VALUES (
    1, 
    'Estacionamiento Demo', 
    'Dirección por configurar', 
    'Teléfono por configurar',
    'MXN', 
    '$', 
    15, 
    50.00, 
    0.00,    -- Sin cobro mínimo por defecto
    NULL     -- Sin fracciones por defecto
);

-- Tipos de vehículos básicos (todos los estacionamientos los tienen)
INSERT OR IGNORE INTO tipo_vehiculos (id, nombre, descripcion, icono, orden_display) VALUES
(1, 'Automóvil', 'Vehículo estándar de 4 ruedas', 'car', 1),
(2, 'Motocicleta', 'Vehículo de 2 ruedas', 'bike', 2),
(3, 'Camioneta', 'Vehículo SUV o pickup', 'truck', 3);

-- Tipos de espacios básicos (mínimo necesario)
INSERT OR IGNORE INTO tipo_espacios (id, nombre, descripcion, color_hex, orden_display) VALUES
(1, 'Estándar', 'Espacio regular para cualquier vehículo', '#3B82F6', 1),
(2, 'Motocicleta', 'Espacio específico para motocicletas', '#10B981', 2),
(3, 'Discapacitado', 'Espacio reservado (opcional)', '#F59E0B', 3),
(4, 'Techado', 'Espacio con techo (opcional)', '#8B5CF6', 4);

-- Espacios de ejemplo (Cliente puede ajustar después)
INSERT OR IGNORE INTO espacios (numero, tipo_espacio_id, activo) VALUES
-- Espacios estándar
('A1', 1, 1), ('A2', 1, 1), ('A3', 1, 1), ('A4', 1, 1), ('A5', 1, 1),
('B1', 1, 1), ('B2', 1, 1), ('B3', 1, 1), ('B4', 1, 1), ('B5', 1, 1),
('C1', 1, 1), ('C2', 1, 1), ('C3', 1, 1), ('C4', 1, 1), ('C5', 1, 1),
-- Espacios para motos
('M1', 2, 1), ('M2', 2, 1), ('M3', 2, 1), ('M4', 2, 1), ('M5', 2, 1);

-- Tarifas básicas (cliente puede ajustar)
INSERT OR IGNORE INTO tarifas (tipo_vehiculo_id, precio_hora) VALUES
(1, 15.00),  -- Automóvil: $15/hora
(2, 8.00 ),   -- Motocicleta: $8/hora  
(3, 20.00 );  -- Camioneta: $20/hora

-- Configuraciones extra (ejemplos de flexibilidad)
INSERT OR IGNORE INTO configuraciones_extra (clave, valor, tipo, descripcion, categoria) VALUES
('impresion_automatica', 'true', 'boolean', 'Imprimir ticket automáticamente al generar', 'impresion'),
('mostrar_placa_obligatoria', 'false', 'boolean', 'Hacer obligatorio el campo placa', 'validacion'),
('formato_numero_ticket', 'EST-{YYYY}-{NNNNNN}', 'string', 'Formato del número de ticket', 'ticket'),
('colores_tema', '{"primary": "#3B82F6", "success": "#10B981", "warning": "#F59E0B"}', 'json', 'Colores del tema de la aplicación', 'ui');




    `
  },
  {
    version: 3,
    name: 'add triggers',
    sql: `
-- Trigger para actualizar fecha_modificacion en configuraciones
CREATE TRIGGER IF NOT EXISTS update_configuracion_timestamp 
    AFTER UPDATE ON configuraciones
BEGIN
    UPDATE configuraciones SET fecha_modificacion = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Trigger para generar número de ticket único
CREATE TRIGGER IF NOT EXISTS generate_ticket_number
    AFTER INSERT ON tickets
    WHEN NEW.numero_ticket IS NULL
BEGIN
    UPDATE tickets 
    SET numero_ticket = 'TKT-' || strftime('%Y%m%d', 'now') || '-' || printf('%06d', NEW.id)
    WHERE id = NEW.id;
END;

  `
  }
]
