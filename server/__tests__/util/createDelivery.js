import Delivery from '../../src/app/models/Delivery';
import createToken from './createToken';
import createDeliveryMan from './createDeliveryMan';
import createRecipient from './createRecipient';
import factory from '../factories';

const createDelivery = async (
  { delivery: defaultDelivery } = { delivery: {} }
) => {
  const { token } = await createToken();
  const { deliveryman } = await createDeliveryMan();
  const { recipient } = await createRecipient();
  const deliveryTemplate = await factory.attrs('Delivery', {
    deliveryman_id: deliveryman.id,
    recipient_id: recipient.id,
    ...defaultDelivery,
  });
  const delivery = await Delivery.create(deliveryTemplate);

  return { delivery, recipient, deliveryman, token };
};

export default createDelivery;
