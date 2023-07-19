const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');


// Create variables for mainWindow, tray, database, and database path
let mainWindow = null;
let tray = null;

function createWindow() {
  // Create a new Electron browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true // Enable the use of Node.js in the renderer context
    }
  });

  // Load the index.html file
  loadIndexPage();

  // Open Google Chrome Dev Tools
  //mainWindow.webContents.openDevTools(); 

  // Event triggered when the window is closed
  mainWindow.on('closed', () => {
    console.log('Window closed');
  });

  // Create the menu
  const template = [
    {
      label: 'Menu',
      submenu: [
        {
          label: 'Option 1',
          click() {
            console.log('Option 1 clicked');
          }
        },
        {
          label: 'Option 2',
          click() {
            console.log('Option 2 clicked');
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
              console.log('About clicked');
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

// Load the index.html file
function loadIndexPage() {
  mainWindow.loadFile(path.join(__dirname, '../html/index.html'));
}
