const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bankon'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// Parse request bodies
app.use(express.urlencoded({ extended: false });

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