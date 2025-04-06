const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('procs', {
  fqwork_rest: () => ipcRenderer.invoke('fqwork_rest')
})