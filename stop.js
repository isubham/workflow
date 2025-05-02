#!/usr/bin/env node

import { exec } from 'node:child_process';


function stopWorkFlow(workFlow) { 

  console.log(`stopping ${workFlow.name}`)

  for (let app of workFlow.apps) {
    for (let location of app.locations) {

      if (location.open == false) {
        break;
      }

      console.log(`closing ${app.name} for location ${location.name}`)

      exec(`osascript -e 'tell application "${app.name}" to quit'`, (error) => {
        if (error) {
          console.error(`Error quitting ${app.name} ${error.message}`);
        } else {
          console.log(`${app.name} quit safely.`);
        }
      });

    }
  }
}


export { stopWorkFlow }
