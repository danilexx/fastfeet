import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';
// import User from '../../src/app/models/User';
import createToken from '../util/createToken';
import createDeliveryMan from '../util/createDeliveryMan';
import createRecipient from '../util/createRecipient';
import createDelivery from '../util/createDelivery';

describe('Delivery', () => {
  beforeEach(async () => {
    await truncate();
  });
  const req = request(app);
  it('should be able to create an delivery with valid deliveryman and with valid jwt', async () => {
    const { token } = await createToken();
    const { deliveryman } = await createDeliveryMan();
    const { recipient } = await createRecipient();
    const delivery = await factory.attrs('Delivery', {
      deliveryman_id: deliveryman.id,
      recipient_id: recipient.id,
    });
    const response = await req
      .post('/deliveries')
      .set('authorization', `bearer ${token}`)
      .send(delivery);
    expect(response.status).toBe(200);
  });
  it('should be able to list deliveries with valid jwt', async () => {
    const { token, delivery } = await createDelivery();
    const response = await req
      .get('/deliveries')
      .set('authorization', `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body[0].id).toBe(delivery.id);
  });
  it('should be able to get delivery with valid id and valid jwt', async () => {
    const { token, delivery } = await createDelivery();
    const response = await req
      .get(`/deliveries/${delivery.id}`)
      .set('authorization', `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(delivery.id);
  });
  it('should be able to delete delivery with valid id and valid jwt', async () => {
    const { token, delivery } = await createDelivery();
    const response = await req
      .delete(`/deliveries/${delivery.id}`)
      .set('authorization', `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
  });
  it('should be able to update existing delivery with valid id and valid jwt', async () => {
    const { token, delivery } = await createDelivery();
    const response = await req
      .put(`/deliveries/${delivery.id}`)
      .set('authorization', `bearer ${token}`)
      .send({ product: 'product1' });
    expect(response.status).toBe(200);
    expect(response.body.product).toBe('product1');
  });
});
