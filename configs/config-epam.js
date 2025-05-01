
const workFlowEpam = {
  name: "epam",
  apps: [
    {
      nickName: "personal browser",
      name: "Brave Browser", 
      path: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
      locations: [
        {
          name: "backgroundMusic",
          location: 'https://www.youtube.com/watch?v=lrfcxQguHVk',
        },
        {
          name: "news",
          location: 'https://www.youtube.com/watch?v=lrfcxQguHVk',
        }
      ]
    },
    { 
      nickName: "code editor",
      name: "Visual Studio Code", 
      path: "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code",
      locations: [
        {
          name: 'adapter',
          location: '$HOME/Desktop/cox-git/dri-adapter',
        },
        {
          name: 'payment', 
          location: '$HOME/Desktop/cox-git/dri-payment'
        }
      ]
    },
    { 
      nickName: "diagram tool",
      name: "draw.io", 
      path: '/Applications/draw.io.app/Contents/MacOS/draw.io',
      locations: [
        {
          name : "adapter", 
          location: '$HOME/Documents/diagrams/dri-adapter.drawio',
        }
      ]
    },
  ],

};


export { workFlowEpam };

