import { call, put } from 'redux-saga/effects';

import * as Services from '@/services/authService';
import { IApiReturn } from '@/store/typings/root';
import * as types from '@/store/typings/auth/types';
import * as actions from '@/store/typings/auth/actions';
import { useNotify, useNotifyPromise, useNotifyResolve } from '@/hook/useNotify';
import useNavigateTo from '@/hook/useNavigateTo';
import { useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';

export function* CallRegister({ payload }: actions.CallRegister) {
  // const navigateTo = useNavigateTo();
  const idu = useNotifyPromise('Wait for register...');
  try {
    const { data }: { data: IApiReturn<types.IApiReturnToken> } = yield call(
      Services.CallRegister,
      payload
    );
    localStorage.setItem('token', data.results.token);

    useNotifyResolve('success', idu, 'Register success');
    yield put({
      type: actions.SET_PROFILE,
      payload: { username: payload.username, email: payload.email }
    });

    // navigateTo('/blog');
    // setTimeout(() => {
    //   window.location.href = '/blog';
    // }, 1000);
  } catch (error: any) {
    if (error?.response) {
      useNotifyResolve('error', idu, error.response.data);
    }
  }
}
