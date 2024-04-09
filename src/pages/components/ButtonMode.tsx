import { useEffect } from 'react';
import { IconButton } from '@mui/joy';
import { useColorScheme } from '@mui/joy';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
const ButtonMode = () => {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    const root = document.documentElement;

    if (mode === 'light') {
      root.classList.remove('dark');
    } else if (mode === 'dark') {
      root.classList.add('dark');
    }
  }, [mode]);

  return (
    <IconButton
      style={{ height: 40, width: 40, paddingLeft: 24, paddingRight: 24 }}
      className={`rounded-full`}
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}>
      {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ButtonMode;
