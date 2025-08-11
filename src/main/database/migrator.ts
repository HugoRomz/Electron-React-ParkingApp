// src/main/database/migrator.ts
import Database from 'better-sqlite3'
import { MIGRATIONS, Migration } from './migrations'

export class DatabaseMigrator {
  private db: Database.Database

  constructor(db: Database.Database) {
    this.db = db
  }

  /**
   * Ejecuta todas las migraciones pendientes
   */
  async runMigrations(): Promise<void> {
    console.log('Iniciando migraciones...')

    // Crear tabla de control de migraciones
    this.createMigrationsTable()

    // Obtener versión actual
    const currentVersion = this.getCurrentVersion()
    console.log('Version actual de BD:', currentVersion)

    // Ejecutar migraciones pendientes
    const pendingMigrations = MIGRATIONS.filter((m) => m.version > currentVersion)

    if (pendingMigrations.length === 0) {
      console.log('Base de datos actualizada')
      return
    }

    console.log(`Ejecutando ${pendingMigrations.length} migraciones...`)

    for (const migration of pendingMigrations) {
      await this.executeMigration(migration)
    }

    console.log('Migraciones completadas')
  }

  /**
   * Crear tabla de control
   */
  private createMigrationsTable(): void {
    const sql = `
      CREATE TABLE IF NOT EXISTS __migrations (
        version INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
    this.db.exec(sql)
  }

  /**
   * Obtener versión actual de la BD
   */
  private getCurrentVersion(): number {
    try {
      const stmt = this.db.prepare('SELECT MAX(version) as version FROM __migrations')
      const result = stmt.get() as { version: number | null }
      return result.version || 0
    } catch {
      return 0
    }
  }

  /**
   * Ejecutar una migración
   */
  private async executeMigration(migration: Migration): Promise<void> {
    console.log(`Ejecutando: ${migration.name} (v${migration.version})`)

    const transaction = this.db.transaction(() => {
      // Ejecutar SQL de la migración
      this.db.exec(migration.sql)

      // Registrar migración ejecutada
      const stmt = this.db.prepare('INSERT INTO __migrations (version, name) VALUES (?, ?)')
      stmt.run(migration.version, migration.name)
    })

    transaction()
    console.log(`Completada: ${migration.name}`)
  }
}
