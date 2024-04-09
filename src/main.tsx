import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'; //redux

import { ToastContainer } from 'react-toastify'; //toastify

import '@/styles/tailwind.css';
import router from '@/routes';
import store from './store/store';

import 'react-toastify/dist/ReactToastify.css';
import { CssVarsProvider } from '@mui/joy';
import theme from './styles/theme';
import './styles/global.css';
import './styles/tailwind.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <RouterProvider router={router} />
      <ToastContainer />
    </CssVarsProvider>
  </Provider>
);
