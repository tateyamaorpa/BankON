const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = require('./Order_checkbook');


const testApp = express();

testApp.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bankon'
});

jest.mock('mysql', () => ({
  createConnection: jest.fn(() => ({
    connect: jest.fn((callback) => callback()),
    query: jest.fn(),
  })),
}));

const dbQuery = db.query;

jest.mock('express', () => {
  const mockExpress = require('express');
  return jest.fn(() => mockExpress());
});

describe('Order Checkbook Server Tests', () => {
  it('should handle Form 1 submission', async () => {
    const mockRequest = {
      body: {
        name: 'Rifah',
        email: 'kss.rifah@gmail.com',
        address: '27 Paltan',
        phoneNumber: '28373',
        accountNumber: '12345',
        quantity: 1,
        type: 'personal',
      },
    };

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };

    const expectedQuery = 'INSERT INTO orders (Name, Email, address, phoneNumber, accountNumber, Quantity, Types) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const expectedValues = [
        'Rifah',
        'kss.rifah@gmail.com',
        '27 Paltan',
        '28373',
        '12345',
        1,
        'personal',
        
        
    ];

    await testApp.post('/submitForm1', mockRequest, mockResponse);

    expect(dbQuery).toHaveBeenCalledWith(expectedQuery, expectedValues, expect.any(Function));
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  
});
