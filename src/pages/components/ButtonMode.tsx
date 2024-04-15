import { FC, useEffect } from 'react';
import { IconButton } from '@mui/joy';
import { useColorScheme } from '@mui/joy';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface ButtonModeProps {
  mobile?: boolean;
}

const ButtonMode: FC<ButtonModeProps> = ({ mobile }) => {
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
      style={{ height: 40, width: mobile ? 80 : 40, paddingLeft: 10, paddingRight: 10 }}
      className={`rounded-full`}
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}>
      {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
      {mobile && <span>{mode === 'light' ? 'Light' : 'Dark'}</span>}
    </IconButton>
  );
};

export default ButtonMode;
