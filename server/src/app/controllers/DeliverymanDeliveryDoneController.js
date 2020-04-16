import Sequelize from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class DeliverymanDeliveryDoneController {
  async index(req, res) {
    const { deliveryman_id } = req.params;
    const page = req.query.page || '1';
    const itemsPerPage = req.query.itemsPerPage || '10';
    const offset = (Number(page) - 1) * Number(itemsPerPage);

    const { rows: items, count } = await Delivery.findAndCountAll({
      offset,
      limit: itemsPerPage,
      where: {
        deliveryman_id,
        end_date: { [Sequelize.Op.not]: null },
      },
      include: [{ model: Recipient, as: 'recipient' }],
    });
    return res.json({ items, pages: Math.ceil(count / Number(itemsPerPage)) });
  }
}

export default new DeliverymanDeliveryDoneController();
