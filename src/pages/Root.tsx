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
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useAppDispatch, useAppSelector } from '@/store/store';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded';
import AirRoundedIcon from '@mui/icons-material/AirRounded';
import FilterDramaRoundedIcon from '@mui/icons-material/FilterDramaRounded';
import { clearSessionUser } from '@/store/reducers/authReducer';

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

  const { profile, weather } = useAppSelector((state) => ({
    profile: state.auth.profile,
    weather: state.auth.current_info.weather
  }));

  const handleLogout = () => {
    useAppDispatch(clearSessionUser());
  };
  return (
    <div className="flex w-full h-screen">
      <div
        className={`${collapsed ? 'w-16' : 'w-56'} transition-width duration-300 h-full flex flex-col`}>
        <div className="w-full h-auto">
          <div
            className={`ml-2 max-w-40 items-center mt-4 mb-2 bg-neutral-300 bg-opacity-30 dark:bg-zinc-800 rounded-lg`}>
            <div className="flex items-center">
              <img src={weather.icon} className="h-8" />
              <small className="ml-2 leading-none text-center text-wrap max-w-20">
                {weather.weather}
              </small>
            </div>
            <div className="flex items-start max-h-12">
              <div className="w-full max-h-6">
                <ThermostatRoundedIcon style={{ height: '16px' }} />
                <small>{Math.ceil(weather.temp - 273)} &deg;c</small>
              </div>
              <div className="w-full max-h-6">
                <FilterDramaRoundedIcon style={{ height: '16px' }} />
                <small>{weather.clouds} %</small>
              </div>
            </div>
          </div>

          <div
            className={`flex ${collapsed && 'flex-col-reverse'} max-w-40 items-center justify-center mt-4 mb-2`}>
            {collapsed ? (
              <Tooltip title={profile.username} size="md" placement="right" arrow>
                <AccountCircleIcon />
              </Tooltip>
            ) : (
              <span className="flex items-center justify-start w-full ml-3 font-bold">
                <span>
                  <AccountCircleIcon style={{ marginBottom: '4px' }} />
                  {profile.username}
                </span>
              </span>
            )}
          </div>
          {navLink.map((item) => (
            <NavLink
              className={({ isActive }) =>
                classNames(
                  `px-2 py-2 ${!collapsed ? 'mx-1' : 'mx-2 justify-center'} rounded-lg border flex flex-row items-center text-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 hover:border-gray-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900`,
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
            {profile.login && (
              <>
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
              </>
            )}
          </div>
          <div>
            {!collapsed ? (
              <Button
                variant="plain"
                color="neutral"
                startDecorator={
                  profile.login ? (
                    <LogoutRoundedIcon className="w-5 rotate-180 opacity-70" />
                  ) : (
                    <LoginRoundedIcon className="w-5 opacity-70" />
                  )
                }>
                {profile.login ? (
                  <span className="font-comfortaa" onClick={handleLogout}>
                    Logout
                  </span>
                ) : (
                  <NavLink to="/auth/login">
                    <span className="font-comfortaa"> Sing In</span>
                  </NavLink>
                )}
              </Button>
            ) : (
              <>
                {profile.login ? (
                  <Tooltip title="Logout" placement="right" arrow>
                    <IconButton onClick={handleLogout}>
                      <LogoutRoundedIcon className="w-5 rotate-180 opacity-70" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Login" placement="right" arrow>
                    <NavLink to="/auth/login">
                      <IconButton>
                        <LoginRoundedIcon className="w-5 opacity-70" />
                      </IconButton>
                    </NavLink>
                  </Tooltip>
                )}
              </>
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
