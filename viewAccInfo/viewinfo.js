/**
 * @module viewAccInfo
 * @description This module allows the user to view account information.
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

app.use(express.urlencoded({ extended: true }));

/**
 * @function post
 * @description Takes input from the user and uses the inputs to match with the database table using a database query.
 * @params req
 * @param res
 */

app.post('/login', (req, res) => {
    const { accountNumber, pin } = req.body;
  
    const query = 'SELECT * FROM customer WHERE accountNumber = ? AND pin = ?';
    /**
    * @function query
    * @description It send a query to the database.
    * @param {string} query
    */
  
    db.query(query, [accountNumber, pin], (err, results) => {
      if (err) {
        console.error(err);
        res.send('Error while logging in');
        return;
      }
      /**
      * div added for every output information so that the display looks better
      */
      if (results.length > 0) {
        const userInfo = results[0];
        const userInfoHTML = `
          <div>
              <strong>First Name:</strong> ${userInfo.firstName}
          </div>
          <div>
              <strong>Last Name:</strong> ${userInfo.lastName}
          </div>
          <div>
              <strong>Address:</strong> ${userInfo.address}
          </div>
          <div>
              <strong>Phone Number:</strong> ${userInfo.phoneNumber}
          </div>
          <div>
              <strong>Date of Opening:</strong> ${userInfo.dateOfOpening}
          </div>
          <div>
              <strong>Email:</strong> ${userInfo.email}
          </div>
          <div>
              <strong>PIN:</strong> ${userInfo.pin}
          </div>
          <div>
              <strong>Account Number:</strong> ${userInfo.accountNumber}
          </div>
        `;
  
        res.send(userInfoHTML);
      } else {
        res.send('Invalid account number or PIN');
      }
    });
  });
  
  /**
  * @function listen
  * @description It listens for connection and gets the server running at give port.
  * @param {number} 3000
  */ 
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });