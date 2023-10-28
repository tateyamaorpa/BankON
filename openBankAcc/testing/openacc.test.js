const request = require('supertest');
const { app, generateUniqueNumber } = require('./openacc.js'); 

describe('Unique Number Generation', () => {
  it('should generate a unique 8-digit number', () => {
    const uniqueNumber = generateUniqueNumber();

    expect(uniqueNumber).toMatch(/^\d{8}$/);
  });
});

describe('POST /submit', () => {
  it('should return success message if account is opened successfully', async () => {
    const response = await request(app)
      .post('/submit')
      .send({
        firstName: 'Chanchal',
        lastName: 'Chowdhury',
        street: 'Banani 11',
        city: 'Dhaka',
        state: 'Dhaka',
        postCode: '1234',
        country: 'Bangladesh',
        phoneNum: '5555555555',
        date: '2023-10-27',
        email: 'Chanchal@example.com',
        pin: '43210'
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Account opened successfully!');
  });

  it('should return an error message if there is an error opening the account', async () => {
    app.db=db;
    app.db.query = jest.fn((query, values, callback) => {
      callback(new Error('Database Error'));
    });

    const response = await request(app)
      .post('/submit')
      .send({
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Error in opening account :(');
  });
});