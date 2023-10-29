const request = require('test');
const app  = require('./index.js'); 

describe('POST /submit', () => {
  it('return success message if payment was successful', async () => {
    const response = await request(app)
      .post('/submit')
      .send({
        Name: 'Dali Express',
        accountNumber: '123456',
        amount: '2000',
        date: '2023-10-28',
        
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Bill payment was succesful!');
  });

  it('return an error message if there is an error making the bill payment', async () => {
    app.db=db;
    app.db.query = jest.fn((query, values, callback) => {
      callback(new Error('Database Error'));
    });

    const response = await request(app)
      .post('/submit')
      .send({
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Error in making the bill payment :(');
  });
}); 