const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
    await agent.post('/api/v1/users').send(mockUser);
    await agent.post('/api/v1/users/session').send(mockUser);

    const expected = {
      title: 'Nori and Tokio',
      description: 'the cutest pups',
    };
    const res = await agent.post('/api/v1/secrets').send(expected);

    expect(res.body).toEqual({
      id: expect.any(String),
      ...expected,
      createdAt: expect.any(String),
    });
  });

  it('gets list of secrets if user is signed in', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(mockUser);

    await agent.post('/api/v1/users/session').send(mockUser);

    const expected = { title: 'Nori', description: 'Tokio' };
    await agent.post('/api/v1/secrets').send(expected);

    const res = await request(app).get('/api/v1/secrets');

    expect(res.body).toEqual([
      { ...expected, id: expect.any(String), createdAt: expect.any(String) },
    ]);
  });
});
