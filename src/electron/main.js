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
      nodeIntegration: false,
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
ipcMain.on('print-request', (event, content) => {
  console.log('Received print request:', content)
  
  const printWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      offscreen: true,
    }
  })

  const htmlContent = `
    <html>
      <head>
        <title>Receipt</title>
        <style>
          /* Your styles here */
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `

  printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`)

  printWindow.webContents.on('did-finish-load', () => {
    printWindow.webContents.print(
      {
        silent: true,
        printBackground: true,
      },
      (success, errorType) => {
        if (!success) {
          console.error(`Print failed: ${errorType}`)
        }
        printWindow.close()
      }
    )
  })
})