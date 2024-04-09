import TagFacesRoundedIcon from '@mui/icons-material/TagFacesRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import ButtonMode from './components/ButtonMode';
import { Suspense, useEffect } from 'react';
import useResponsiveWidth from '@/hook/useResponsiveWidth';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { Button, IconButton, Tooltip } from '@mui/joy';

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Root = () => {
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
  const { md } = useResponsiveWidth();
  const [collapsed, setCollapsed] = useLocalStorage('nav-collapsed', false);

  useEffect(() => {
    if (!md) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [md]);
  return (
    <div className="flex w-full h-screen">
      <div
        className={`${collapsed ? 'w-16' : 'w-56'} transition-width duration-300 h-full flex flex-col`}>
        <div className="h-auto">
          <div
            className={`flex ${collapsed && 'flex-col-reverse'} items-center justify-between mx-4 mt-8`}>
            <div className="flex">
              {collapsed ? (
                <Tooltip title="Sirichai" placement="right" arrow>
                  <AccountCircleIcon />
                </Tooltip>
              ) : (
                <>
                  <AccountCircleIcon />
                  <span className="mt-1 ml-1 font-bold">Sirichai</span>
                </>
              )}
            </div>
          </div>
          {navLink.map((item) => (
            <NavLink
              className={({ isActive }) =>
                classNames(
                  `px-2 py-2 my-4 ${!collapsed ? 'mx-4' : 'mx-2 justify-center'} rounded-full border flex flex-row items-center text-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 hover:border-gray-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900`,
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
                <Tooltip title={item.name} placement="right" arrow>
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
          {/* <div
            className={classNames(' py-3 group-hover:flex flex-col justify-center items-center')}
            onClick={() => setCollapsed(!collapsed)}>
            {!collapsed ? (
              <Button
                variant="plain"
                color="neutral"
                startDecorator={<ChevronLeftRoundedIcon className="w-5 opacity-70" />}>
                Collapse
              </Button>
            ) : (
              <Tooltip title="Expand" placement="right" arrow>
                <IconButton>
                  <ChevronRightRoundedIcon className="w-5 opacity-70" />
                </IconButton>
              </Tooltip>
            )}
          </div> */}
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
