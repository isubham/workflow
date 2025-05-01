#!/usr/bin/env node

import { workFlow } from './config.js';
import { exec } from 'node:child_process';

console.log("starting coding session ", JSON.stringify(workFlow))


for (let app of workFlow.apps) {

  for (let location of app.locations) {

    console.log(`opening ${app.name} for location ${location.location}`)

    exec(`open -a ${app} ${location}`, (error) => {
      if (error) {
        console.error(`Error opening ${app} ${location}: ${error.message}`);
      } else {
        console.log('Visual Studio Code opened in the current directory.');
      }
    });

  }

}

