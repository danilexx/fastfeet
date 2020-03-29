import request from 'supertest';
import moment from 'moment';
import app from '../../src/app';
// import factory from '../factories';
import truncate from '../util/truncate';
// import User from '../../src/app/models/User';
// import createToken from '../util/createToken';
// import createDeliveryMan from '../util/createDeliveryMan';
// import createRecipient from '../util/createRecipient';
import createDelivery from '../util/createDelivery';

describe('DeliveryMan Delivery', () => {
  beforeEach(async () => {
    await truncate();
  });
  const req = request(app);
  it('should be able to get delivery with valid id and valid jwt', async () => {
    const { token, delivery, deliveryman } = await createDelivery();
    const response = await req
      .get(`/deliveryman/${deliveryman.id}/deliveries`)
      .set('authorization', `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body[0].id).toBe(delivery.id);
  });
  it('should not be able to get finished delivery', async () => {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const { token, deliveryman } = await createDelivery({
      delivery: {
        end_date: now,
      },
    });
    const response = await req
      .get(`/deliveryman/${deliveryman.id}/deliveries`)
      .set('authorization', `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
  it('should not be able to finish an delivery without signature_id', async () => {
    const { token, deliveryman, delivery } = await createDelivery();
    const response = await req
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`)
      .set('authorization', `bearer ${token}`)
      .send({
        end_date: new Date().toISOString(),
      });
    expect(response.status).toBe(400);
  });
  it('should not be able to finish an delivery without start_date', async () => {
    const { token, deliveryman, delivery } = await createDelivery();
    const response = await req
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`)
      .set('authorization', `bearer ${token}`)
      .send({
        end_date: new Date().toISOString(),
        signature_id: 0,
      });
    expect(response.status).toBe(400);
  });
  it('should be able to finish an delivery', async () => {
    const { token, deliveryman, delivery } = await createDelivery({
      delivery: {
        start_date: moment()
          .set('hour', 9)
          .toDate(),
      },
    });
    const response = await req
      .put(`/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`)
      .set('authorization', `bearer ${token}`)
      .send({
        end_date: moment()
          .set('hour', 10)
          .toDate(),
        signature_id: 0,
      });
    expect(response.status).toBe(200);
  });
});
