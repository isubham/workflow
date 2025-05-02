const mineWorkflowApp = {
  name: "mine-workflow-app",     
  apps: [
    {
      name: "Firefox", 
      path: '/Applications/Firefox.app',
      locations: [
        { open: true, name: "backgroundMusic", location: 'https://www.youtube.com/watch?v=lrfcxQguHVk'},
        { open: true, name: "news", location: 'https://news.ycombinator.com/'},
        { open: true, name: 'inquirer', location: 'https://github.com/SBoudrias/Inquirer.js/tree/main/packages/select'}
      ]
    },
    { 
      name: "Visual Studio Code", 
      path: "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code",
      locations: [
        {
          location: '$HOME/workflow/',
        }
      ]
    },
    { 
      nickName: "diagram tool",
      name: "draw.io", 
      path: '/Applications/draw.io.app/Contents/MacOS/draw.io',
      locations: [
        {
          location: '$HOME/workflow/workflow.drawio',
        }
      ]
    },
  ],

};

export { mineWorkflowApp  };
