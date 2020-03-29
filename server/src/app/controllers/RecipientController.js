import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cep: Yup.string().required(),
      street: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      complement: Yup.string().notRequired(),
      number: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      name,
      cep,
      street,
      city,
      state,
      number,
      complement,
    } = await Recipient.create(req.body);
    return res.json({ id, name, cep, street, city, state, number, complement });
  }

  async index(req, res) {
    const hasSearch = req.query.q;
    let recipients;
    if (hasSearch) {
      recipients = await Recipient.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.q}%`,
          },
        },
      });
    } else {
      recipients = await Recipient.findAll();
    }
    return res.json(recipients);
  }

  async destroy(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);
    await recipient.destroy();
    return res.json({ ok: true });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cep: Yup.string().required(),
      street: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      complement: Yup.string().notRequired(),
      number: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const recipient = await Recipient.findByPk(req.params.id);
    if (!recipient) {
      return res.status(404).json({
        error: 'Recipient not found',
      });
    }
    const { id, name, email, avatar_id } = await recipient.update(req.body);
    return res.json({ id, name, email, avatar_id });
  }
}

export default new RecipientController();
