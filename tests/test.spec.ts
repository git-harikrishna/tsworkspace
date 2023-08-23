import request from 'supertest';
import app from '../workspace/package2/index'; // Assuming this is the filename where your Express app is defined

describe('User Routes', () => {
  // Test signUp route
  describe('POST /signUp', () => {
    it('should sign up a new user', async () => {
      // expect.assertions(1);
      const newUser = {
        name: 'Test User',
        mobile_no: '1234567890',
        email: 'test@example.com',
        password: 'testpassword',
        emp_code: 'test123'
      };

      const response = await request(app)
        .post('/signUp')
        .send(newUser)
        .expect(200);

      expect(response.body.msg).toBe('User added successfully');
      expect(response.body.data).toBeDefined();
    },10000);

    it('should return an error if user already exists', async () => {
      const existingUser = {
        name: 'Test User',
        mobile_no: '9876543210',
        email: 'existing@example.com',
        password: 'existingpassword',
        emp_code: 'existing123'
      };

      const response = await request(app)
        .post('/signUp')
        .send(existingUser)
        .expect(400);

      expect(response.body.message).toBe('User name already exists.');
    });

    // Add more test cases for different scenarios
  });

  // Test getUser route
  describe('GET /getUser', () => {
    it('should get user information', async () => {
      
      const response = await request(app)
        .get('/getUser')
        .send({ name: 'Test User', password: 'testpassword' })
        .expect(200);

      expect(response.body.dbuser).toBeDefined();
      // You can add more assertions to check the user data
    });

    it('should return an error if user does not exist', async () => {
      const response = await request(app)
        .get('/getUser')
        .send({ name: 'NonExistingUser', password: 'invalidpassword' })
        .expect(400);

      expect(response.body.msg).toBe('No such username found');
    });

    // Add more test cases for different scenarios
  });
});

