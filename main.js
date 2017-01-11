const {app, BrowserWindow, globalShortcut, Tray, Menu} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let tray = null
function createWindow () {
  var isFullscreen = true;
  // Create the browser window.
  win = new BrowserWindow({backgroundColor: '#000000',icon:'./res/mipmap-hdpi/ic_launcher.png',width: 1280,height: 1000})
  win.setFullScreen(true);
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()
  // no need for DevTools for now
  win.setMenu(null)
  //no menus, for now
  
  win.setSkipTaskbar(true)
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
  globalShortcut.register('CommandOrControl+X', function() {
    app.quit()
  });
  globalShortcut.register('CommandOrControl+C', function() {
    win.minimize(true)
  })
  globalShortcut.register('Alt+Enter', function() {
    if (isFullscreen) {
      win.setFullScreen(false)
      isFullscreen = false
    }else{
      win.setFullScreen(true)
      isFullscreen = true
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
app.on('ready', () => {
  tray = new Tray('./res/mipmap-hdpi/ic_launcher.png')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Show app', click: function() {
      win.show();
    }},
    {label: 'Quit', click: function() {
      app.quit()
    }}
  ])
  tray.setToolTip("Majora's Time")
  contextMenu.items[1].checked = false
  tray.setContextMenu(contextMenu)
  tray.on('double-click', function() {
    win.show();
  })
})

//after initialization, exit app event is triggered
// setTimeout(function(){
//   app.quit()
// },10000)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
