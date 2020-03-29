import Sequelize from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class DeliverymanDeliveryDoneController {
  async index(req, res) {
    const { deliveryman_id } = req.params;
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id,
        end_date: { [Sequelize.Op.not]: null },
      },
      include: [{ model: Recipient, as: 'recipient' }],
    });
    return res.json(deliveries);
  }
}

export default new DeliverymanDeliveryDoneController();
