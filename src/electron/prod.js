const { app, BrowserWindow } = require("electron")
const createWindow = () => {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // used for node modules
      nodeIntegrationInWorker: true, // used for node modules in web workers
    },
  })

  window.loadFile("build/index.html")
}

app.whenReady().then(createWindow)
app.on("window-all-closed", () => app.quit())
