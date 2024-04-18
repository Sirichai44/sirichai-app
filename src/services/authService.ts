import axios from 'axios';
import * as ep from './endpoint';

export const CallRegister = (data: any) => {
  return axios.post(ep.Register, data);
};
