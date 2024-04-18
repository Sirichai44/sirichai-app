import * as yup from 'yup';

const RegexPassword = {
  Pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@#$&!])(?=\S+$).{8,32}$/,
  Message:
    'The first letter of Password must be uppercase only and it contains A-Z,a-z,0-9, and special character @#$&! Password contain minimum at 8 and maximum at 32 characters',
  MessageMin: 'Password contain minimum at 8 characters',
  MessageMax: 'Password contain maximum at 32 characters'
};

export const RegisterSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(4, 'Username contain minimum at 8 characters'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup
    .string()
    .required('Password is required')
    .matches(RegexPassword.Pattern, RegexPassword.Message),
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .when('password', {
      is: (password: string | undefined) => !!password,
      then: (confirm_password_schema) =>
        confirm_password_schema.oneOf([yup.ref('password')], 'Password not match')
    })
});
