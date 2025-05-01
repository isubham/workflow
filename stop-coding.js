#!/usr/bin/env node

console.log("starting coding session")

const { exec } = require('child_process');

// ==============
// open brave browser with a specific URL
exec(`osascript -e 'tell application "Brave Browser" to quit'`, (error) => {
  if (error) {
    console.error(`Error quitting Brave Browser: ${error.message}`);
  } else {
    console.log('Brave Browser quit safely.');
  }
});

// ==================
// Visual Studio Code.app
// close visual studio code with dealxg-adapter endpoint

exec('osascript -e \'tell application "Visual Studio Code" to quit\'', (error) => {
  if (error) {
    console.error(`Error quitting Visual Studio Code: ${error.message}`);
  } else {
    console.log('Visual Studio Code quit safely.');
  }
});


// close draw.io
exec('osascript -e \'tell application "draw.io" to quit\'', (error) => {
  if (error) {
    console.error(`Error quitting draw.io: ${error.message}`);
  } else {
    console.log('draw.io quit safely.');
  }
});
