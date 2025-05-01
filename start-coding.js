#!/usr/bin/env node

console.log("starting coding session")

const { exec } = require('child_process');

// ==============
// open brave browser with a specific URL
const url =  'https://www.youtube.com/watch?v=lrfcxQguHVk'; // Default URL
const bravePath = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';

exec(`open -a "${bravePath}" "${url}"`, (error) => {
  if (error) {
    console.error(`Error opening Brave: ${error.message}`);
  } else {
    console.log(`Brave opened with URL: ${url}`);
  }
});


// ==================
// Visual Studio Code.app
// open visual studio code with dealxg-adapter endpoint
const project = process.argv[2]

let projectPaths = {
  'adapter': '$HOME/Desktop/cox-git/dri-adapter',
  'payment': '$HOME/Desktop/cox-git/dri-payment'
};

const projectPath = projectPaths[project] || projectPaths['adapter'];
console.log(`Opening Visual Studio Code with project path: ${projectPath}`);

// Open Visual Studio Code with the specified project
const vscodePath = `code --new-window --add ${projectPath}`;

exec(`${vscodePath} .`, (error) => {
  if (error) {
    console.error(`Error opening VS Code: ${error.message}`);
  } else {
    console.log('Visual Studio Code opened in the current directory.');
  }
});

// ===================
// open draw.io with a specific file
const drawioPath = '/Applications/draw.io.app/Contents/MacOS/draw.io';
const drawioFile = '$HOME/Documents/diagrams/dri-adapter.drawio'; // Replace with your file path

exec(`open -a "${drawioPath}" "${drawioFile}"`, (error) => {
  if (error) {
    console.error(`Error opening draw.io: ${error.message}`);
  } else {
    console.log(`draw.io opened with file: ${drawioFile}`);
  }
});

