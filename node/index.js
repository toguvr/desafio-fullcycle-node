const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config)
  
const createTable  = `CREATE TABLE IF NOT EXISTS nodedb.people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL);`
connection.query(createTable);

async function insertPeopleName(res) {
    const name ='Augusto Telles' + Math.random();
    const connection = mysql.createConnection(config);
    const sql = `INSERT INTO people(name) values('${name}')`;
  
    connection.query(sql);
    console.log(`${name} inserido no banco!`);
    getPeople(res, connection);
  }
  
  function getPeople(res, connection) {
    const sql = `SELECT id, name FROM people`;
  
    connection.query(sql, (error, results, fields) => {
      if (error) {
        throw error;
      }
  
      res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${
          !!results.length
            ? results.map((el) => `<li>${el.name}</li>`).join("")
            : ""
        }
      </ol>
    `);
    });
    connection.end();
  }

app.get('/', async (req,res) => {
    insertPeopleName(res)
})

    app.listen(port, () => {
        console.log('Rodando na porta '+ port)
    })
