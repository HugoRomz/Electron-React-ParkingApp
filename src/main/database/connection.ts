import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'path'
import { DatabaseMigrator } from './migrator'

let database: Database.Database | null = null

export async function connectDatabase(): Database.Database {
  if (database) {
    return database
  }

  try {
    // Determinar ruta de la BD
    const databasePath = getDatabasePath()
    // Crear conexión
    database = new Database(databasePath)

    // Configurar SQLite
    database.pragma('foreign_keys = ON')
    database.pragma('journal_mode = WAL')

    // 4. Ejecutar migraciones
    const migrator = new DatabaseMigrator(database)
    await migrator.runMigrations()

    console.log('Conexion completa')
    return database
  } catch (error) {
    console.error('Erro en la conexion:', error)
    throw error
  }
}

function getDatabasePath(): string {
  if (process.env.NODE_ENV === 'development') {
    return path.join(process.cwd(), 'parking.sqlite')
  } else {
    return path.join(app.getPath('userData'), 'parking.sqlite')
  }
}

// Obtener la conexion
export function getDatabase(): Database.Database {
  if (!database) {
    throw new Error('Base de datos no tiene conexion')
  }
  return database
}

//  Cerrar conexión

export function closeDatabase(): void {
  if (database) {
    database.close()
    database = null
    console.log('Conexion cerrada')
  }
}
