import moment from 'moment';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Mail from '../../lib/Mail';

class ProblemController {
  async index(req, res) {
    const deliveryProblems = await DeliveryProblem.findAll({
      include: [
        {
          model: Delivery,
          as: 'delivery',
        },
      ],
    });
    return res.json(deliveryProblems);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const problem = await DeliveryProblem.findByPk(id);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    const delivery = await Delivery.findByPk(problem.delivery_id, {
      include: [{ model: Deliveryman, as: 'deliveryman' }],
    });
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    await delivery.update({
      canceled_at: moment().toDate(),
    });
    await problem.destroy();
    const { deliveryman } = delivery;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: `Delivery #${delivery.id} Cancelled`,
      text: `Dear ${deliveryman.name}, the delivery with recipient's product name ${delivery.product} has been canceled due to: ${problem.description}`,
    });
    return res.json({
      ok: true,
    });
  }
}

export default new ProblemController();