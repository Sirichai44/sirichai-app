import { Outlet } from 'react-router-dom';
import { useColorScheme } from '@mui/joy';
import { useEffect, useState } from 'react';
import useCurrentUser from './hook/useCurrentUser';
import useNavigateTo from './hook/useNavigateTo';
import { useNotify } from './hook/useNotify';
import { useOperatingSystem, usePosition } from './hook/useSystem';

function App() {
  const { mode } = useColorScheme();
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigateTo();
  useEffect(() => {
    const initialState = async () => {
      const { isExpired } = await useCurrentUser();
      await usePosition();
      await useOperatingSystem();
      // await useWeather();
      if (isExpired) {
        useNotify('warning', 'Token expired, please login again');
        setTimeout(() => {
          navigateTo('/auth/login');
        }, 1000);
      }
    };

    Promise.all([initialState()]).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (mode === 'light') {
      root.classList.remove('dark');
    } else if (mode === 'dark') {
      root.classList.add('dark');
    }
  }, [mode]);

  return loading ? null : <Outlet />;
}

export default App;
