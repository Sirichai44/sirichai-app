import * as types from '@/store/typings/auth/types';

export const CALL_REGISTER = 'CALL_REGISTER';
export const SET_PROFILE = 'SET_PROFILE';

export interface CallRegister {
  type: typeof CALL_REGISTER;
  payload: types.IAuthRegister;
}

interface SetProfile {
  type: typeof SET_PROFILE;
  payload: types.IAuthProfile;
}

export type AuthAction = CallRegister | SetProfile;
