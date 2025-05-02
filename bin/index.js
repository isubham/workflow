#!/usr/bin/env node


/* usage

workflow start
workflow ls


*/

import { program } from "commander";
import select  from "@inquirer/select";
import chalk from "chalk";

import { workFlowPlabs } from "../configs/config-pl.js";
import { workFlowEpam } from "../configs/config-epam.js";

import { startWorkFlow } from "../start.js";
import { stopWorkFlow } from "../stop.js";
import { session, setup } from "../sqlite.js";
import { mineWorkflowApp } from "../configs/config-workflow.js";


program
  .version("1.0.0")
  .description("workflow");

const commands = {
  start: 'start',
  stop: 'stop',
  ls: 'ls',
  setup: 'setup',
  clean: 'clean',
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
