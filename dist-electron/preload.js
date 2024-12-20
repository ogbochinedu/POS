
// preload.js
// const { contextBridge, ipcRenderer } = require('electron')

// console.log('Preload script is running!')

// contextBridge.exposeInMainWorld('electronAPI', {
//   print: (content) => ipcRenderer.send('print-request', content),
// });

// console.log('Preload script finished executing!')


import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  print: (channel, data) => {
    const validChannels = ['print-request', 'another-channel']; // Whitelist your channels
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
});
