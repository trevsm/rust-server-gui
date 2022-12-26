const { app, BrowserWindow } = require("electron")

try {
  require("electron-reloader")(module)
} catch (_) {}

const createWindow = () => {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  })

  window.loadFile("build/index.html")
  window.on("closed", () => (window = null))
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => app.quit())

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
