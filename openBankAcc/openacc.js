/**
 * @module openAccount
 * @description This module allows the user to open a new bank account.
 * @author Tasin 
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
const port = 3000;

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
    user: 'tasiin',
    password: '12345',
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
function generateUniqueNumber() {
    let timestamp = new Date().getTime();

    let random = Math.floor(Math.random() * 90000000) + 10000000;

    let uniqueNumber = timestamp.toString() + random.toString();

    return uniqueNumber.substr(0, 8);
  }

app.use(express.urlencoded({ extended: false }));

/**
 * @function post
 * @description Takes input from the user and send the inputs to the database using a database query.
 * @params req
 * @param res
 */
app.post('/submit', (req, res) => {
  const { firstName, lastName, street, city, state, postCode, country, phoneNum, date, email, pin} = req.body;

  const query = 'INSERT INTO customer (firstName, lastName, address, phoneNumber, dateOfOpening, email, pin, accountNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  /**
  * @function query
  * @description It send a query to the database.
  * @param {string} query
  */
  db.query(query, [firstName, lastName, street + ", " + city + ", " + state + ", " + postCode + ", " + country, phoneNum, date, email, pin, generateUniqueNumber() ], (err, result) => {
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
  console.log(`Server running at http://localhost:${port}`);
});
