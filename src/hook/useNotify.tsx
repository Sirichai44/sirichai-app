import React from 'react';
import { TypeOptions, ToastOptions, toast } from 'react-toastify';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const mode = localStorage.getItem('joy-mode');
const defaultOpt: ToastOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: true,
  theme: mode === 'light' ? 'light' : 'dark',
  closeButton: true,
  pauseOnHover: false,
  style: {
    position: 'absolute',
    right: 0,
    width: '240px',
    borderRadius: '10px'
  }
};

export const useNotify = (type: TypeOptions, content: string) => {
  const toastFunction = toast[type as keyof typeof toast] as (
    content: string,
    options?: ToastOptions
  ) => void;
  return toastFunction(content, defaultOpt);
};

export const useNotifyPromise = (content: string) => {
  return toast.loading(content, defaultOpt);
};

export const useNotifyResolve = (
  type: 'error' | 'success',
  id: React.ReactText,
  content: string
) => {
  return toast.update(id, {
    render: (
      <div>
        {type === 'success' ? (
          <CheckCircleRoundedIcon color="success" />
        ) : (
          <CancelRoundedIcon color="warning" />
        )}
        <span className="ml-2 capitalize ">{content}</span>
      </div>
    ),
    isLoading: false,
    autoClose: 1000,
    ...defaultOpt
  });
};
