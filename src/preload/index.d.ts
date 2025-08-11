import { ElectronAPI } from '@electron-toolkit/preload'
import { Configuracion } from '../main/models'

export interface IElectronAPI {
  configuracion: {
    create: (
      configuracion: Omit<Configuracion, 'id' | 'fecha_creacion' | 'fecha_modificacion'>
    ) => Promise<Configuracion>
    update: (id: number, data: Partial<Configuracion>) => Promise<boolean>
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
