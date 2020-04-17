import { toast } from "react-toastify";

const showError = err => {
  if (err.response?.data?.error) {
    const error = err.response?.data?.error;
    toast.error(error);
  }
};

export default showError;
