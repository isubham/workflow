#!/usr/bin/env node

console.log("starting coding session")

const { exec } = require('child_process');



// ==============
// open brave browser with a specific URL
apps
exec(`osascript -e 'tell application "" to quit'`, (error) => {
  if (error) {
    console.error(`Error quitting Brave Browser: ${error.message}`);
  } else {
    console.log('Brave Browser quit safely.');
  }
});

