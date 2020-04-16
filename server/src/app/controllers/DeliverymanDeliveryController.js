import * as Yup from 'yup';
import moment from 'moment';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliverymanDeliveryController {
  async index(req, res) {
    const { deliveryman_id } = req.params;
    const page = req.query.page || '1';
    const itemsPerPage = req.query.itemsPerPage || '10';
    const offset = (Number(page) - 1) * Number(itemsPerPage);

    const { rows: items, count } = await Delivery.findAndCountAll({
      offset,
      limit: itemsPerPage,
      where: { deliveryman_id, canceled_at: null, end_date: null },
      include: [{ model: Recipient, as: 'recipient' }],
    });
    return res.json({ items, pages: Math.ceil(count / Number(itemsPerPage)) });
  }

  async show(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
      include: [
        { model: Deliveryman, as: 'deliveryman' },
        { model: Recipient, as: 'recipient' },
      ],
    });
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      end_date: Yup.date(),
      canceled_at: Yup.date(),
      signature_id: Yup.number().integer(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, deliveryman_id } = req.params;
    if (req.body.start_date) {
      const currentTime = moment().hour();
      if (currentTime > 18) {
        return res.status(400).json({
          error: 'Você não pode retirar encomendas depois das 18 horas',
        });
      }
      if (currentTime < 8) {
        return res.status(400).json({
          error: 'Você não pode retirar encomendas antes das 8 horas',
        });
      }

      const todayDate = moment()
        .set('hour', 0)
        .set('minutes', 0)
        .set('milliseconds', 0);
      const deliveriesMadeToday = await Delivery.count({
        where: {
          start_date: {
            [Op.gte]: todayDate,
          },
        },
      });
      if (deliveriesMadeToday >= 5) {
        return res.status(400).json({
          error: 'Você não pode retirar/entregar mais de 5 encomendas por dia',
        });
      }
    }
    const delivery = await Delivery.findByPk(id);
    if (Number(delivery.deliveryman_id) !== Number(deliveryman_id)) {
      return res.status(400).json({
        error: 'Esta encomenda não pertence a você',
      });
    }
    if (req.body.end_date) {
      if (req.body.signature_id === null) {
        return res.status(400).json({
          error:
            'Você deve mandar uma assinatura junto com a data de finalização',
        });
      }
      // if (delivery.start_date === null) {
      //   return res.status(400).json({
      //     error: 'You cant finish a delivery that hasn been withdrawned yet',
      //   });
      // }
    }
    const updatedDelivery = await delivery.update(req.body);
    return res.json(updatedDelivery);
  }
}

export default new DeliverymanDeliveryController();
