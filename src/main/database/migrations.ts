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
            simbolo_moneda TEXT DEFAULT '',
            tolerancia_minutos INTEGER DEFAULT 15,
            multa_ticket_perdido DECIMAL(10,2) DEFAULT 0.00,
            activo BOOLEAN DEFAULT 1,
            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS tipo_vehiculos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL UNIQUE,
            descripcion TEXT,
            activo BOOLEAN DEFAULT 1
        );
        CREATE TABLE IF NOT EXISTS tipo_espacios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL UNIQUE,
            descripcion TEXT,
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
            fecha_desde DATE NOT NULL,
            fecha_hasta DATE,
            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tipo_vehiculo_id) REFERENCES tipo_vehiculos(id)
        );
        CREATE TABLE IF NOT EXISTS tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            numero_ticket TEXT NOT NULL UNIQUE,
            espacio_id INTEGER,
            tipo_vehiculo_id INTEGER NOT NULL,
            placa TEXT,
            marca TEXT,
            modelo TEXT,
            color TEXT,
            observaciones_vehiculo TEXT,
            fecha_entrada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            fecha_salida DATETIME,
            estado TEXT NOT NULL DEFAULT 'activo',
            ticket_perdido BOOLEAN DEFAULT 0,
            tiempo_total_minutos INTEGER,
            monto_calculado DECIMAL(10,2),
            monto_cobrado DECIMAL(10,2),
            anulado BOOLEAN DEFAULT 0,
            motivo_anulacion TEXT,
            token_anulacion TEXT,
            fecha_anulacion DATETIME,
            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (espacio_id) REFERENCES espacios(id),
            FOREIGN KEY (tipo_vehiculo_id) REFERENCES tipo_vehiculos(id)
        );
        CREATE TABLE IF NOT EXISTS pagos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticket_id INTEGER NOT NULL,
            monto DECIMAL(10,2) NOT NULL,
            metodo_pago TEXT DEFAULT 'efectivo',
            fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,
            observaciones TEXT,
            FOREIGN KEY (ticket_id) REFERENCES tickets(id)
        );
        -- 2. CREAR ÍNDICES
        CREATE INDEX idx_ticket_estado ON tickets(estado);
        CREATE INDEX idx_ticket_fecha_entrada ON tickets(fecha_entrada);
        CREATE INDEX idx_ticket_numero ON tickets(numero_ticket);
        CREATE INDEX idx_espacio_ocupado ON espacios(ocupado, activo);
        CREATE INDEX idx_pago_fecha ON pagos(fecha_pago);
        CREATE INDEX idx_tarifa_activa ON tarifas(tipo_vehiculo_id, fecha_desde, fecha_hasta);
    `
  },
  {
    version: 2,
    name: 'add initial_columns_to_configuraciones',
    sql: `INSERT INTO configuraciones (nombre_negocio, direccion, tolerancia_minutos, multa_ticket_perdido) 
                             VALUES ('Estacionamiento El Rápido', 'Av. Principal 123', 10, 50.00);`
  }
]
