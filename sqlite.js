
import sqlite3 from 'sqlite3';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function createDbConnection() {
  const filepath = __dirname + '/workflow.db';
  console.log(filepath);
  const db = new sqlite3.Database(filepath, (error) => {
  if (error) {
    return console.error(error.message);
  }
  });
  console.log("Connection with SQLite has been established");
  return db;
}

const insertSession = async (name) => {

  const db = createDbConnection();

  db.run(`INSERT into w_sessions (name, start_time) values (?, ?)`,
    [name, (new Date()).toLocaleString()])

  db.close();
}

const deleteSession = async (name) => {

  const db = createDbConnection();

  db.run(`DELETE from w_sessions where name = ?`,
    [name])

  db.close();

}

const getWorkFlowSessions = async () => {

  const db = createDbConnection();

  db.all(`SELECT * from w_sessions `, [], (err, rows) => {
    if (err) {

      return console.error(err.message);

    }

    rows.forEach(row => {
      console.log(row);
    });

  })

  db.close();


}

export { insertSession, deleteSession, getWorkFlowSessions  };


