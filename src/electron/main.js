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
ipcMain.on('print-request', (event, content) => {
  console.log('Received print request:', content)
  
  const printWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      offscreen: true,
    }
  })

  const htmlContent = `
   

     <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Receipt</title>
        <style>
          @page {
            margin: 0;
            size: 80mm auto;  /* Standard thermal paper width */
          }
          
          body {
            margin: 0;
            padding: 0;
            background-color: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
              font-family: monospace;
          }
  .receipt {
    width: 80mm;
    margin: 0 auto;
    padding: 5mm;
    box-sizing: border-box;
  }
          /* Ensure content fits thermal paper width */
          * {
            max-width: 80mm;
            box-sizing: border-box;
          }

          /* Prevent any background printing */
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
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

