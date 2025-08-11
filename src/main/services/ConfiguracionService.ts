import { Configuracion } from '../models'
import { ConfiguracionRepository } from '../repositories/ConfiguracionRepository'

export class ConfiguracionService {
  private repository: ConfiguracionRepository

  constructor() {
    this.repository = new ConfiguracionRepository()
  }

  create(
    configuracion: Omit<Configuracion, 'id' | 'fecha_creacion' | 'fecha_modificacion'>
  ): Configuracion {
    return this.repository.create(configuracion)
  }

  update(id: number, configuracion: Partial<Configuracion>): boolean {
    return this.repository.update(id, configuracion)
  }

  findOne(): Configuracion | null {
    return this.repository.findOne()
  }

  delete(id: number): boolean {
    return this.repository.delete(id)
  }
}
