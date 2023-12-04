const path = require('path')
const { app, BrowserWindow } = require('electron/main')

const createWindow = () => {
  // const win = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: {
  //     preload: path.join(__dirname, 'dist/index.js'),
  //     scrollBounce: true,
  //     webviewTag: true
  //   }
  // })

  // win.loadFile('dist/index.html')
  const { app, BrowserView, BrowserWindow } = require('electron')

  app.whenReady().then(() => {
    const win = new BrowserWindow({ width: 800, height: 600 })

    const view = new BrowserView()
    win.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 800, height: 600 })
    view.setAutoResize({
      width: true,
      height: true
    })
    view.webContents.loadURL('https://electronjs.org')
  })
}

app.whenReady().then(() => {
  createWindow()
})