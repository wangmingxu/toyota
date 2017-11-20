const Division = (state = '', action) => {
  switch (action.type) {
  case 'SetDivision':
    return action.data;
  default:
    return state;
  }
};

export default Division;

