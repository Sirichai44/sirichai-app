import TagFacesRoundedIcon from '@mui/icons-material/TagFacesRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import ButtonMode from './components/ButtonMode';
import { Suspense, useEffect, useState } from 'react';
import useResponsiveWidth from '@/hook/useResponsiveWidth';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { Button, IconButton, Tooltip } from '@mui/joy';
import { useSelector } from 'react-redux';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { IStateAuth } from '@/store/typings/auth/types';
import { IRootState } from '@/store/typings/root';

// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const Root = () => {
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
  const { md } = useResponsiveWidth();
  const colFromLocal = JSON.parse(localStorage.getItem('nav-collapsed') || 'false');
  const [collapsed, setCollapsed] = useLocalStorage('nav-collapsed', colFromLocal);

  useEffect(() => {
    if (!md) {
      setCollapsed(true);
    } else {
      setCollapsed(colFromLocal);
    }
  }, [md]);

  const state = useSelector((state: IStateAuth) => state);
  const state2 = useSelector((state: IRootState) => state);
  console.log('state', state);
  console.log('state2', state2);

  return (
    <div className="flex w-full h-screen">
      <div
        className={`${collapsed ? 'w-16' : 'w-56'} transition-width duration-300 h-full flex flex-col`}>
        <div className="h-auto">
          <div
            className={`flex ${collapsed && 'flex-col-reverse'} items-center justify-between mx-4 mt-8 mb-4`}>
            <div className="flex">
              {collapsed ? (
                <Tooltip title="Sirichai" placement="right" arrow>
                  <AccountCircleIcon />
                </Tooltip>
              ) : (
                <>
                  <AccountCircleIcon />
                  <span className="ml-1 font-bold ">{state?.profile?.username || ''}</span>
                </>
              )}
            </div>
          </div>
          {navLink.map((item) => (
            <NavLink
              className={({ isActive }) =>
                classNames(
                  `px-2 py-2 ${!collapsed ? 'mx-4' : 'mx-2 justify-center'} rounded-lg border flex flex-row items-center text-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 hover:border-gray-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900`,
                  isActive
                    ? 'bg-white drop-shadow-sm dark:bg-zinc-800 border-gray-200 dark:border-zinc-700'
                    : 'border-transparent'
                )
              }
              key={item.id}
              to={item.path}
              id={item.id}
              unstable_viewTransition>
              {collapsed ? (
                <Tooltip title={item.name} placement="right" size="md" arrow>
                  <span>{item.icon}</span>
                </Tooltip>
              ) : (
                <>
                  <span>{item.icon}</span>
                  <span className="ml-2">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div
          className={classNames(
            'w-full grow h-auto flex flex-col justify-end mb-2',
            collapsed ? 'items-center' : 'items-end'
          )}>
          <ButtonMode />
          <div>
            {!collapsed ? (
              <Button
                variant="plain"
                color="neutral"
                startDecorator={<SettingsRoundedIcon className="w-5 opacity-70" />}>
                <NavLink to="/setting">
                  <span className="font-comfortaa">Setting</span>
                </NavLink>
              </Button>
            ) : (
              <Tooltip title="Setting" placement="right" arrow>
                <NavLink to="/setting">
                  <IconButton>
                    <SettingsRoundedIcon className="w-5 opacity-70" />
                  </IconButton>
                </NavLink>
              </Tooltip>
            )}
          </div>
          <div>
            {!collapsed ? (
              <Button
                variant="plain"
                color="neutral"
                startDecorator={<LoginRoundedIcon className="w-5 opacity-70" />}>
                <NavLink to="/auth/login">
                  <span className="font-comfortaa"> Sing In</span>
                </NavLink>
              </Button>
            ) : (
              <Tooltip title="Login" placement="right" arrow>
                <NavLink to="/auth/login">
                  <IconButton>
                    <LoginRoundedIcon className="w-5 opacity-70" />
                  </IconButton>
                </NavLink>
              </Tooltip>
            )}
          </div>

          <div onClick={() => setCollapsed(!collapsed)}>
            {!collapsed ? (
              <Button
                variant="plain"
                color="neutral"
                startDecorator={<ChevronLeftRoundedIcon className="w-5 opacity-70" />}>
                <span className="font-comfortaa"> Collapse</span>
              </Button>
            ) : (
              <Tooltip title="Expand" placement="right" arrow>
                <IconButton>
                  <ChevronRightRoundedIcon className="w-5 opacity-70" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      <main className="flex flex-col items-center justify-center flex-grow w-full h-auto shrink">
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Root;
