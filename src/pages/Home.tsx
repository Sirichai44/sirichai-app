import { useEffect, useRef, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/joy/Button';
import { Box, Grid, Step, StepIndicator, Stepper, useColorScheme, IconButton } from '@mui/joy';
// import { toast } from "react-toastify";
import * as Action from '@/store/actions/action';
import * as Type from '@/store/typings/type';
import TagFacesRoundedIcon from '@mui/icons-material/TagFacesRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import useResponsiveWidth from '@/hook/useResponsiveWidth';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
const Home = () => {
  const dispatch = useDispatch<Dispatch<Action.Action>>();
  const state = useSelector((state: Type.IStore) => state);
  const { md, lg, xl } = useResponsiveWidth();

  const { mode, setMode } = useColorScheme();
  const word = `%c
  ██████╗  ██╗███╗   ██╗ ██████╗       ██╗██████╗ 
  ██╔════╝ ██║████╗  ██║██╔═══██╗     ██╔╝╚════██╗
  ██║  ███╗██║██╔██╗ ██║██║   ██║    ██╔╝  █████╔╝
  ██║   ██║██║██║╚██╗██║██║   ██║    ╚██╗  ╚═══██╗
  ╚██████╔╝██║██║ ╚████║╚██████╔╝     ╚██╗██████╔╝
   ╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝       ╚═╝╚═════╝\n\nPlease like and follow me on github: https://github.com/Sirichai44
`;
  useEffect(() => {
    console.log(word, 'font-family:monospace;color:#1976d2;font-size:12px;');
    // dispatch({ type: "TEST_HELLO_SAGA", payload: "Hello World" });
    // dispatch({ type: "TEST_ACTION", payload: "Hello World" });
  }, []);

  const navLink = [
    { id: 'home', path: '/', name: 'Home', icon: <HomeRoundedIcon /> },
    {
      id: 'blog',
      path: '/blog',
      name: 'Blog',
      icon: <ModeCommentRoundedIcon />
    },
    {
      id: 'about',
      path: '/about',
      name: 'About',
      icon: <TagFacesRoundedIcon />
    },
    {
      id: 'certificate',
      path: '/certificate',
      name: 'Certificate',
      icon: <WorkspacePremiumRoundedIcon />
    }
  ];

  const names = ['Software Developer', '<Front End />'];
  const [arrayIndex, setArrayIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentword, setCurrentword] = useState('');

  const direction = useRef('forward');
  useEffect(() => {
    const interval = setInterval(() => {
      //check direction
      if (direction.current === 'forward') {
        //check if the word is finished
        if (wordIndex === names[arrayIndex].length) {
          direction.current = 'backward';
        } else {
          //add the next letter
          setWordIndex((prevIndex) => prevIndex + 1);
          setCurrentword((prevWord) => prevWord + names[arrayIndex][wordIndex]);
        }
      } else {
        //check if the word is finished
        if (wordIndex === 0) {
          direction.current = 'forward';
          setArrayIndex((prevIndex) => (prevIndex + 1) % names.length);
        } else {
          //remove the last letter
          setWordIndex((prevIndex) => prevIndex - 1);
          setCurrentword((prevWord) => prevWord.slice(0, prevWord.length - 1));
        }
      }
    }, 150);

    return () => clearInterval(interval);
  }, [wordIndex, arrayIndex]);

  useEffect(() => {
    const root = document.documentElement;

    if (mode === 'light') {
      root.classList.remove('dark');
    } else if (mode === 'dark') {
      root.classList.add('dark');
    }
  }, [mode]);
  return (
    <div className="box-border flex items-center justify-center w-full h-screen min-h-full">
      <div className="w-4/6 h-4/6">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ flexGrow: 1, height: '100%', display: 'flex', border: '1px solid red' }}>
          <Grid
            xs={2}
            sm={8}
            md={12}
            style={{
              display: 'flex flex-col',
              border: '1px solid red'
            }}>
            <div className="flex flex-col h-full">
              <div className={`${xl ? 'w-9/12' : ''} border border-green-500`}>
                <div>
                  <span className="text-lg font-bold">Hi, My name is</span>
                </div>

                <div>
                  <span className="text-2xl font-bold">Sirichai Khuadkaewmanee</span>
                </div>

                <div style={{ minHeight: 40 }}>
                  <span className="text-4xl font-bold blinking-cursor">
                    {currentword !== '' ? currentword : ' '}
                  </span>
                </div>

                <div>
                  <span>
                    I'm a software developer who is passionate about making web applications. I'm
                    currently working as a front-end developer at a company in Bangkok, Thailand. I
                    have a lot of experience in web development and I'm constantly learning new
                    things to keep up with the latest technologies.
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                {navLink.map((item) => (
                  <NavLink
                    className={({ isActive }) =>
                      classNames(
                        // 'px-2 py-2 m-4 rounded-3xl border flex flex-row items-center text-lg text-gray-800 dark:text-gray-400 hover:bg-white hover:border-gray-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800',
                        'px-4 pt-2 pb-1 m-4 border-b-4  flex flex-row items-center text-sm text-gray-800 dark:text-gray-400 hover:border-b-4 hover:border-gray-200 dark:hover:border-zinc-800',
                        isActive
                          ? // ? 'bg-white drop-shadow-sm dark:bg-zinc-800 border-gray-200 dark:border-zinc-700'
                            'border-b-4 border-gray-400 drop-shadow-sm'
                          : 'border-transparent'
                      )
                    }
                    key={item.id}
                    to={item.path}
                    id={item.id}
                    unstable_viewTransition>
                    {/* {item.icon} */}
                    <span>{item.name}</span>
                  </NavLink>
                ))}

                <IconButton
                  style={{ height: 40, width: 40 }}
                  // className="p-2 m-4 bg-transparent border-none rounded-full hover:bg-transparent"
                  onClick={() => {
                    setMode(mode === 'light' ? 'dark' : 'light');
                  }}>
                  {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </div>
              <div className="flex justify-end h-full border border-blue-500">
                <div className="w-full border border-red-300">
                  <span className="text-2xl font-bold">icon</span>
                </div>

                <div className="flex flex-col justify-end">
                  <span className="text-sm">Born in 1999</span>
                  <span className="text-sm">in Bangkok, Thailand</span>
                </div>
              </div>
            </div>
          </Grid>

          {/* <Grid
            xs={2}
            sm={2}
            md={4}
            style={{
              display: 'flex',
              border: '1px solid red'
            }}>
            <div>
              {navLink.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    classNames(
                      'px-2 py-2 mb-4 rounded-3xl border flex flex-row items-center text-lg text-gray-800 dark:text-gray-400 hover:bg-white hover:border-gray-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800',
                      isActive
                        ? 'bg-white drop-shadow-sm dark:bg-zinc-800 border-gray-200 dark:border-zinc-700'
                        : 'border-transparent'
                    )
                  }
                  key={item.id}
                  to={item.path}
                  id={item.id}
                  unstable_viewTransition>
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
