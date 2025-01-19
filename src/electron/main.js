// main.js
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const preloadPath = path.join(__dirname, 'preload.cjs')
console.log('Preload path:', preloadPath)


// Proper development check
const isDev = true

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: preloadPath,
        // Add this for debugging
        //devTools: true
    }
  })

  // if (isDev) {
  //   mainWindow.loadURL('http://localhost:5173/')
  // } else {
   // mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
    mainWindow.loadFile(path.join(__dirname, 'dist-react', 'index.html'));

    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'dist-react/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );

  //}

  // For debugging
 // mainWindow.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Listen for the same channel as defined in preload.js
// ipcMain.on('print-request', (event, content) => {
//   console.log('Received print request:', content)
  
//   const printWindow = new BrowserWindow({
//     show: false,
//     webPreferences: {
//       offscreen: true,
//     }
//   })

//   const htmlContent = `
//     <html>
//       <head>
//         <title>Receipt</title>
//         <style>
//           /* Your styles here */
//         </style>
//       </head>
//       <body>
//         ${content}
//       </body>
//     </html>
//   `

//   printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`)

//   printWindow.webContents.on('did-finish-load', () => {
//     printWindow.webContents.print(
//       {
//         silent: true,
//         printBackground: true,
//       },
//       (success, errorType) => {
//         if (!success) {
//           console.error(`Print failed: ${errorType}`)
//         }
//         printWindow.close()
//       }
//     )
//   })
// })

// In your main process
ipcMain.on('print-request', (event, printData) => {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(printData)}`);

  win.webContents.on('did-finish-load', () => {
    win.webContents.print({
      silent: true,
      printBackground: false,
      deviceName: 'YOUR_THERMAL_PRINTER_NAME', // Replace with your printer name
      margins: {
        marginType: 'custom',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
    }, (success, error) => {
      if (error) {
        event.reply('reply-from-main', { success: false, error: error });
      } else {
        event.reply('reply-from-main', { success: true });
      }
      win.close();
    });
  });
});