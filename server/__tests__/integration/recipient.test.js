import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';
// import User from '../../src/app/models/User';
import createToken from '../util/createToken';

describe('Recipient', () => {
  beforeEach(async () => {
    await truncate();
  });
  const req = request(app);
  it('should be able to create an recipient with valid jwt', async () => {
    const { token } = await createToken();
    const recipient = await factory.attrs('Recipient');
    const response = await req
      .post('/recipients')
      .set('authorization', `bearer ${token}`)
      .send(recipient);
    expect(response.status).toBe(200);
  });
});
