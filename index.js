 //handle setupevents as quickly as possible
 const setupEvents = require('./installers/setupEvents')
 if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
 }



const { app, BrowserWindow } = require('electron')
const path = require('path')

// Get app directory
// on OSX it's /Users/Yourname/Library/Application Support/AppName
const getAppPath = path.join(app.getPath('appData'), appName);

fs.unlink(getAppPath, () => {
  // callback
  alert("App data cleared");
  // relaunch the app after clearing the app settings.
  //app.relaunch();
  //app.exit();
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win


// Specify flash path, supposing it is placed in the same directory with main.js.
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = '/pepper/pepflashplayer.dll'
	flashPath = path.join(__dirname, pluginName);
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
	flashPath =	app.getPath('pepperFlashSystemPlugin');
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
	flashPath =	app.getPath('pepperFlashSystemPlugin');
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', flashPath)

app.commandLine.appendSwitch('ppapi-flash-version', '32.0.0.156')






function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ 
	  width: 1440, 
	  height: 720, 
	  webPreferences: {
      	plugins: true,
		nodeIntegration: false
      },
	  icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
	  titleBarStyle: 'hidden',
	  backgroundColor: '#000000',
	  show: false
  })

  // and load the index.html of the app.
  //win.loadURL(`file://${__dirname}/index.html`)
  win.loadURL(`https://cryptocollider.com/app/index.html`)
	
	win.on('ready-to-show', function() { 
	  win.show(); 
	  win.focus(); 
	});	

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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

// Dock & Notifications

// When work makes progress, show the progress bar
function onProgress (progess) {
  // Use values 0 to 1, or -1 to hide the progress bar
  win.setProgressBar(progress || -1) // Progress bar works on all platforms
}

// When work completes while the app is in the background, show a badge
var numDoneInBackground = 0
function onDone () {
  var dock = electron.app.dock // Badge works only on Mac
  if (!dock || win.isFocused()) return
  numDoneInBackground++
  dock.setBadge('' + numDoneInBackground)
}

// Subscribe to the window focus event. When that happens, hide the badge
function onFocus () {
  numDoneInBackground = 0
  dock.setBadge('')
}
