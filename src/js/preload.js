//console.log('preload.js - Loading preload.js')
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
    "api", {
      send: (channel, data) => {
          //console.log(`preload.js - FROM renderer.js TO main.js: ${channel} - ${data}`);
          ipcRenderer.send(channel, data);
      },
      receive: (channel, func) => {
          ipcRenderer.on(channel, (event, ...args) => {
              //console.log(`preload.js - FROM main.js TO renderer.js: ${channel} - ${args}`);
              func(...args);
          });
      }
    }
  );
  