import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async index(req, res) {
    const { delivery_id } = req.params;
    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id },
    });
    return res.json(deliveryProblems);
  }

  async show(req, res) {
    const deliveryProblem = await DeliveryProblem.findByPk(req.params.id, {
      include: [{ model: Delivery, as: 'delivery' }],
    });
    return res.json(deliveryProblem);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { delivery_id } = req.params;
    const { description } = req.body;
    const delivery = await Delivery.findByPk(delivery_id);
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    const deliveryProblem = await DeliveryProblem.create({
      description,
      delivery_id,
    });
    return res.json(deliveryProblem);
  }
}

export default new DeliveryProblemController();
