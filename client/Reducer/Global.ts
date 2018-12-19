import { IGlobalState } from '@/types';

const initState: IGlobalState = {
  isLogin: false,
  errMsg: [],
};

const Global = (state = initState, action) => {
  switch (action.type) {
    case 'toggleAuthStatus':
      return {
        ...state,
        isLogin: action.isLogin,
      };
    case 'errMsg':
      return {
        ...state,
        errMsg: [...state.errMsg, action.msg],
      };
    default:
      return state;
  }
};

export default Global;
