/**
 * @module Transaction
 * @description This module allows the user to view transaction information.
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
const app = express();
const port = 3300;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
  * @function listen
  * @description It listens for connection and gets the server running at give port.
  * @param {number} 3000
  */ 
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const mysql = require('mysql2');


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
    console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the database");
    }
});



/**
 * @function get
 * @description shows the database table using a database query.
 * @params req
 * @param res
 */

app.get("/tables", (req, res) => {
  // SQL query to retrieve table names
  const query = "SHOW TABLES";
  connection.query(query, (error, results) => {
      if (error) {
          console.error("Database error:", error);
          res.send("Error: Database error.");
      } else {
          // Extract table names from results
          const tableNames = results.map(result => result.transaction);

          // Send table names to the client (HTML)
          res.json(tableNames);
      }
  });

    /**
    * @function query
    * @description It send a query to the database.
    * @param {string} query
    */
  
   
  });
  
  