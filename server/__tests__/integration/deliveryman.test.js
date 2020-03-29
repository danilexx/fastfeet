import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';
import createToken from '../util/createToken';
import createDeliveryMan from '../util/createDeliveryMan';

describe('Deliveryman', () => {
  beforeEach(async () => {
    await truncate();
  });
  const req = request(app);
  it('should be able to create an deliveryman with valid jwt', async () => {
    const { token } = await createToken();
    const deliveryman = await factory.attrs('Deliveryman');
    const response = await req
      .post('/deliverymans')
      .set('authorization', `bearer ${token}`)
      .send(deliveryman);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
  it('should not be able to create an deliveryman with duplicated email', async () => {
    const { token } = await createToken();
    const deliveryman = await factory.attrs('Deliveryman');

    await req
      .post('/deliverymans')
      .set('authorization', `bearer ${token}`)
      .send(deliveryman);
    const response = await req
      .post('/deliverymans')
      .set('authorization', `bearer ${token}`)
      .send(deliveryman);
    expect(response.status).toBe(400);
  });
  it('should not be able to create an deliveryman with invalid input', async () => {
    const { token } = await createToken();
    const response = await req
      .post('/deliverymans')
      .set('authorization', `bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
  });
  it('should be able to list deliverymans with valid jwt', async () => {
    const { token } = await createToken();
    const response = await req
      .get('/deliverymans')
      .set('authorization', `bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('should be able to update an deliveryman with valid jwt', async () => {
    const { token } = await createToken();
    const { deliveryman } = await createDeliveryMan();
    const deliverymanUpdateTemplate = await factory.attrs('Deliveryman');
    const response = await req
      .put(`/deliverymans/${deliveryman.id}`)
      .set('authorization', `bearer ${token}`)
      .send(deliverymanUpdateTemplate);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(deliverymanUpdateTemplate.name);
  });
  it('should be able to delete an created deliveryman with valid jwt', async () => {
    const { token } = await createToken();
    const { deliveryman } = await createDeliveryMan();
    const response = await req
      .delete(`/deliverymans/${deliveryman.id}`)
      .set('authorization', `bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('should be able to get an created deliveryman with valid jwt', async () => {
    const { token } = await createToken();
    const { deliveryman } = await createDeliveryMan();
    const response = await req
      .get(`/deliverymans/${deliveryman.id}`)
      .set('authorization', `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(deliveryman.name);
  });
  it('should not be able to update an deliveryman with invalid information', async () => {
    const { token } = await createToken();
    const { deliveryman } = await createDeliveryMan();
    const response = await req
      .put(`/deliverymans/${deliveryman.id}`)
      .set('authorization', `bearer ${token}`)
      .send({ avatar_id: '' });
    expect(response.status).toBe(400);
  });
});
