import { useForm } from 'react-hook-form';
import { Button, Grid } from '@mui/joy';
import { NavLink } from 'react-router-dom';
import GenInput from './components/Input';
import { useLoginMutation } from '@/store/services/authService';
import { useNotifyPromise, useNotifyResolve } from '@/hook/useNotify';
import { useAppDispatch } from '@/store/store';
import { setProfile, setSessionUser } from '@/store/reducers/authReducer';
import useNavigateTo from '@/hook/useNavigateTo';

const Login = () => {
  const navigateTo = useNavigateTo();
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
  const [login, loginResponse] = useLoginMutation();
  const handleSummit = Form.handleSubmit(async (data) => {
    const isValid = await Form.trigger();
    const id = useNotifyPromise('login...');
    if (isValid) {
      console.log('submit', Form.getValues());
      try {
        const response = await login(data).unwrap();
        console.log('response', response);

        useAppDispatch(
          setProfile({
            username: data.email,
            email: data.email,
            token: response.results.token,
            login: true
          })
        );
        useAppDispatch(setSessionUser(response.results.token));
        useNotifyResolve('success', id, 'login success');

        setTimeout(() => {
          navigateTo('/blog');
        }, 1000);
      } catch (error: any) {
        useNotifyResolve('error', id, error.data);
      }
    } else {
      console.log('error', Form.formState.errors);
    }
  });
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-60">
        <NavLink to="/">
          <div>Go home</div>
        </NavLink>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid xs={4} sm={8} md={12}>
            <form className="flex flex-col justify-center" onSubmit={handleSummit}>
              {loginField.map((item) =>
                GenInput({
                  control: Form.control,
                  trigger: Form.trigger,
                  disabled: loginResponse.isLoading,
                  error: Form.formState.errors[item.nameField]?.message || '',
                  ...item
                })
              )}
              <div className="flex items-center justify-between">
                <Button
                  variant="plain"
                  color="neutral"
                  type="submit"
                  loading={loginResponse.isLoading}>
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
