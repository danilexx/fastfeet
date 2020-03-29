import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';
// import User from '../../src/app/models/User';
import createDeliveryProblem from '../util/createDeliveryProblem';
import createDelivery from '../util/createDelivery';

describe('Delivery Problems', () => {
  beforeEach(async () => {
    await truncate();
  });
  const req = request(app);
  it('should be able to list problems', async () => {
    const { deliveryProblem, delivery } = await createDeliveryProblem();
    const response = await req.get(`/delivery/${delivery.id}/problems`);
    expect(response.status).toBe(200);
    expect(response.body[0].id).toBe(deliveryProblem.id);
  });
  it('should be able to create a problems', async () => {
    const { delivery } = await createDelivery();
    const response = await req.post(`/delivery/${delivery.id}/problems`).send({
      description: 'Carro quebrou',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});
