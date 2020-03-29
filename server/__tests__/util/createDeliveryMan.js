import Deliveryman from '../../src/app/models/Deliveryman';
import factory from '../factories';

const createDeliveryMan = async () => {
  const deliverymanTemplate = await factory.attrs('Deliveryman');
  const deliveryman = await Deliveryman.create(deliverymanTemplate);
  return { deliveryman };
};

export default createDeliveryMan;
