
-- 3. INSERTAR DATOS INICIALES
INSERT INTO configuracion (nombre_negocio, direccion, tolerancia_minutos, fraccion_minutos, multa_ticket_perdido) 
VALUES ('Estacionamiento El Rápido', 'Av. Principal 123', 10, 15, 50.00);

INSERT INTO tipo_vehiculo (nombre, orden_display) VALUES 
('Auto', 1),
('Moto', 2),
('Camioneta', 3);

INSERT INTO tipo_espacio (nombre, orden_display) VALUES 
('Abierto', 1),
('Techado', 2),
('Discapacitado', 3);

-- Crear algunos espacios
INSERT INTO espacio (numero, tipo_espacio_id) VALUES 
('A-01', 1), ('A-02', 1), ('A-03', 1),
('T-01', 2), ('T-02', 2),
('D-01', 3);

-- Crear tarifas actuales
INSERT INTO tarifa (tipo_vehiculo_id, precio_hora, fecha_desde) VALUES 
(1, 20.00, '2025-01-01'),  -- Auto: $20/hora
(2, 10.00, '2025-01-01'),  -- Moto: $10/hora  
(3, 30.00, '2025-01-01');  -- Camioneta: $30/hora

INSERT INTO configuracion_sistema (clave, valor, descripcion) VALUES 
('token_anulacion', 'ADMIN123', 'Token para anulaciones');

-- 4. GENERAR TICKETS DE PRUEBA
-- Ticket activo (auto en espacio A-01)
INSERT INTO ticket (numero_ticket, espacio_id, tipo_vehiculo_id, placa, marca, color, fecha_entrada) 
VALUES ('T-001', 1, 1, 'ABC-123', 'Toyota', 'Rojo', '2025-07-29 08:00:00');

-- Ticket de moto (ocupando espacio A-02)
INSERT INTO ticket (numero_ticket, espacio_id, tipo_vehiculo_id, placa, fecha_entrada) 
VALUES ('T-002', 2, 2, 'M-456', '2025-07-29 09:15:00');

-- Actualizar espacios como ocupados
UPDATE espacio SET ocupado = 1 WHERE id IN (1, 2);

-- 5. SIMULAR SALIDA Y PAGO
-- Salida del auto después de 1 hora 25 minutos
UPDATE ticket SET 
    fecha_salida = '2025-07-29 09:25:00',
    tiempo_total_minutos = 85,
    estado = 'pagado'
WHERE numero_ticket = 'T-001';

-- Calcular monto dinámicamente y registrar pago
INSERT INTO pago (ticket_id, monto) VALUES (1, 30.00); -- Se cobraron 2 fracciones

-- Liberar espacio
UPDATE espacio SET ocupado = 0 WHERE id = 1;

-- 6. CONSULTAS DE PRUEBA
-- Ver configuración
SELECT 'CONFIGURACIÓN:' as seccion;
SELECT nombre_negocio, tolerancia_minutos, fraccion_minutos, simbolo_moneda FROM configuracion;

-- Ver espacios disponibles por tipo
SELECT 'ESPACIOS DISPONIBLES:' as seccion;
SELECT te.nombre as tipo_espacio, 
       COUNT(*) as total,
       SUM(CASE WHEN ocupado = 0 THEN 1 ELSE 0 END) as disponibles
FROM espacio e 
JOIN tipo_espacio te ON e.tipo_espacio_id = te.id 
WHERE e.activo = 1
GROUP BY te.nombre;

-- Ver tarifas vigentes
SELECT 'TARIFAS VIGENTES:' as seccion;
SELECT tv.nombre as vehiculo, 
       t.precio_hora,
       (t.precio_hora / 60.0 * (SELECT fraccion_minutos FROM configuracion LIMIT 1)) as precio_fraccion
FROM tarifa t
JOIN tipo_vehiculo tv ON t.tipo_vehiculo_id = tv.id
WHERE t.activo = 1 AND (t.fecha_hasta IS NULL OR t.fecha_hasta >= date('now'));

-- Ver tickets activos
SELECT 'TICKETS ACTIVOS:' as seccion;
SELECT t.numero_ticket, e.numero as espacio, tv.nombre as vehiculo, t.placa,
       t.fecha_entrada, 
       CASE WHEN t.estado = 'activo' THEN 'ACTIVO' ELSE t.estado END as estado
FROM ticket t
LEFT JOIN espacio e ON t.espacio_id = e.id
JOIN tipo_vehiculo tv ON t.tipo_vehiculo_id = tv.id
WHERE t.estado = 'activo';

-- Ver tickets pagados con cálculo
SELECT 'TICKETS PAGADOS HOY:' as seccion;
SELECT t.numero_ticket, tv.nombre as vehiculo, t.placa,
       t.tiempo_total_minutos as minutos,
       tar.precio_hora,
       p.monto as cobrado
FROM ticket t
JOIN tipo_vehiculo tv ON t.tipo_vehiculo_id = tv.id
JOIN tarifa tar ON t.tipo_vehiculo_id = tar.tipo_vehiculo_id AND tar.activo = 1
LEFT JOIN pago p ON t.id = p.ticket_id
WHERE t.estado = 'pagado' AND date(t.fecha_salida) = date('now');

-- Función para calcular monto (ejemplo conceptual)
SELECT 'CÁLCULO DE EJEMPLO:' as seccion;
SELECT 
    'Auto 85 minutos' as caso,
    85 as minutos_totales,
    (SELECT tolerancia_minutos FROM configuracion) as tolerancia,
    (SELECT fraccion_minutos FROM configuracion) as fraccion_min,
    CASE 
        WHEN 85 <= (SELECT tolerancia_minutos FROM configuracion) THEN 0
        ELSE CEIL((85 - (SELECT tolerancia_minutos FROM configuracion)) / 
                 CAST((SELECT fraccion_minutos FROM configuracion) AS FLOAT)) *
             (20.00 / 60.0 * (SELECT fraccion_minutos FROM configuracion))
    END as monto_calculado;