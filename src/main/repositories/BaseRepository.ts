import { Database } from 'better-sqlite3'
import { getDatabase } from '../database/connection'
import { getErrorMessage } from '../utils/errorUtils'

export abstract class BaseRepository<T> {
  protected readonly tableName: string
  protected db: Database

  constructor(tableName: string) {
    this.tableName = tableName
    this.db = getDatabase()
  }

  /**
   * Encuentra un registro por su ID
   */
  findById(id: number): T | null {
    try {
      const stmt = this.db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
      const result = stmt.get(id) as T | undefined
      return result || null
    } catch (error) {
      console.error(`Error en findById para ${this.tableName}:`, getErrorMessage(error))
      throw error
    }
  }

  /**
   * Encuentra registros por cualquier campo
   */
  findByField<V>(field: keyof T, value: V): T[] {
    try {
      const stmt = this.db.prepare(`SELECT * FROM ${this.tableName} WHERE ${String(field)} = ?`)
      return stmt.all(value) as T[]
    } catch (error) {
      console.error(`Error en findByField para ${this.tableName}:`, getErrorMessage(error))
      throw error
    }
  }

  /**
   * Encuentra registros con paginación
   */
  findWithPagination(
    page: number = 1,
    limit: number = 10
  ): { data: T[]; total: number; pages: number } {
    try {
      const offset = (page - 1) * limit
      const countStmt = this.db.prepare(`SELECT COUNT(*) as total FROM ${this.tableName}`)
      const { total } = countStmt.get() as { total: number }

      const stmt = this.db.prepare(`
        SELECT * FROM ${this.tableName}
        LIMIT ? OFFSET ?
      `)

      const data = stmt.all(limit, offset) as T[]
      const pages = Math.ceil(total / limit)

      return {
        data,
        total,
        pages
      }
    } catch (error) {
      console.error(`Error en findWithPagination para ${this.tableName}:`, getErrorMessage(error))
      throw error
    }
  }

  /**
   * Cuenta total de registros
   */
  count(conditions?: Partial<T>): number {
    try {
      let sql = `SELECT COUNT(*) as total FROM ${this.tableName}`
      const params: unknown[] = []

      if (conditions) {
        const whereConditions = Object.entries(conditions)
          .map(([key]) => `${key} = ?`)
          .join(' AND ')
        sql += ` WHERE ${whereConditions}`
        params.push(...Object.values(conditions))
      }

      const stmt = this.db.prepare(sql)
      const { total } = stmt.get(...params) as { total: number }
      return total
    } catch (error) {
      console.error(`Error en count para ${this.tableName}:`, getErrorMessage(error))
      throw error
    }
  }

  /**
   * Verifica si existe un registro por ID
   */
  exists(id: number): boolean {
    try {
      const stmt = this.db.prepare(`
        SELECT EXISTS(
          SELECT 1 FROM ${this.tableName} WHERE id = ?
        ) as exists
      `)
      const { exists } = stmt.get(id) as { exists: number }
      return exists === 1
    } catch (error) {
      console.error(`Error en exists para ${this.tableName}:`, getErrorMessage(error))
      throw error
    }
  }

  /**
   * Encuentra todos los registros
   */
  findAll(): T[] {
    try {
      const stmt = this.db.prepare(`SELECT * FROM ${this.tableName}`)
      return stmt.all() as T[]
    } catch (error) {
      console.error(`Error en findAll para ${this.tableName}:`, getErrorMessage(error))
      throw error
    }
  }

  /**
   * Encuentra registros activos
   */
  findActive(): T[] {
    try {
      const stmt = this.db.prepare(`SELECT * FROM ${this.tableName} WHERE activo = 1`)
      return stmt.all() as T[]
    } catch (error) {
      console.error(`Error en findActive para ${this.tableName}:`, getErrorMessage(error))
      throw error
    }
  }

  /**
   * Crea un nuevo registro
   */
  create(data: Partial<T>): T {
    try {
      const keys = Object.keys(data)
      const values = Object.values(data)
      const placeholders = keys.map(() => '?').join(',')

      const sql = `
                INSERT INTO ${this.tableName} (${keys.join(',')}) 
                VALUES (${placeholders})
            `

      const stmt = this.db.prepare(sql)
      const result = stmt.run(...values)

      if (result.lastInsertRowid === undefined) {
        throw new Error('Error al insertar registro')
      }

      return this.findById(Number(result.lastInsertRowid)) as T
    } catch (error) {
      console.error(`Error en create para ${this.tableName}:`, getErrorMessage(error))
      throw error
    }
  }

  /**
   * Actualiza un registro existente
   */
  update(id: number, data: Partial<T>): boolean {
    try {
      const keys = Object.keys(data)
      const values = Object.values(data)

      const setClause = keys.map((key) => `${key} = ?`).join(',')
      const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`

      const stmt = this.db.prepare(sql)
      const result = stmt.run([...values, id])

      return result.changes > 0
    } catch (error) {
      console.error(`Error en update para ${this.tableName}:`, getErrorMessage(error))
      throw error
    }
  }

  /**
   * Elimina un registro por su ID
   */
  delete(id: number): boolean {
    try {
      const stmt = this.db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`)
      const result = stmt.run(id)
      return result.changes > 0
    } catch (error) {
      console.error(`Error en delete para ${this.tableName}:`, getErrorMessage(error))
      throw error
    }
  }

  /**
   * Desactiva un registro (soft delete)
   */
  softDelete(id: number): boolean {
    try {
      const stmt = this.db.prepare(`UPDATE ${this.tableName} SET activo = 0 WHERE id = ?`)
      const result = stmt.run(id)
      return result.changes > 0
    } catch (error) {
      console.error(`Error en softDelete para ${this.tableName}:`, getErrorMessage(error))
      throw error
    }
  }

  /**
   * Ejecuta una consulta personalizada
   */
  protected executeQuery<R>(sql: string, params: unknown[] = []): R[] {
    try {
      const stmt = this.db.prepare(sql)
      return stmt.all(params) as R[]
    } catch (error) {
      console.error(`Error en executeQuery para ${this.tableName}:`, getErrorMessage(error))
      throw error
    }
  }
}
