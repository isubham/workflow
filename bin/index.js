#!/usr/bin/env node


/* usage

workflow start
workflow ls


*/

import { program } from "commander";

import select  from "@inquirer/select";
import  input  from '@inquirer/input';

import chalk from "chalk";

import { workFlowPlabs } from "../configs/config-pl.js";
import { workFlowEpam } from "../configs/config-epam.js";

import { startWorkFlow } from "../start.js";
import { stopWorkFlow } from "../stop.js";
import { session, setup, workflow, workflowContext } from "../sqlite.js";
import { mineWorkflowApp } from "../configs/config-workflow.js";


program
  .version("1.0.0")
  .description("workflow");

const commands = {
  start: 'start',
  list: 'list',
  stop: 'stop',
  ls: 'ls',
  setup: 'setup',
  clean: 'clean',
  create: 'create',
}


program
  .command(commands.list)
  .description('show all workflow')
  .action(async() => {

    const workflows = await workflow.getAll();

    const viewData = [];

    workflows.forEach(workflow => {
      viewData.push({
        name: workflow.name,
        value: workflow.name,
        id: workflow.id
      });
    });

    console.table(viewData);
  })


program
  .command(commands.create)
  .description('create new workflows')
  .action(async() => {
    
    const workflowName = await input({ message: 'Enter workflow name' });

    const workflowCreated = await workflow.insert(workflowName);

    const workflowId = workflowCreated.lastID

    await createWorkFlowContext(workflowId)

    await displayWorkFlow(workflowId);
    
  })

async function displayWorkFlow(workflowId) {

  const viewData = [];
  // show workflow 
  const created = await workflow.get(workflowId)
  viewData.push([{ name: created.name, location: '' }]);

  // show workflow context
  const workflowContexts = await workflowContext.getAll(workflowId);

  workflowContexts.forEach(workflowContext => {
  
    viewData.push([{ name: workflowContext.app, location:  workflowContext.location}]);

  });

  console.table(chalk.cyan(viewData));

}


async function createWorkFlowContext(workflowId) {

  const app = await input({ message: 'Enter app name' });
  const location = await input({ message: 'Enter location' });
  await workflowContext.insert(app, location, workflowId)


  const addMore = await input({ message: 'add more apps [y/n]?' });

  if (addMore == 'y') {
    await createWorkFlowContext(workflowId)
  } else {
    return;
  }

}

program
  .command(commands.setup)
  .description('setup workflow databases, dependencies')
  .action(async () => {
    await setup.init()
  })

program
  .command(commands.clean)
  .description('fresh start workflow')
  .action(async () => {
    await setup.clean()
  })


// list active sessions
program
  .command(commands.stop)
  .description('stop running workflows')
  .action(async () => {

    const workflowSessions = await session.getAll();

    const choices = workflowSessions.map(workflowSession => {


      const diffMs = new Date(new Date().toLocaleString()) - new Date(workflowSession.start_time);

      const diffSec = diffMs / 1000;
      const diffMin = Math.round(diffSec / 60, 1);

      return {

        name: `${workflowSession.name}  | started on ${workflowSession.start_time} (${diffMin} mins ago)`,
        value: `${workflowSession.name}`
      }
    });

    if (choices.length > 0) {

      select({
        message: 'your active workflow: ',
        choices
      }).then(async (name) => {


        try {

          const workflow = workflowsConfigs.find(e => e.id === name).workflow;
        
          stopWorkFlow(workflow);
        
          await session.delete(name);

        } catch (error) {

          console.log(chalk.red(`error in ending workflow ${name}!`));

        }  
        finally {
          console.log(chalk.red(`workflow ${name} ended !`));
        }


      });
       
    }

  });

      

const workflowsConfigs = [
  { id: 'epam', workflow: workFlowEpam },
  { id: 'plabs', workflow: workFlowPlabs },
  { id: 'workflowApp', workflow: mineWorkflowApp },
]

const workFlows = [
    {
      name: "epam",
      value: "epam",
    },
    {
      name: "plabs",
      value: "plabs",
    },
    {
      name: "workflowApp",
      value: "workflowApp",
    },

];

// start session
program
  .command(commands.start)
  .description('stars a workflow')
  .action(() => {
  select({
    message: 'your workflow: ',
    choices: workFlows
  })
    .then((name) => {
      console.log(chalk.green(`workflow ${name} starting !`));
      const workflow = workflowsConfigs.find(e => e.id === name).workflow;
      startWorkFlow(workflow);
      session.insert(name);
      console.log(`workflow ${name} started`)

    });
});

 

program.parse(process.argv);


// list active workflows
// start workflows
// stop workflows
