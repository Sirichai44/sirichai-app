// import { useForm } from 'react-hook-form';
import { Input, Button, Grid } from '@mui/joy';
import { NavLink } from 'react-router-dom';

const Login = () => {
  // const form = useForm();

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Grid container>
        <Grid>
          <NavLink to="/">
            <div className="cat">
              <div className="ear ear--left"></div>
              <div className="ear ear--right"></div>
              <div className="face">
                <div className="eye eye--left">
                  <div className="eye-pupil"></div>
                </div>
                <div className="eye eye--right">
                  <div className="eye-pupil"></div>
                </div>
                <div className="muzzle"></div>
              </div>
            </div>
          </NavLink>
          <form className="flex flex-col justify-center">
            <Input className="my-3 input-focused-highlight" placeholder="Email" />
            <Input className="my-3 input-focused-highlight" placeholder="Password" />
            <div className="flex items-center justify-between">
              <Button variant="plain" color="neutral">
                <span className="text-lg">Sign In</span>
              </Button>

              <NavLink to="/auth/register" className="mt-1 text-xs text-blue-300">
                register
              </NavLink>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
