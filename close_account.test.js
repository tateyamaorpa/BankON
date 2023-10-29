// bankon.test.js
const request = require('supertest');
const express = require('express');
const app = require('./bankon'); // Import the Express app from your code file
const db = require('mysql');

describe('Express App', () => {
  it('should respond with "Server running" message', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('Server running');
    expect(response.statusCode).toBe(200);
  });

  it('should handle the /submit route and respond with "Account closed successfully"', async () => {
    // You can use a testing database or a mock library for database testing
    // Mock the db.query method to simulate database interactions
    const mockQuery = jest.fn((query, values, callback) => {
      callback(null, { affectedRows: 1 }); // Simulate a successful query
    });
    db.query = mockQuery;

    const response = await request(app)
      .post('/submit')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        postCode: '12345',
        country: 'USA',
        phoneNum: '555-555-5555',
        date: '2023-10-29',
        email: 'john@example.com',
        pin: '1234'
      });

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(response.text).toContain('Account closed successfully');
    expect(response.statusCode).toBe(200);
  });
});
