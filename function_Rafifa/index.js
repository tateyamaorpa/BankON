/**
 * @module index
 * @description This module allows the user to make bill payment
 * @author Rafifa 
 */
/** 
 * Express 
 * @type {Object} 
 */
/** 
 * @function require 
 * @param {NodeModule} express
 * @param {NodeModule} express
 */
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3300;

/**
 * @function createConnection
 * @description provides connection to the specified database
 * @param {string} host name of host of the database
 * @param {string} user name of user of the database
 * @param {string} password password of this user of the database
 * @param {string} database name of the database
 */

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bankon'
});

/**
 * @description This shows whether the database connection has been made successfully or not.
 */

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); 

});

app.post('/submit-form', (req, res) => {
  const { Name, accountNumber, amount, date, paymentStatus } = req.body;

  const query = 'INSERT INTO transaction (Name, accountNumber, amount, date, paymentStatus) VALUES (?, ?, ?, ?, ?)';
  
  /**
  * @function query
  * @description It send a query to the database.
  * @param {string} query
  */

  db.query(query, [Name, accountNumber, amount, date, paymentStatus ], (err, result) => {
    if (err) {
        console.error(err);
      } else {
        console.log('Form data submitted successfully');
      }
  });
});

/**
 * @function listen
 * @description It listens for connection and gets the server running at give port.
 * @param {number} port
 */
app.listen(port, () => {
    console.log(`Server running at ${port}`);
  });
  
