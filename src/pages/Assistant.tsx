import { Button } from '@mui/joy';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';

import run from '@/hook/useAssistant';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearAssistant } from '@/store/reducers/authReducer';
import { useEffect, useState } from 'react';

const Assistant = () => {
  const assistant = useAppSelector((state) => state.auth.assistant);

  return (
    <div className="flex items-center justify-center w-full h-full p-10 overflow-auto">
      <div className="flex flex-col">
        <Button size="sm" onClick={run}>
          run
        </Button>
        <Button size="sm" onClick={() => useAppDispatch(clearAssistant())}>
          clear
        </Button>
      </div>
      <div
        className="w-4/6 h-full px-2 border border-red-400"
        style={{
          fontSize: '8px',
          height: '700px',
          maxHeight: '700px',
          overflow: 'scroll'
        }}>
        <SmartToyRoundedIcon />

        {/* <span>{textShow}</span> */}
      </div>
    </div>
  );
};

export default Assistant;
