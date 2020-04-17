import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Mail from '../../lib/Mail';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryController {
  async index(req, res) {
    const search = req.query.q || '';
    const page = req.query.page || '1';
    const filter = req.query.filter || 'all';
    const itemsPerPage = req.query.itemsPerPage || '10';
    const offset = (Number(page) - 1) * Number(itemsPerPage);
    const where = {
      product: {
        [Op.iLike]: `%${search}%`,
      },
    };
    const { rows: items, count } = await Delivery.findAndCountAll({
      offset,
      limit: Number(itemsPerPage),
      where,
      distinct: true,
      order: [
        ['end_date', 'DESC'],
        ['start_date', 'ASC'],
      ],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          include: [{ model: File, as: 'avatar' }],
        },
        { model: Recipient, as: 'recipient' },
        { model: File, as: 'signature' },
        ...(filter !== 'all'
          ? [{ model: DeliveryProblem, as: 'problems', required: true }]
          : []),
      ],
    });
    const pages = Math.ceil(count / Number(itemsPerPage));
    return res.json({
      items,
      pages,
      currentPage: Number(page),
    });
  }

  async show(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
      include: [{ model: Deliveryman, as: 'deliveryman' }],
    });
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number()
        .integer()
        .required(),
      deliveryman_id: Yup.number()
        .integer()
        .required(),
      signature_id: Yup.number()
        .integer()
        .notRequired(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const delivery = await Delivery.create(req.body);
    const deliveryman = await Deliveryman.findByPk(delivery.deliveryman_id);
    Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'New Delivery!',
      text: `Dear ${deliveryman.name}, you have a new product available to withdraw and deliver: ${delivery.product}`,
    });
    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number().integer(),
      deliveryman_id: Yup.number().integer(),
      signature_id: Yup.number().integer(),
      start_date: Yup.date(),
      end_date: Yup.date(),
      canceled_at: Yup.date(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const delivery = await Delivery.findByPk(req.params.id);
    const newDelivery = await delivery.update(req.body);
    return res.json(newDelivery);
  }

  async destroy(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);
    await delivery.destroy();
    return res.json({ ok: true });
  }
}

export default new DeliveryController();
