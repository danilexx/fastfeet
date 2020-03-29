const getStatus = delivery => {
  if (delivery.end_date) {
    return 2;
  } else if (delivery.start_date) {
    return 1;
  } else {
    return 0;
  }
};

export default getStatus;
