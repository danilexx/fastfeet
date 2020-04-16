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

export const getDeliveries = ({ id, currentPage }) =>
  api.get(`/deliveryman/${id}/deliveries?itemsPerPage=5&page=${currentPage}`);

export const getDoneDeliveries = ({ id, currentPage }) =>
  api.get(
    `/deliveryman/${id}/deliveries_done?itemsPerPage=5&page=${currentPage}`,
  );

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
