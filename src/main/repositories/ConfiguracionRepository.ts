import { Configuracion } from '../models'
import { BaseRepository } from './BaseRepository'

export class ConfiguracionRepository extends BaseRepository<Configuracion> {
  constructor() {
    super('configuraciones')
  }

  findOne(): Configuracion | null {
    const stmt = this.db.prepare('SELECT * FROM configuraciones WHERE activo = 1 LIMIT 1')
    return stmt.get() as Configuracion | null
  }
}
