import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ConfiguracionCreate, ConfiguracionUpdate } from '../main/models'

const api = {
  configuracion: {
    create: (configuracion: ConfiguracionCreate) =>
      ipcRenderer.invoke('configuracion:create', configuracion),
    update: (id: number, data: ConfiguracionUpdate) =>
      ipcRenderer.invoke('configuracion:update', { id, data }),
    findOne: () => ipcRenderer.invoke('configuracion:findOne'),
    delete: (id: number) => ipcRenderer.invoke('configuracion:delete', id)
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
