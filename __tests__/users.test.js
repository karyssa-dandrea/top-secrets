const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

describe('top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { firstName, lastName, email } = mockUser;
    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  it('logs in a user', async () => {
    const user = await UserService.create(mockUser);
    const res = await request(app).post('/api/v1/users/session').send(mockUser);

    expect(res.body).toEqual({
      message: 'Login successful!',
      user,
    });
  });
});
