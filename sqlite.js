
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';

import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import chalk from 'chalk';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const filepath = __dirname + '/workflow.db';


export async function createDbConnection() {

  const db = await open(
    {
      filename: filepath,
      driver: sqlite3.Database
    }
  )
  return db;
}

class Setup {

  async init() {
    await this.createDb();
    await this.createTables();  
  }
  
  // just creates a file for use in sqlite and its tables
  async createDb() {
    try {
      // check if file already exists
      await access(filepath, constants.F_OK);
      console.log('database already exits');
    } catch (error) {
      console.log('creating fresh database');
      exec('touch ${filePath}');
    }

  }


  async createTables() {

    const db = await createDbConnection();

    console.log('creating tables');

    await db.exec(`CREATE TABLE IF NOT EXISTS w_sessions 
      (
        id INTEGER PRIMARY_KEY AUTO_INCREMENT,
        name TEXT,
        start_time TEXT,
        end_timeTEXT
      )
      `)

    await db.exec(`
    CREATE TABLE IF NOT EXISTS workflows (
      id INTEGER AUTO_INCREMENT PRIMARY_KEY, 
      name TEXT,
      created_on TEXT,
      updated_on TEXT
      )`
    );


    await db.exec(`
    CREATE TABLE IF NOT EXISTS workflow_context (
      id INTEGER AUTO INCREMENT PRIMARY KEY,
      app TEXT,
      path TEXT,
      workflow_id INTEGER,
      created_on TEXT,
      updated_on TEXT
    )`
    );
  }

  async clean () {
    exec(`rm  ${filepath}`);
  }


}

class Session {

  insert = async (name) => {

    const db = await createDbConnection();

    const result = db.run(`INSERT into w_sessions (name, start_time) values (?, ?)`,
      [name, (new Date()).toLocaleString()])

    await db.close();
    return result;
  }



  delete = async (name) => {

    const db = await createDbConnection();

    const results = db.run(`DELETE from w_sessions where name = ?`,
      [name])

    await db.close();
    
    return results;

  }


  getAll = async () => {

    try {
      const db = await createDbConnection();
      const workflowSessions = await db.all(`SELECT * from w_sessions`);
      await db.close();
      return workflowSessions;
    } catch(error) {
      console.log(chalk.red('error getting active sessions'));
      return [];
    }

  }

}


class WorkFlow {

  insert = async (name) => {

    const db = await createDbConnection();

    const result = db.run(`INSERT into workflows (name, created_on) values (?, ?)`,
      [name, (new Date()).toLocaleString()])

    await db.close();
    return result;
  }


  get = async (id) => {

    const db = await createDbConnection();

    const result = db.run(`SELECT * FROM workflows WHERE id = ?`,
      [id])

    await db.close();
    return result;
  }



  /*
  delete = async (name) => {

    const db = await createDbConnection();

    const results = db.run(`DELETE from workflows where name = ?`,
      [name])

    await db.close();
    
    return results;

  }
  */


  getAll = async () => {

    const db = await createDbConnection();

    const workflowSessions = await db.all(`SELECT * from workflows`);

    await db.close();

    return workflowSessions;

  }

}

const schema = {
  name: "mine-workflow-app",     
  locations: [
    { app: "Brave Browser", path: 'https://www.youtube.com/watch?v=lrfcxQguHVk'},
    { app: "Brave Browser", path: 'https://news.ycombinator.com/'},
    { app: "Brave Browser", path: 'https://github.com/SBoudrias/Inquirer.js/tree/main/packages/select'},
    { app: "Visual Studio Code", path: '$HOME/workflow/' },
    { app: "draw.io", path: '$HOME/workflow/workflow.drawio'},
  ],
};


class WorkFlowContext {

  insert = async (app, path, workflowId) => {

    const db = await createDbConnection();

    const result = db.run(`INSERT into workflow_context (app, path, workflow_id, created_on) values (?, ?, ?, ?)`,
      [app, path, workflowId, (new Date()).toLocaleString()])

    await db.close();
    return result;
  }



  delete = async (id) => {

    const db = await createDbConnection();

    const results = db.run(`DELETE from workflow_context  where id = ?`,
      [id])

    await db.close();
    
    return results;

  }


  getAll = async (workflowId) => {

    const db = await createDbConnection();

    const workflowSessions = await db.run(`SELECT * from workflow_context where workflow_id = ?`,
    [workflowId]);

    await db.close();

    return workflowSessions;

  }
  
}

const session = new Session();
const setup = new Setup();
const workflow = new WorkFlow();
const workflowContext = new WorkFlowContext();



export {workflow, workflowContext, session, setup} 


