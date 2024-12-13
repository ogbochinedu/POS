
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

console.log('Preload script is running!')

contextBridge.exposeInMainWorld('electronAPI', {
  print: (content) => ipcRenderer.send('print-request', content),
});

console.log('Preload script finished executing!')
