import { useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

// import { toast } from "react-toastify";
import * as Action from '@/store/actions/action';
import { Box, Grid, Step, StepIndicator, Stepper } from '@mui/joy';
// import * as Type from "@/store/typings/type";
import TagFacesRoundedIcon from '@mui/icons-material/TagFacesRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
const index = () => {
  const dispatch = useDispatch<Dispatch<Action.Action>>();
  // const state = useSelector((state: Type.IStore) => state.test);

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
  return (
    <div className="box-border flex items-center justify-center w-full h-screen min-h-full">
      <div className="w-5/6 h-4/6">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ flexGrow: 1, height: '100%' }}>
          <Grid
            xs={2}
            sm={6}
            md={8}
            style={{
              display: 'flex flex-col',
              border: '1px solid red'
            }}>
            <div className="flex flex-col justify-between h-full">
              <div className="w-9/12 border border-green-500">
                <div>
                  <span className="text-lg font-bold">Hi!, I'm Sirichai</span>
                </div>

                <div>
                  <span className="text-4xl font-bold">Software Developer</span>
                </div>

                <div>
                  <span className="text-lg">
                    I'm a software developer who is passionate about making web applications. I'm
                    currently working as a front-end developer at a company in Bangkok, Thailand. I
                    have a lot of experience in web development and I'm constantly learning new
                    things to keep up with the latest technologies.
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end justify-start border border-red-500">
                <span className="text-sm">Born in 1999</span>
                <span className="text-sm">in Bangkok, Thailand</span>
              </div>
            </div>
          </Grid>

          <Grid
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
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default index;
