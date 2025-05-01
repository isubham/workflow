
const workFlowPlabs = {
  name: "plabs",     
  apps: [
    {
      nickName: "personal browser",
      name: "Brave Browser", 
      path: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
      locations: [
        { open: true, name: "backgroundMusic", location: 'https://www.youtube.com/watch?v=lrfcxQguHVk'},
        { open: true, name: "news", location: 'https://news.ycombinator.com/'},
        { open: false, name: "meeting", location: "https://meet.google.com/xdv-uegr-jek?pli=1&authuser=1"},
        { open: false, name: "project managent", location: "https://profitlabs.atlassian.net/jira/software/projects/ECS/boards/1?cloudId=13e68755-55ca-4cbe-bf95-7e8414e2877a&atlOrigin=eyJwIjoiaiIsImkiOiI3ZGYwZTI1YjA4M2U0NTZkYjRjNDcwZmE0Nzk1NWFkZCJ9"},
        { open: false, name: "wiki", location: "https://profit-labs.helpscoutdocs.com/"},
        { open: false, name: "vcs", location: "https://gitlab.com/profit-bundles/"},
        { open: false, name: "db", location: "https://v4.dashboard.fauna.com/db/us-std/bundles-us"},
        { open: false, name: "sentry", location: "https://profit-labs.sentry.io/issues/?referrer=sidebar"},
        { open: false, name: "aws", location: "https://us-west-2.console.aws.amazon.com/console/home?region=us-west-2#"},
        { open: false, name: "shopify", location: "https://apps.shopify.com/partners/profit-apps"},
        { open: false, name: "shopify", location: "https://shopify.dev/docs/apps/build/orders-fulfillment/inventory-management-apps"},
        { open: false, name: "fulfill order", location: "https://shopify.dev/docs/api/admin-graphql/2024-04/objects/FulfillmentOrder"},
        { open: false, name: "shopify dev", location: "https://partners.shopify.com/1969667/apps/228266213377/edit"},
        { open: false, name: "profit lab apps", location: "https://admin.shopify.com/store/profit-labs-showcase/"},
      ]
    },
    { 
      nickName: "code editor",
      name: "Visual Studio Code", 
      path: "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code",
      locations: [
        {
          name: 'bundles serverless',
          location: '$HOME/Desktop/profit-labs/bundles-serverless/',
        },
        {
          name: 'bundles admin', 
          location: '$HOME/Desktop/profit-labs/bundles-admin/'
        }
      ]
    },
    { 
      nickName: "diagram tool",
      name: "draw.io", 
      path: '/Applications/draw.io.app/Contents/MacOS/draw.io',
      locations: [
        {
          name : "profit labs diagrams", 
          location: '$HOME/Desktop/profit-labs/profit-labs.drawio',
        }
      ]
    },
  ],

};


export { workFlowPlabs };

