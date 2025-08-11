import { IpcMainInvokeEvent } from 'electron'
import { ConfiguracionService } from '../services/ConfiguracionService'
import { Configuracion, ConfiguracionCreate, ConfiguracionUpdate } from '../models'

export class ConfiguracionHandler {
  private service: ConfiguracionService

  constructor() {
    this.service = new ConfiguracionService()
  }

  handleCreate = async (
    _event: IpcMainInvokeEvent,
    configuracion: ConfiguracionCreate
  ): Promise<Configuracion> => {
    return this.service.create(configuracion)
  }

  handleUpdate = async (
    _event: IpcMainInvokeEvent,
    { id, data }: { id: number; data: ConfiguracionUpdate }
  ): Promise<boolean> => {
    return this.service.update(id, data)
  }

  handleFindOne = async (): Promise<Configuracion | null> => {
    return this.service.findOne()
  }

  handleDelete = async (_event: IpcMainInvokeEvent, id: number): Promise<boolean> => {
    return this.service.delete(id)
  }
}
