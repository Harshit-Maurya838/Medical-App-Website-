import toast from "react-hot-toast";

export const showError = (message) =>
  toast.error(message, { duration: 3000 });

export const showSuccess = (message) =>
  toast.success(message, { duration: 2500 });
