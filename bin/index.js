#!/usr/bin/env node


/* usage

workflow start
workflow ls


*/

import { program } from "commander";
import select, { Separator } from "@inquirer/select";
import chalk from "chalk";

import { workFlowPlabs } from "../configs/config-pl.js";
import { workFlowEpam } from "../configs/config-epam.js";

import { startWorkFlow } from "../start.js";
import { stopWorkFlow } from "../stop.js";
import { insertSession, deleteSession, getWorkFlowSessions } from "../sqlite.js";


program
  .version("1.0.0")
  .description("workflow");


const workflows = [
  { id: 'epam', workflow: workFlowEpam },
  { id: 'plabs', workflow: workFlowPlabs },
]

program
  .command('ls')
  .description('get running workflows')
  .action(() => {

    getWorkFlowSessions();

  });

      
// start session
program
  .command('start')
  .description('stars a workflow')
  .action(() => {
  select({
    message: 'your workflow: ',
      choices: [
        {
          name: "epam",
          value: "epam",
        },
        {
          name: "plabs",
          value: "plabs",
        },
        {
          name: "mine",
          value: "mine",
        },

    ]})
    .then((name) => {
      console.log(chalk.green(`workflow ${name} starting !`));
     
      const workflow = workflows.find(e => e.id === name).workflow;
      

      startWorkFlow(workflow);

      insertSession(name);

      console.log(`workflow ${name} started`)

    });
});


// end session
// start session
program
  .command('end')
  .description('end a workflow')
  .action(() => {
  select({
    message: 'your workflow: ',
      choices: [
        {
          name: "epam",
          value: "epam",
        },
        {
          name: "plabs",
          value: "plabs",
        },
        {
          name: "mine",
          value: "mine",
        },

    ]})
    .then((name) => {
      console.log(chalk.green(`workflow ${name} starting !`));
     
      const workflow = workflows.find(e => e.id === name).workflow;

      stopWorkFlow(workflow);

      deleteSession(name);

      console.log(`workflow ${name} started`)

    });
});



program.parse(process.argv);


// list active workflows
// start workflows
// stop workflows
