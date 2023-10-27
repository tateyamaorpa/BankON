/**
 * @module closeAccount
 * @description This module allows the user to close a bank account.
 * @author Orpa
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
const port = 2000;

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
 * @description This shows whether the database connection has been made successfulyy or if there was an error.
 */
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
/**
 * @function generateUniqueNumber
 * @description It returns a unique 8 digit number by using the current time stamp.
 */
// Sample array of bank accounts




app.use(express.urlencoded({ extended: false }));

/**
 * @function post
 * @description Takes input from the user and send the inputs to the database using a database query.
 * @params req
 * @param res
 */
app.post('/submit', (req, res) => {
  const { firstName, lastName, street, city, state, postCode, country, phoneNum, date, email, pin} = req.body;

  const query = 'DELETE FROM customer (firstName, lastName, address, phoneNumber, dateOfOpening, email, pin, accountNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  /**
  * @function query
  * @description It send a query to the database.
  * @param {string} query
  */
  db.query(query, [firstName, lastName, street + ", " + city + ", " + state + ", " + postCode + ", " + country, phoneNum, date, email, pin, generateUniqueNumber() ], (err, result) => {
    if (err) {
        console.error(err);
      } else {
        console.log('Account closed successfully');
      }
  });
});

/**
 * @function listen
 * @description It listens for connection and gets the server running at give port.
 * @param {number} port
 */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
