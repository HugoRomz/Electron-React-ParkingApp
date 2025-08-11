import { ipcMain } from 'electron'
import { ConfiguracionHandler } from '../../handlers/ConfiguracionHandler'

export function ConfiguracionIPC(): void {
  const handler = new ConfiguracionHandler()

  ipcMain.handle('configuracion:create', handler.handleCreate)
  ipcMain.handle('configuracion:update', handler.handleUpdate)
  ipcMain.handle('configuracion:findOne', handler.handleFindOne)
  ipcMain.handle('configuracion:delete', handler.handleDelete)
}
