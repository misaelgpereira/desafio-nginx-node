const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
};

const connection = mysql.createConnection(config);

connection.query(
  `CREATE TABLE IF NOT EXISTS people (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY (id)
  )`,
  (error, results, fields) => {
    if (error) throw error;
  }
);

app.get('/', (req, res) => {
  const name = `People-${Math.floor(Math.random() * 100)}`;
  connection.query(`INSERT INTO people(name) VALUES(?)`, [name]);

  connection.query('SELECT name FROM people', (error, results) => {
    if (error) throw error;

    const names = results.map(row => row.name).join('<br>');
    res.send(`<h1>Full Cycle Rocks!</h1><br>${names}`);
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
