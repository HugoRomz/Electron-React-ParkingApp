# 🚗 Sistema de Parking Manual

Sistema de gestión de estacionamiento desarrollado con **Electron + React + TypeScript**. Totalmente offline, sin automatización - todo controlado manualmente por el operador.

## ✨ Características Principales

- 🎫 **Generación de tickets** con códigos QR únicos
- 🏢 **Dashboard visual** con estado de espacios en tiempo real
- 💰 **Cálculo automático** de tarifas por tiempo
- 🖨️ **Impresión térmica** para tickets
- 📱 **Interfaz moderna** y fácil de usar
- 💾 **100% Offline** - no requiere internet
- 🔧 **Configuración flexible** de tarifas y espacios

## 🖼️ Capturas de Pantalla

### Dashboard Principal
![Dashboard](screenshots/dashboard.png)

### Generación de Tickets
![Nuevo Ticket](screenshots/nuevo-ticket.png)

### Gestión de Salidas
![Salida Vehiculo](screenshots/salida-vehiculo.png)

### Configuración
![Configuracion](screenshots/configuracion.png)

## 🛠️ Stack Tecnológico

### Backend (Electron Main)
- **SQLite3** + better-sqlite3
- **TypeScript** con patrón Repository
- **IPC** para comunicación segura

### Frontend (React Renderer)
- **React** + TypeScript
- **Tailwind CSS** para estilos
- **Zustand** para estado global
- **TanStack Query** para cache
- **React Hook Form** + Zod validación

### Utilidades
- **date-fns** para fechas
- **currency.js** para cálculos monetarios
- **electron-pos-printer** para impresión

## 🚀 Instalación y Uso

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/sistema-parking.git
cd sistema-parking

# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Construir aplicación
npm run build

# Generar instalador
npm run dist
```

## 📋 Funcionalidades

- ✅ Configuración inicial del negocio
- ✅ Gestión de tipos de vehículos y espacios
- ✅ Generación de tickets de entrada
- ✅ Cálculo automático al salir
- ✅ Manejo de tickets perdidos
- ✅ Anulación de tickets
- ✅ Reportes básicos
- ✅ Impresión de comprobantes

## 🔧 Configuración

1. **Primera ejecución:** Configura los datos de tu negocio
2. **Espacios:** Define la cantidad y tipos de espacios disponibles
3. **Tarifas:** Establece precios por tipo de vehículo
4. **Impresora:** Configura tu impresora térmica (opcional)

## 📊 Base de Datos

El sistema utiliza SQLite3 local con las siguientes entidades principales:
- Configuraciones del negocio
- Espacios de estacionamiento
- Tipos de vehículos
- Tarifas
- Tickets
- Pagos


---

**🚀 ¿Listo para gestionar tu estacionamiento de manera eficiente?**
