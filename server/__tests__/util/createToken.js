import factory from '../factories';
import User from '../../src/app/models/User';

const createToken = async () => {
  const userTemplate = await factory.attrs('User');
  const user = await User.create(userTemplate);
  return { token: user.generateToken() };
};

export default createToken;
