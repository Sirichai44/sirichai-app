import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, IconButton } from '@mui/joy';
// import { toast } from "react-toastify";
import * as Action from '@/store/actions/action';
import * as Type from '@/store/typings/type';

import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import useResponsiveWidth from '@/hook/useResponsiveWidth';

import TagFacesRoundedIcon from '@mui/icons-material/TagFacesRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ButtonMode from './components/ButtonMode';
import useIntervalText from '@/hook/useIntervalText';

const Home = () => {
  const dispatch = useDispatch<Dispatch<Action.Action>>();
  const state = useSelector((state: Type.IStore) => state);
  const { md, lg, xl } = useResponsiveWidth();

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
    dispatch({ type: 'TEST_HELLO_SAGA', payload: 'Hello World' });
    dispatch({ type: 'TEST_ACTION', payload: 'Hello World' });
  }, []);

  const navLink = [
    { id: 'home', path: '/', name: 'Home', icon: <HomeRoundedIcon /> },
    {
      id: 'blog',
      path: '/page/blog',
      name: 'Blog',
      icon: <ModeCommentRoundedIcon />
    },
    {
      id: 'about',
      path: '/page/about',
      name: 'About',
      icon: <TagFacesRoundedIcon />
    },
    {
      id: 'certificate',
      path: '/page/certificate',
      name: 'Certificate',
      icon: <WorkspacePremiumRoundedIcon />
    }
  ];

  const contactLink = [
    {
      id: 'linkedin',
      path: 'https://www.linkedin.com/in/sirichaigino/',
      name: 'LinkedIn',
      icon: <LinkedInIcon />
    },
    {
      id: 'github',
      path: 'https://github.com/Sirichai44/',
      name: 'GitHub',
      icon: <GitHubIcon />
    }
  ];

  const names = ['Software Developer', '<Front End />'];
  const wordInterval = useIntervalText({ names, time: 200 });

  const [love, setLove] = useState(false);
  return (
    <div className="flex items-center justify-center w-full h-screen min-h-full">
      <div className="w-5/6 h-3/6">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ flexGrow: 1, height: '100%', display: 'flex' }}>
          <Grid xs={4} sm={8} md={12} style={{ display: 'flex flex-col' }}>
            <div className="flex flex-col h-full">
              <div className={`${xl ? 'w-10/12' : ''}`}>
                <div className="mb-3">
                  <span className="text-lg font-bold">Hi, My name is</span>
                </div>

                <div className="flex items-center">
                  <span className="text-2xl font-bold">Sirichai Khuadkaewmanee</span>
                  <IconButton
                    className="rounded-full"
                    style={{ color: '#ffb4b4' }}
                    onClick={() => {
                      setLove(!love);
                    }}>
                    {love ? <FavoriteIcon style={{ color: '#ff6969' }} /> : <FavoriteBorderIcon />}
                  </IconButton>
                </div>

                <div
                  className={`${md ? 'text-5xl my-8' : 'text-xl my-4'} font-bold min-h-10 blinking-cursor`}>
                  <span>{wordInterval}</span>
                </div>

                <div>
                  <span className={`leading-relaxed ${!md && 'text-xs'}`}>
                    I'm a software developer who is passionate about making web applications. I'm
                    currently working as a front-end developer at a company in Bangkok, Thailand. I
                    have a lot of experience in web development and I'm constantly learning new
                    things to keep up with the latest technologies.
                  </span>
                </div>
              </div>

              <div className={`flex flex-wrap items-center mt-14 ${!lg && 'justify-center'}`}>
                {navLink.map((item) => (
                  <NavLink
                    className={({ isActive }) =>
                      classNames(
                        `${lg ? 'px-6' : 'px-3'}  pt-2 pb-1 my-4 mx-6 border-b-4 flex flex-row items-center text-sm text-gray-800 dark:text-gray-400 hover:border-b-4 hover:border-gray-200 dark:hover:border-zinc-800 `,
                        isActive
                          ? 'border-b-4 border-gray-400 drop-shadow-sm'
                          : 'border-transparent'
                      )
                    }
                    key={item.id}
                    to={item.path}
                    id={item.id}
                    unstable_viewTransition>
                    {lg ? <span>{item.name}</span> : <span>{item.icon}</span>}
                  </NavLink>
                ))}

                <ButtonMode />
              </div>
              <div className="flex justify-end h-full">
                <div className="flex items-end w-full">
                  <div className="">
                    {contactLink.map((item) => (
                      <a
                        className="p-2 m-2 border border-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-zinc-800 "
                        key={item.id}
                        href={item.path}
                        style={{ width: 40, height: 40 }}
                        target="_blank"
                        rel="noreferrer">
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                  {/* <span className="text-sm">Born in 1999</span>
                  <span className="text-sm">in Bangkok, Thailand</span> */}
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
