import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:1234',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const getDeliveryman = deliverymanId =>
  api.get(`/deliverymans/${deliverymanId}`);

export const getDeliveries = deliverymanId =>
  api.get(`/deliveryman/${deliverymanId}/deliveries`);

export const getDoneDeliveries = deliverymanId =>
  api.get(`/deliveryman/${deliverymanId}/deliveries_done`);

export const createProblem = (deliveryId, description) =>
  api.post(`/delivery/${deliveryId}/problems`, {
    description,
  });
export const getProblems = deliveryId =>
  api.get(`/delivery/${deliveryId}/problems`);

export const uploadImage = formData => api.post('/files', formData);

export const updateDelivery = (deliverymanId, deliveryId, data) =>
  api.put(`/deliveryman/${deliverymanId}/deliveries/${deliveryId}`, data);

export const getDelivery = (deliverymanId, deliveryId) =>
  api.get(`/deliveryman/${deliverymanId}/deliveries/${deliveryId}`);
