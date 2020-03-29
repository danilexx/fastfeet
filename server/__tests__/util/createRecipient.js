import factory from '../factories';
import Recipient from '../../src/app/models/Recipient';

const createRecipient = async () => {
  const recipientTemplate = await factory.attrs('Recipient');
  const recipient = await Recipient.create(recipientTemplate);
  return { recipient };
};

export default createRecipient;
