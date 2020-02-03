import * as Yup from "yup";
import Recipient from "../models/Recipient";

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: "Validations fails" });
    }
    const { street, number, complement, state, city, cep } = req.body;

    const newRecipient = await Recipient.create({
      street,
      number,
      complement,
      state,
      city,
      cep
    });

    return res.json(newRecipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      cep: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ erro: "Validations fails" });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(401).json({ message: "Usuário não existe" });
    }

    const {
      street,
      number,
      complement,
      state,
      city,
      cep
    } = await recipient.update(req.body);

    return res.json({ street, number, complement, state, city, cep });
  }
}

export default new RecipientController();
