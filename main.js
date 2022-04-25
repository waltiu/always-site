const electron = require('electron')

const {app,Menu} = electron

const BrowserWindow = electron.BrowserWindow

let win = null
app.on('ready',()=>{
    win = new BrowserWindow({
         width:1200,
         height:800,
    })
    // console.log(process.env,'process.env')
    win.loadURL('http://localhost:3000/')
    Menu.setApplicationMenu(null)
    try {
      require('electron-reloader')(module)
    } catch (_) {}
    win.on('close',()=>{
      win = null
    })
})
