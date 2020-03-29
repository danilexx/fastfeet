import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "Obrigatorio",
  },
});
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required(),
});

export const recipientValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  cep: Yup.string().required(),
  street: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  complement: Yup.string().notRequired(),
  number: Yup.string().required(),
});
export const deliverymanValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
});

export const deliveryValidationSchema = Yup.object().shape({
  deliveryman_id: Yup.string().required(),
  recipient_id: Yup.string().required(),
  product: Yup.string().required(),
});
