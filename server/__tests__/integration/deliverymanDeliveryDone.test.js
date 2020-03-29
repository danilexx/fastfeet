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

describe('DeliveryMan Delivery Done', () => {
  beforeEach(async () => {
    await truncate();
  });
  const req = request(app);
  it('should be able to get delivery done with valid id and valid jwt', async () => {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const { token, delivery, deliveryman } = await createDelivery({
      delivery: {
        end_date: now,
      },
    });
    const response = await req
      .get(`/deliveryman/${deliveryman.id}/deliveries_done`)
      .set('authorization', `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body[0].id).toBe(delivery.id);
  });
  it('should not be able to get delivery not done', async () => {
    const { token, deliveryman } = await createDelivery();
    const response = await req
      .get(`/deliveryman/${deliveryman.id}/deliveries_done`)
      .set('authorization', `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
});
