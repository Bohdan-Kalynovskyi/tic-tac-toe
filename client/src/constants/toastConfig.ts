import { toast, ToastOptions } from 'react-toastify';

export const TOAST_CONFIG: ToastOptions = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 1000 * 5,
  closeButton: false,
  hideProgressBar: true,
  pauseOnHover: true,
  pauseOnFocusLoss: false,
  closeOnClick: true,
  className: 'toast-notification',
};

export const TOAST_CLOSED_ORDER_CONFIG: ToastOptions = {
  ...TOAST_CONFIG,
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 1000 * 7,
  closeButton: true,
  hideProgressBar: false,
};
