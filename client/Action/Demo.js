export function setPosition(position) {
  return {
    type: 'setPosition',
    position,
  };
}

export const fetchPosition = () => async (dispatch, getState) => {
  const { Injector } = getState();
  const { data: position } = await Injector.get('$http').alias.getCity();
  dispatch(setPosition(position));
};
