#!/usr/bin/env node

const { exec } = require('child_process');

// Function to lock the screen
function lockScreen() {
  exec('pmset displaysleepnow', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error locking screen: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log('Screen locked successfully.');
  });
}

// Call the lockScreen function
lockScreen();
