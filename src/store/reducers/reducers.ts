import { Action } from '../actions/action';
import * as Type from '../typings/type';

const initialState: Type.IStore = {
  test: '',
  word: ''
};

const reducer = (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {
    case 'TEST_ACTION':
      state.test = action.payload;
      return state;

    default:
      return state;
  }
};

export default reducer;
