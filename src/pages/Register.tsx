import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { Button, Grid } from '@mui/joy';
import { NavLink } from 'react-router-dom';
import { RegisterSchema } from './components/schema/RegisterSchema';
import useFormReact from '@/hook/useFormReact';
import GenInput from './components/Input';
import * as srv from '@/services/authService';
import * as actions from '@/store/typings/auth/actions';
import { useSelector } from 'react-redux';
import { IStateAuth } from '@/store/typings/auth/types';
import { IRootState } from '@/store/typings/root';

const Register = () => {
  const dispatch = useDispatch<Dispatch<actions.AuthAction>>();
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

  const handleSummit = Form.handleSubmit(async (data) => {
    const isValid = await Form.trigger();
    if (isValid) {
      console.log('submit', data);
      dispatch({ type: 'CALL_REGISTER', payload: data });
    } else {
      console.log('error', Form.formState.errors);
    }
  });

  const state = useSelector((state: IStateAuth) => state);
  const state2 = useSelector((state: IRootState) => state);
  console.log('state', state);
  console.log('state2', state2);
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
                <Button variant="plain" color="neutral" type="submit">
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
    </div>
  );
};

export default Register;
