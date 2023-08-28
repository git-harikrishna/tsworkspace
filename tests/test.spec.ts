import request from 'supertest';
import app from '../workspace/package2/index';
import UserP2 from '../workspace/package2/userSchema'; // Adjust the path accordingly
import bcrypt from 'bcrypt';

describe('User Routes', () => {
  jest.mock('../workspace/package2/userSchema');

 
  describe('POST /signUp', () => {
    it('should sign up a new user', async () => {

      // Mock of findOne method of UserP2
      const findOneMock = jest.spyOn(UserP2, 'findOne');
      findOneMock.mockResolvedValue(null);

      const newUser = {
        name: 'TestUser',
        mobile_no: '1234567890',
        email: 'test@example.com',
        password: 'testpassword',
        emp_code: 'test123'
      };

      const response = await request(app)
        .post('/signUp')
        .send(newUser)
        .expect(200);

      expect(findOneMock).toHaveBeenCalledWith({ name: 'TestUser' });
      expect(response.body.msg).toBe('User added successfully');
    },10000);

    it('should return an error if user already exists', async () => {
      const findOneMock = jest.spyOn(UserP2, 'findOne');
      findOneMock.mockResolvedValue({ name: 'TestUser' });

      const existingUser = {
        name: 'TestUser',
        mobile_no: '9876543210',
        email: 'existing@example.com',
        password: 'testpassword',
        emp_code: 'existing123'
      };

      const response = await request(app)
        .post('/signUp')
        .send(existingUser)
        .expect(400);

      expect(response.body.message).toBe('User name already exists.');
    });
  });

  describe('GET /getUser', () => {
    it('should get user information', async () => {
      const findOneMock = jest.spyOn(UserP2, 'findOne');
      findOneMock.mockResolvedValue({
        name: 'TestUser',
        password: 'testpassword',
      });

      const response = await request(app)
        .get('/getUser')
        .send({ name: 'TestUser', password: 'testpassword' })
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('should return an error if user does not exist', async () => {
      const findOneMock = jest.spyOn(UserP2, 'findOne');
      findOneMock.mockResolvedValue(null);

      const response = await request(app)
        .get('/getUser')
        .send({ name: 'NonExistingUser', password: 'invalidpassword' })
        .expect(400);

      expect(response.body.msg).toBe('No such username found');
    });
  });
});
