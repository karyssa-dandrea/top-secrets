const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Secret = require('../lib/models/Secret');
const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'example@example.com',
  password: '1234',
};

describe('top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a secret', async () => {
    const agent = request.agent(app);
    await UserService.create({ ...mockUser });
    const { email, password } = mockUser;
    await agent.post('/api/v1/users/session').send({ email, password });

    const expected = {
      title: 'Nori and Tokio',
      description: 'the cutest pups',
    };
    const res = await request(app).post('/api/v1/secrets').send(expected);

    expect(res.body).toEqual({
      id: expect.any(String),
      ...expected,
      createdAt: expect.any(String),
    });
  });

  it('gets list of secerets', async () => {
    const expected = await Secret.findAll();
    const res = await request(app).get('/api/v1/secrets');

    expect(res.body).toEqual(expected);
  });
});
