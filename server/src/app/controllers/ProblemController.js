import moment from 'moment';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class ProblemController {
  async index(req, res) {
    const page = req.query.page || '1';
    const itemsPerPage = req.query.itemsPerPage || '10';
    const offset = (Number(page) - 1) * Number(itemsPerPage);
    const items = await DeliveryProblem.findAll({
      offset,
      limit: Number(itemsPerPage),
      include: [
        {
          model: Delivery,
          as: 'delivery',
        },
      ],
    });
    const { count } = await DeliveryProblem.findAndCountAll();
    const pages = Math.ceil(count / Number(itemsPerPage));
    return res.json({
      items,
      pages,
      currentPage: Number(page),
    });
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
    await Queue.add(CancellationMail.key, {
      delivery,
      problem,
      deliveryman,
    });
    return res.json({
      ok: true,
    });
  }
}

export default new ProblemController();
