import { useForm } from 'react-hook-form';
import { Input, Button } from '@mui/joy';

import AndroidRoundedIcon from '@mui/icons-material/AndroidRounded';

const Login = () => {
  const form = useForm();
  return (
    <div>
      {/* <AndroidRoundedIcon style={{ fontSize: 50 }} /> */}
      <form className="flex flex-col justify-center">
        <Input
          className="my-3"
          sx={{
            '--Input-focusedHighlight': '#a1a1aa !important'
          }}
          placeholder="Email"
        />
        <Input
          className="my-3"
          sx={{
            '--Input-focusedHighlight': '#a1a1aa !important'
          }}
          placeholder="Password"
        />
        <Input
          className="my-3"
          sx={{
            '--Input-focusedHighlight': '#a1a1aa !important'
          }}
          placeholder="Confirm Password"
        />
        <Button variant="plain" color="neutral">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Login;
