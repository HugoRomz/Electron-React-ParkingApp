import { ElectronAPI } from '@electron-toolkit/preload'
import { Configuracion, ConfiguracionCreate, ConfiguracionUpdate } from '../main/models'

export interface IElectronAPI {
  configuracion: {
    create: (configuracion: ConfiguracionCreate) => Promise<Configuracion>
    update: (id: number, data: ConfiguracionUpdate) => Promise<boolean>
    findOne: () => Promise<Configuracion | null>
    delete: (id: number) => Promise<boolean>
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: IElectronAPI
  }
}
