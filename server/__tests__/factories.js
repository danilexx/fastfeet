import faker from 'faker';
import { factory } from 'factory-girl';
import User from '../src/app/models/User';
import Recipient from '../src/app/models/Recipient';
import Deliveryman from '../src/app/models/Deliveryman';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Recipient', Recipient, {
  name: faker.name.findName(),
  cep: faker.address.zipCode(),
  street: faker.address.streetName(),
  city: faker.address.city(),
  state: faker.address.state(),
  number: faker.random.number(100),
  complement: faker.address.stateAbbr(),
});
factory.define('Deliveryman', Deliveryman, {
  name: faker.name.findName(),
  email: faker.internet.email(),
});
factory.define('Delivery', Deliveryman, {
  product: faker.commerce.productName(),
});

export default factory;
