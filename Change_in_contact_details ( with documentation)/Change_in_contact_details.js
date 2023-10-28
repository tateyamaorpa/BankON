/**
 * @module changeContactDetails
 * @description This module allows the user to change contact details.
 * @author Rifah
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
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

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

// Parse request bodies
app.use(express.urlencoded({ extended: false }));

/**
 * Handles the submission of Form 1 data to the database.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
app.post('/submitForm1', (req, res) => {
    const customerName = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const accountNumber = req.body.accountNumber;
    const quantity = req.body.quantity;
    const type = req.body.type;

    // SQL query to insert data into the 'orders' table
    const query = 'INSERT INTO orders (Name, Email, address, phoneNumber, accountNumber, Quantity, Types) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [customerName, email, address, phoneNumber, accountNumber, quantity, type], (err, result) => {
        if (err) {
            res.status(500).send('Error inserting data');
        } else {
            console.log('Form data submitted successfully');
        }
    });
});

/**
 * Handles the submission of Form 2 data to update customer information in the database.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
app.post('/submitForm2', (req, res) => {
    const customerName = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const city = req.body.city;

    // SQL query to update customer information in the 'customer' table
    const query = 'UPDATE customer SET email = ?, phoneNumber = ?, address = ? WHERE name = ?';
    db.query(query, [email, phoneNumber, address, customerName], (err, result) => {
        if (err) {
            res.status(500).send('Error updating data');
        } else {
            console.log('Form data submitted successfully');
        }
    });
});

/**
 * Start the Express server on the specified port.
 */
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

/**
 * Adds an event listener to the "updateForm" element, preventing the default form submission
 * and submitting the form data via a fetch request.
 *
 * @param {Event} event - The form submission event.
 */
document.getElementById("updateForm").addEventListener("submit", function (event) {
    /**
     * Prevent the default form submission behavior.
     * @param {Event} event - The form submission event.
     */
    event.preventDefault();

    /**
     * Get the form data from the "updateForm" element.
     * @type {FormData}
     */
    const formData = new FormData(this);
    /**
 * Send a POST request to the server with the form data.
 *
 * @param {string} url - The URL to send the POST request to.
 * @param {Object} options - Fetch options, including method and body.
 */
fetch('/submitForm2', {
    method: 'POST',
    body: formData,
})
.then(response => {
    /**
     * Handle the response from the server after the POST request.
     *
     * @param {Response} response - The response object from the fetch operation.
     */
    if (response.status === 200) {
        // Successful update; handle as needed.
        console.log('Record updated successfully.');
    } else {
        /**
         * Handle errors and display an error message if the response status is not 200.
         *
         * @param {string} 'Error updating record.' - The error message to display.
         */
        console.error('Error updating record.');
    }
})
.catch(error => {
    /**
     * Handle network errors and display an error message.
     *
     * @param {Error} error - The error object representing the network error.
     */
    console.error('Network error:', error);
});
});