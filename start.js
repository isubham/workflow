#!/usr/bin/env node

import { exec } from 'node:child_process';


// usage workflow start epam


function startWorkFlow(workFlow) {

  console.log("starting workflow  ", JSON.stringify(workFlow.name))


  for (let app of workFlow.apps) {

    for (let location of app.locations) {

      if (location.open == false) {
        break;
      }

      console.log(`opening ${app.name} for location ${location.name}`)

      // 
      exec(`open -a "${app.name}" ${location.location}`, (error) => {
        if (error) {
          console.error(`Error opening ${app} ${location}: ${error.message}`);
        } else {
          console.log(`${app} opened in the ${location}`);
        }
      });
      //

    }

  }

}

export { startWorkFlow };

