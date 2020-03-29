import { DeliveryModel } from "-/services/types";

const getStatus = (delivery: DeliveryModel) => {
  if (delivery.canceled_at) {
    return "cancelada";
  }
  if (delivery.end_date) {
    return "entregue";
  }
  if (delivery.start_date) {
    return "retirada";
  }
  return "pendente";
};
export default getStatus;
