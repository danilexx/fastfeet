import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const {
      deliveryman: { name, email },
      delivery,
      problem: { description },
    } = data;
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: `Delivery #${delivery.id} Cancelled`,
      text: `Dear ${name}, the delivery with recipient's product name ${delivery.name} has been canceled due to: ${description}`,
    });
  }
}

export default new CancellationMail();
