import { useForm } from 'react-hook-form';
import { Input, Button } from '@mui/joy';

const Login = () => {
  const form = useForm();
  return (
    <div>
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

      <form className="flex flex-col justify-center">
        <Input className="my-3 input-focused-highlight" placeholder="Email" />
        <Input className="my-3 input-focused-highlight" placeholder="Password" />
        <Input className="my-3 input-focused-highlight" placeholder="Confirm Password" />
        <Button variant="plain" color="neutral">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Login;
