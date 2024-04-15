import axios from 'axios';
import * as ep from './endpoint';

export const CallRegister = (data: any) => {
  console.log('endpoint', ep.Register);

  return axios({
    url: '/api/v3/auth/register',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
