import { useForm } from 'react-hook-form';
import { Button, Grid } from '@mui/joy';
import { NavLink } from 'react-router-dom';
import GenInput from './components/Input';

const Login = () => {
  const Form = useForm();
  const loginField = [
    {
      nameField: 'email',
      type: 'text',
      defaultValue: ''
    },
    {
      nameField: 'password',
      type: 'password',
      defaultValue: ''
    }
  ];
  const handleSummit = Form.handleSubmit(async (data) => {
    data.preventDefault();
    const isValid = await Form.trigger();
    if (isValid) {
      console.log('submit', Form.getValues());
    } else {
      console.log('error', Form.formState.errors);
    }
  });
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-2/12">
        <NavLink to="/">
          <div>Go home</div>
        </NavLink>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid xs={4} sm={4} md={12}>
            <form className="flex flex-col justify-center" onSubmit={handleSummit}>
              {loginField.map((item) =>
                GenInput({
                  control: Form.control,
                  trigger: Form.trigger,
                  error: Form.formState.errors[item.nameField]?.message || '',
                  ...item
                })
              )}
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
    </div>
  );
};

export default Login;
