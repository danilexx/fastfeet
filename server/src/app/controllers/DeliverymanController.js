import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const hasSearch = req.query.q;
    let deliverymans;
    if (hasSearch) {
      deliverymans = await Deliveryman.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.q}%`,
          },
        },
        include: [{ model: File, as: 'avatar' }],
      });
    } else {
      deliverymans = await Deliveryman.findAll({
        include: [{ model: File, as: 'avatar' }],
      });
    }
    return res.json(deliverymans);
  }

  async show(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      include: [{ model: File, as: 'avatar' }],
    });
    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number()
        .integer()
        .notRequired(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const exists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (exists) {
      return res.status(400).json({ error: 'Deliveryman already exists.' });
    }

    const { id, email, avatar_id, name } = await Deliveryman.create(req.body);

    return res.json({ id, email, avatar_id, name });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number().integer(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const deliveryman = await Deliveryman.findByPk(req.params.id);
    if (!deliveryman) {
      return res.status(404).json({
        error: 'Delivery man not found',
      });
    }
    const { id, name, email, avatar_id } = await deliveryman.update(req.body);
    return res.json({ id, name, email, avatar_id });
  }

  async destroy(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);
    await deliveryman.destroy();
    return res.json({ ok: true });
  }
}

export default new DeliverymanController();
