const {app, BrowserWindow, globalShortcut, Tray, Menu} = require('electron')
const path = require('path')
const url = require('url')

// Commentary by Stanley: here, all functions, instances, statements, etc. with semicolon (;), is my doing

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
// We need to store the "id" of the current window to destroy it later on
// the array always starts with 0, keep that in mind
var inSession=[],index=0;
let tray = null
function createWindow () {
  var isFullscreen = true;
  // Create the browser window.
  win = new BrowserWindow({backgroundColor: '#000000',icon:'./res/mipmap-xxxhdpi/ic_launcher.png',width: 1280,height: 1000})
  
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // We need this to bypass the taskbar error
  // watch those 10 milliseconds, they're precious
  setTimeout(function(){
    inSession[index-1].setFullScreen(true);
  },10)

  inSession[index] = win;
  index++;
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
    inSession[index-1].minimize(true)
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

// "Why not use win.show(); or win.restore(); electron methods to show/restore the window?"
// R: To restart the transition/animation.
// "But you can use JavaScript or JQUERY to do this". R => yeah...
app.on('ready', () => {
  tray = new Tray('./res/mipmap-hdpi/ic_launcher.png')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Show app', click: function() {
      createWindow();
      //because we are incrementing the index after the session has been bounded with the current window
      //we have to jump back two array units to destroy the previous window, after the new one has been created
      // if we don't do this, the current session/window will be destroyed as soon as created
      inSession[index-2].destroy();
    }},
    {label: 'Quit', click: function() {
      app.quit()
    }}
  ])
  tray.setToolTip('Majora\'s Time')
  //This is for Linux
  contextMenu.items[1].checked = false
  tray.setContextMenu(contextMenu)
  tray.on('double-click', function() {
    createWindow();
    //same thing as before
    inSession[index-2].destroy();
    // win.restore();
  })
})

//after initialization, exit app event is triggered
// setTimeout(function(){
//   inSession[index-1].minimize(true)
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
