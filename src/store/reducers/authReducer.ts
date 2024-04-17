import * as actions from '@/store/typings/auth/actions';
import * as types from '@/store/typings/auth/types';

const initialState: types.IStateAuth = {
  is_loading: false,
  set_user: false,
  profile: {
    username: '',
    email: ''
  }
};

export default (state = initialState, action: actions.AuthAction): types.IStateAuth => {
  switch (action.type) {
    case 'SET_PROFILE':
      console.log('action.payload', action.payload);

      state.set_user = true;
      state.profile = action.payload;
      return state;

    default:
      return state;
  }
};
