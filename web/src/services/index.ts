import axios from "axios";
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

const getAuth = () => ({
  headers: { Authorization: `Bearer ${cookie.load("token")}` },
});

export const createSession = (data: LoginModel) =>
  api.post<UserModel>("/sessions", data, getAuth());

export const uploadImage = (form: FormData) =>
  api.post<{ path: string; id: number }>("/files", form, getAuth());

// ---- Requisições da Delivery

export const createDelivery = (data: {
  deliveryman_id: number;
  recipient_id: number;
  product: string;
}) => api.post<DeliveryModel>(`/deliveries`, data, getAuth());

export const getDeliveries = ({
  search,
  filter,
  page,
}: {
  search: string;
  filter: string;
  page: number;
}) =>
  api.get<{ items: DeliveryModel[]; currentPage: number; pages: number }>(
    `/deliveries?q=${search}&filter=${filter}&page=${page}`,
    getAuth()
  );

export const updateDelivery = (deliveryId: number) => (
  data: Partial<DeliveryModel>
) => api.put(`deliveries/${deliveryId}`, data, getAuth());

export const deleteDelivery = (deliveryId: number) =>
  api.delete(`/deliveries/${deliveryId}`, getAuth());

export const cancelDelivery = (problemId: number) =>
  api.delete(`/problems/${problemId}/cancel-delivery`, getAuth());

// ---- Requisições do Deliveryman

export const createDeliveryman = (data: DeliveryManModel) =>
  api.post<DeliveryManModel>(`/deliverymans`, data, getAuth());

export const getDeliverymans = ({
  search,
  page,
  itemsPerPage = 10,
}: {
  search: string;
  page: number;
  itemsPerPage?: number;
}) =>
  api.get<{ items: DeliveryManModel[]; currentPage: number; pages: number }>(
    `/deliverymans?q=${search}&page=${page}&=itemsPerPage=${itemsPerPage}`,
    getAuth()
  );

export const updateDeliveryman = (deliverymanId: number) => (
  data: DeliveryManModel
) =>
  api.put<DeliveryManModel>(`deliverymans/${deliverymanId}`, data, getAuth());

export const deleteDeliveryMan = (deliverymanId: number) =>
  api.delete(`/deliverymans/${deliverymanId}`, getAuth());

// ---- Requisições do Recipient

export const createRecipient = (data: RecipientModel) =>
  api.post<RecipientModel>("/recipients", data, getAuth());

export const getRecipients = ({
  search,
  page,
  itemsPerPage = 10,
}: {
  search: string;
  page: number;
  itemsPerPage?: number;
}) =>
  api.get<{ items: RecipientModel[]; currentPage: number; pages: number }>(
    `/recipients?q=${search}&page=${page}&itemsPerPage=${itemsPerPage}`,
    getAuth()
  );
export const updateRecipient = (recipientId: number) => (
  data: RecipientModel
) => api.put<RecipientModel>(`/recipients/${recipientId}`, data, getAuth());

export const deleteRecipient = (recipientId: number) =>
  api.delete(`/recipients/${recipientId}`, getAuth());

export const getProblems = page =>
  api.get<{ items: ProblemModel[]; pages: number; currentPage: number }>(
    `/problems?page=${page}`,
    getAuth()
  );
