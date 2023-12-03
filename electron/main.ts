const path = require('path')
const { app, BrowserWindow } = require('electron/main')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'dist/index.js'),
      scrollBounce: true,
      webviewTag: true
    }
  })

  win.loadFile('dist/index.html')
  // win.webContents.dopenDevTools()

  // win.addEventListener('dom-ready', () => {
  //   win.openDevTools()
  // })
}

app.whenReady().then(() => {
  createWindow()
})