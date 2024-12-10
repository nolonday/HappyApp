const { app, BrowserWindow, nativeImage } = require("electron");
const path = require("path");

function createWindow() {
  const iconPath = path.join(__dirname, "icon.jpg");
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: nativeImage.createFromPath(iconPath), // Используйте nativeImage для создания иконки
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
