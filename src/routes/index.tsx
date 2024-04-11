import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import ErrorPage from '@/pages/ErrorPage';
import SuspenseWrapper from './suspenseWrapper';
import Loading from './Loading';

const App = lazy(() => import('@/App'));
const Home = lazy(() => import('@/pages/Home'));
const Root = lazy(() => import('@/pages/Root'));
const Blog = lazy(() => import('@/pages/Blog'));
const About = lazy(() => import('@/pages/About'));
const Certificate = lazy(() => import('@/pages/Certificate'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Home /> },
      {
        path: '/auth/',
        element: <SuspenseWrapper />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> }
        ]
      },
      {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'blog',
            element: <Blog />
          },
          {
            path: 'about',
            element: <About />
          },
          {
            path: 'certificate',
            element: <Certificate />
          }
        ]
      }
    ]
  }
]);

export default router;
