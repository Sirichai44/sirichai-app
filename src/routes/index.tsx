import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorPage from '@/pages/ErrorPage';
import SuspenseWrapper from './SuspenseWrapper';
import AuthProvider from './AuthProvider';
// import { LinearProgress } from '@mui/joy';
// import Loading from './Loading';

const App = lazy(() => import('@/App'));
const Home = lazy(() => import('@/pages/Home'));
const Root = lazy(() => import('@/pages/Root'));
const Blog = lazy(() => import('@/pages/Blog'));
const About = lazy(() => import('@/pages/About'));
const Certificate = lazy(() => import('@/pages/Certificate'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Setting = lazy(() => import('@/pages/Setting'));
const Assistant = lazy(() => import('@/pages/Assistant'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<SuspenseWrapper />}>
        <App />
      </Suspense>
    ),
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
          },
          {
            path: 'setting',
            element: (
              <AuthProvider>
                <Setting />
              </AuthProvider>
            )
          },
          {
            path: 'assistant',
            element: (
              <AuthProvider>
                <Assistant />
              </AuthProvider>
            )
          }
        ]
      },
      { path: '*', element: <ErrorPage /> } // 404 page
    ]
  }
]);

export default router;
