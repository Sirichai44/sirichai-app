import { useForm } from 'react-hook-form';
import { Input, Button, Grid } from '@mui/joy';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const form = useForm();

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
            <Input className="my-3 input-focused-highlight" placeholder="Name" />
            <Input className="my-3 input-focused-highlight" placeholder="Username" />

            <Input className="my-3 input-focused-highlight" placeholder="Email" />
            <Input className="my-3 input-focused-highlight" placeholder="Password" />
            <Input className="my-3 input-focused-highlight" placeholder="Confirm Password" />
            <div className="flex items-center justify-between">
              <Button variant="plain" color="neutral">
                <span className="text-lg">Sign Up</span>
              </Button>

              <NavLink to="/auth/login" className="mt-1 text-xs text-blue-300">
                Login
              </NavLink>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
