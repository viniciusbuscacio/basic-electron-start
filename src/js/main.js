const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

// Create variables for mainWindow
let mainWindow = null;

// Create the main window when Electron has finished initializing
function createWindow() {
  // Create a new Electron browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, 
      contextIsolation: true,
      enableRemoteModule: false, // Turn off remote
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../img/icon.png')

    
  });

  mainWindow.maximize(); // set the window size to maximized

  // Load the index.html in the main process only when the app starts
  // after this, the index page will be loaded only by the renderer process via loadIndexPage() function
  mainWindow.loadFile(path.join(__dirname, '../html/index.html'));
  
  // Open Google Chrome Dev Tools
  mainWindow.webContents.openDevTools(); 

  // Event triggered when the window is closed
  mainWindow.on('closed', () => {
    //console.log('Window closed');
  });

  // Create the menu
  const template = [
    {
      label: 'Menu',
      submenu: [
        {
          label: 'Option 1',
          click() {
            //console.log('Option 1 clicked');
            loadIndexPage();
          }
        },
        {
          label: 'Option 2',
          click() {
            //console.log('Option 2 clicked');
            loadPage2();
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Exit',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
            label: 'About',
            click() {
              //console.log('About clicked');
              loadAboutPage();
            }
        }
        // Submenu items for 'Help' menu
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);

// Quit the application when all windows are closed
app.on('window-all-closed', () => {
  // Check if the operating system is macOS before quitting the application
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Event triggered when the application is activated, typically on macOS, after all windows have been closed
app.on('activate', () => {
  // Recreate the main window if it doesn't exist when the application is activated
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/* function to load the pages
it will send an event to the renderer process
via preload.js
*/
function loadIndexPage() {
  mainWindow.webContents.send('load-page', 'index');
}

function loadPage2() {
  mainWindow.webContents.send('load-page', 'page2');
}

function loadAboutPage() {
  mainWindow.webContents.send('load-page', 'about');
}

