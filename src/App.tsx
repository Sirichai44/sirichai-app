import { Outlet } from 'react-router-dom';
import { useColorScheme } from '@mui/joy';
import { useEffect, useState } from 'react';
import useCurrentUser from './hook/useCurrentUser';

function App() {
  const { mode } = useColorScheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialState = async () => {
      await useCurrentUser();
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
