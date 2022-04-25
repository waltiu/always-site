const electron = require("electron");

const { app, Menu,globalShortcut } = electron;

const BrowserWindow = electron.BrowserWindow;

let win = null;
app.on("ready", () => {
  try {
    require("electron-reloader")(module);
  } catch (_) {}
  win = new BrowserWindow({
    width: 1200,
    height: 800,
  });
  if (!app.isPackaged) {
    win.loadURL("http://localhost:3000/");
  } else {
    win.loadURL("http://996.js.cn/");
  }
  const registryShortcut=()=>{
    globalShortcut.register('CommandOrControl+f12', function () {
      win.webContents.openDevTools()
    })
  }

  app.whenReady().then(() => {
    // 注册快捷键
      registryShortcut();
  });
  
  Menu.setApplicationMenu(null);
  win.on("close", () => {
    win = null;
  });
});
