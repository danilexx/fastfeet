export interface UserModel {
  token: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface DeliveryManModel {
  id: number;
  name: string;
  email: string;
  avatar_id: null | number;
  avatar: null | {
    path: string;
  };
}

export interface RecipientModel {
  id: number;
  name: string;
  street: number;
  cep: string;
  complement: null | string;
  state: string;
  city: string;
  number: number;
  created_at: string;
  updated_at: string;
}

export interface DeliveryModel {
  id: number;
  product: string;
  recipient_id: number;
  deliveryman_id: number;
  signature_id: null | number;
  start_date: null | string;
  canceled_at: null | string;
  end_date: null | string;
  created_at: string;
  update_at: string;
  deliveryman: DeliveryManModel;
  recipient: RecipientModel;
  signature: null | {
    path: string;
  };
}

export interface ProblemModel {
  id: number;
  delivery_id: number;
  delivery: DeliveryModel;
  description: string;
}
