export interface GlobalStateType {
  isLogin: boolean;
  errMsg: string[];
}

const initState: GlobalStateType = {
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
