const express = require('express');
const app = express();
const mysql = require('mysql');

/**
 * Database connection configuration.
 * @type {Object}
 */
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bankon_1',
};

const db = mysql.createConnection(dbConfig);

/**
 * Handle database connection.
 */
db.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');
});

app.get('/fraud-alerts', (req, res) => {
    const sql = 'SELECT * FROM fraudalerts';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

/**
 * Get the verification message element.
 * @type {HTMLElement}
 */
const verificationMessage = document.querySelector('#verification-message');

// Submit the form when the user clicks the submit button.
const form = document.querySelector('form');

/**
 * Event listener for the form submission.
 * @param {Event} event - The submit event.
 */
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the user's name and bank account number.
    const name = form.querySelector('input[name="name"]').value;
    const bankAccountNumber = form.querySelector('input[name="bank_account_number"]').value;

    // Send a request to the server to verify the bank account.
    fetch('/verify-bank-account', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, bankAccountNumber }),
    })
    .then(response => response.json())
    .then(data => {
        // Display the verification message.
        verificationMessage.innerHTML = data.message;
    })
    .catch(error => {
        // Display an error message.
        verificationMessage.innerHTML = 'An error occurred while verifying your bank account.';
    });

    /**
     * Fetch fraud alerts data from the server.
     */
    fetch('/fraud-alerts')
        .then(response => response.json())
        .then(data => {
            // Handle the retrieved data (e.g., display it in your web page)
            console.log(data);
        })
        .catch(error => console.error(error));
});
