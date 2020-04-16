import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import cookie from "react-cookies";
import {
  UserModel,
  LoginModel,
  DeliveryModel,
  DeliveryManModel,
  RecipientModel,
  ProblemModel,
} from "./types";

export const api = axios.create({
  baseURL: "http://localhost:1234",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(cookie.load("token")
      ? { Authorization: `Bearer ${cookie.load("token")}` }
      : {}),
  },
});
type get = <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
) => Promise<R>;
type post = <T = any, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => Promise<R>;

type Method = get & post;
const selectApiMethod = (method: string = "get"): Method => {
  switch (method) {
    case "get": {
      return api.get;
    }
    case "post": {
      return api.post;
    }
    case "put": {
      return api.put;
    }
    case "delete": {
      return api.delete;
    }
    default:
      return api.get;
  }
};
const createAxiosRequest = <T, D = any>(
  url: string,
  method: string = "get"
) => {
  const fn = (
    data?: D,
    extraConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const baseConfig = {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    };
    const config = { ...baseConfig, ...extraConfig };
    return data
      ? selectApiMethod(method)(url, data, config)
      : selectApiMethod(method)(url, config);
  };
  fn.url = url;
  return fn;
};

const getAuth = () => ({
  headers: { Authorization: `Bearer ${cookie.load("token")}` },
});

export const createSession = createAxiosRequest<UserModel, LoginModel>(
  "/sessions",
  "post"
);

export const uploadImage = createAxiosRequest<
  { path: string; id: number },
  FormData
>(`/files`, "post");

// ---- Requisições da Delivery

export const createDelivery = createAxiosRequest<
  DeliveryModel,
  {
    deliveryman_id: number;
    recipient_id: number;
    product: string;
  }
>(`/deliveries`, "post");

export const getDeliveries = ({
  search,
  filter,
  page,
}: {
  search: string;
  filter: string;
  page: number;
}) =>
  createAxiosRequest<
    { items: DeliveryModel[]; currentPage: number; pages: number },
    any
  >(`/deliveries?q=${search}&filter=${filter}&page=${page}`, "get");

export const updateDelivery = (deliveryId: number) =>
  createAxiosRequest<DeliveryModel, Partial<DeliveryModel>>(
    `deliveries/${deliveryId}`,
    "put"
  );

export const deleteDelivery = (deliveryId: number) =>
  createAxiosRequest(`/deliveries/${deliveryId}`, "delete");

export const cancelDelivery = (problemId: number) =>
  createAxiosRequest(`/problems/${problemId}/cancel-delivery`, "delete");

// ---- Requisições do Deliveryman

export const createDeliveryman = createAxiosRequest<
  DeliveryManModel,
  DeliveryManModel
>(`/deliverymans`, "post");

export const getDeliverymans = ({
  search,
  page,
}: {
  search: string;
  page: number;
}) =>
  createAxiosRequest<
    { items: DeliveryManModel[]; currentPage: number; pages: number },
    any
  >(`/deliverymans?q=${search}&page=${page}`, "get");

export const updateDeliveryman = (deliverymanId: number) =>
  createAxiosRequest<DeliveryManModel, DeliveryManModel>(
    `deliverymans/${deliverymanId}`,
    "put"
  );

export const deleteDeliveryMan = (deliverymanId: number) =>
  createAxiosRequest(`/deliverymans/${deliverymanId}`, "delete");

// ---- Requisições do Recipient

export const createRecipient = createAxiosRequest<
  RecipientModel,
  RecipientModel
>(`/recipients`, "post");

export const getRecipients = ({
  search,
  page,
}: {
  search: string;
  page: number;
}) =>
  createAxiosRequest<
    { items: RecipientModel[]; currentPage: number; pages: number },
    any
  >(`/recipients?q=${search}&page=${page}`, "get");

export const updateRecipient = (recipientId: number) =>
  createAxiosRequest<RecipientModel, RecipientModel>(
    `recipients/${recipientId}`,
    "put"
  );

export const deleteRecipient = (recipientId: number) =>
  createAxiosRequest(`/recipients/${recipientId}`, "delete");

export const getProblems = page =>
  api.get<{ items: ProblemModel[]; pages: number; currentPage: number }>(
    `/problems?page=${page}`,
    getAuth()
  );
