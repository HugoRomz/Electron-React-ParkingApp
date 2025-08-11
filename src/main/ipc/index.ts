import { ConfiguracionIPC } from './modules/ConfiguracionIPC'

export function setupAllIPCHandlers(): void {
  console.log('Registrando handlers IPC...')

  ConfiguracionIPC()

  console.log('Todos los handlers registrados')
}
