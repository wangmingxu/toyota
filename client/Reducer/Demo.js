const initState = {
  position: '布吉岛',
};

const Demo = (state = initState, action) => {
  switch (action.type) {
    case 'setPosition':
      return {
        position: action.position,
      };
    default:
      return state;
  }
};

export default Demo;
