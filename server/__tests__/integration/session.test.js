import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';
import User from '../../src/app/models/User';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });
  const req = request(app);
  it('should be able to create a session', async () => {
    const userTemplate = await factory.attrs('User');
    const user = await User.create(userTemplate);

    const response = await req.post('/sessions').send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
