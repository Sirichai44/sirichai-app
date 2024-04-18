import { Button, Grid } from '@mui/joy';
import { NavLink } from 'react-router-dom';
import { RegisterSchema } from './components/schema/RegisterSchema';
import useFormReact from '@/hook/useFormReact';
import GenInput from './components/Input';
import { IAuthRegister } from '@/store/typings/auth/types';

import { useRegisterMutation } from '@/store/services/authService';
import { setProfile, setSessionUser } from '@/store/reducers/authReducer';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { useNotifyPromise, useNotifyResolve } from '@/hook/useNotify';
import useNavigateTo from '@/hook/useNavigateTo';
const Register = () => {
  const navagateTo = useNavigateTo();
  const Form = useFormReact(RegisterSchema);

  const rgNameField = [
    {
      nameField: 'username',
      type: 'text',
      defaultValue: ''
    },
    {
      nameField: 'email',
      type: 'email',
      defaultValue: ''
    },
    {
      nameField: 'password',
      type: 'password',
      defaultValue: '',
      triggerField: 'confirm_password'
    },
    {
      nameField: 'confirm_password',
      type: 'password',
      defaultValue: ''
    }
  ];
  const [register, registerResponse] = useRegisterMutation();
  const handleSummit = Form.handleSubmit(async (data: IAuthRegister) => {
    const isValid = await Form.trigger();
    if (isValid) {
      const id = useNotifyPromise('registering...');
      try {
        const response = await register(data).unwrap();

        useAppDispatch(
          setProfile({
            username: data.username,
            email: data.email,
            token: response.results.token,
            login: true
          })
        );
        useAppDispatch(setSessionUser(response.results.token));

        useNotifyResolve('success', id, 'register success');
        setTimeout(() => {
          navagateTo('/blog');
        }, 1000);
      } catch (error: any) {
        useNotifyResolve('error', id, error.data);
      }
    } else {
      console.log('error', Form.formState.errors);
    }
  });

  const state = useAppSelector((state) => state);

  console.log('state', state);

  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className="w-4/12">
        <NavLink to="/blog">
          <div className="flex justify-center">Go home</div>
        </NavLink>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Grid>
            <form className="flex flex-col justify-center" onSubmit={handleSummit}>
              {rgNameField.map((item) =>
                GenInput({
                  control: Form.control,
                  trigger: Form.trigger,
                  error: Form.formState.errors[item.nameField]?.message || '',
                  ...item
                })
              )}
              <div className="flex items-center justify-between">
                <Button
                  variant="plain"
                  color="neutral"
                  type="submit"
                  disabled={registerResponse.isLoading}>
                  <span className="text-lg">
                    {registerResponse.isLoading ? 'Registering ...' : 'Sign Up'}
                  </span>
                </Button>

                <NavLink to="/auth/login" className="mt-1 text-xs text-blue-300">
                  Login
                </NavLink>
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Register;
