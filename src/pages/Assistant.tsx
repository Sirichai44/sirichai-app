import { Button } from '@mui/joy';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import run from '@/hook/useAssistant';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearAssistant } from '@/store/reducers/authReducer';
import React from 'react';
import ReactDom from 'react-dom';
const Assistant = () => {
  const assistant = useAppSelector((state) => state.auth.assistant);
  console.log('assistant--->', assistant);

  const tex = ` **Display:**
  * 6.7-inch Super Retina XDR OLED 
  * 2778 x 1284 resolution (458 ppi)
  * ProMotion adaptive refresh rate (10- 120Hz)
  * HDR10, Dolby Vision, HLG support
  * Ceramic Shield front cover
  
  **Chip:**
  * Apple A15 Bionic chip
  
  **Camera System:**
  
  * Rear-facing triple-lens camera system:
      * 12MP wide-angle lens:  f/1.5 aperture, 26mm equivalent focal length, 1.9µm pixels
      * 12MP ultrawide-angle lens: f/1.8 aperture, 13mm equivalent focal length, 120° field of view
      * 12MP telephoto lens: f/2.8 aperture, 77mm equivalent focal length, 3x optical zoom, OIS
  * Cinematic mode video recording up to 4K60fps
  * ProRes video recording up to 4K30fps
  * LiDAR scanner
  
  ** Front-facing camera:**
  * 12MP TrueDepth camera
  * f/2.2 aperture
  * 23mm equivalent focal length
  * Portrait mode, Animoji, Memoji
  
  **Storage:**
  * 128GB, 256GB, 512GB, 1TB
  
  **Battery:**
  * Built-in rechargeable lithium-ion battery
  * MagSafe wireless charging (up to 15W)
  * Qi wireless charging (up to 7.5W)
  * Fast charging: up to 50% charge in 30 minutes (with 20W or higher charger)
  * All-day battery life (up to 28 hours of video playback)
  
  **Other Features:**
  * IP68 water resistance (up to 6 meters for 30 minutes)
  * 5G connectivity
  * Wi-Fi 6 (802.11ax)
  * Bluetooth 5.0
  * NFC
  * GPS
  * Barometer
  * Lightning port
  * Dual-SIM capability (eSIM and nano-SIM)
  
  **Dimensions and Weight:**
  - Height: 6.33 inches (16 0.8 mm)
  - Width: 3.07 inches (78.1 mm)
  * Depth: 0.30 inches (7.65 mm)
  * Weight: 8.5 ounces (240 grams)`;
  const markdown = `# Hi, *Pluto*!
**Dimensions and Weight:**
  *Height: 6.33 inches (16 0.8 mm)
    *Width: 3.07 inches (78.1 mm)
    *Depth: 0.30 inches (7.65 mm)
  * Weight: 8.5 ounces (240 grams)
  `;
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
        {/* {assistant.content.map((item, index) => (
          <div
            className="w-full h-auto mb-2 overflow-scroll leading-none"
            key={`genaratve-ai-${index}`}>
            
            <Markdown remarkPlugins={[remarkGfm]}>{item.text}</Markdown>
          </div>
        ))} */}
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </div>
    </div>
  );
};

export default Assistant;
