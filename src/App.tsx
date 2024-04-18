import { Outlet } from 'react-router-dom';
import { useColorScheme } from '@mui/joy';
import { useEffect } from 'react';

function App() {
  const { mode } = useColorScheme();
  useEffect(() => {
    const root = document.documentElement;

    if (mode === 'light') {
      root.classList.remove('dark');
    } else if (mode === 'dark') {
      root.classList.add('dark');
    }
  }, [mode]);

  return <Outlet />;
}

export default App;
