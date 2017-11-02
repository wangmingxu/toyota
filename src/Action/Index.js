const TodoListAction = (dispatch) => {
  // 定义action
  const Add = { type: 'Add' };
  function Remove(i) {
    return {
      type: 'Remove',
      index: i,
    };
  }

  return {
    handleAdd: () => dispatch(Add),
    handleRemove: i => dispatch(Remove(i)),
  };
};

const LikeAction = (dispatch) => {
  // 定义action
  const change = { type: 'change' };
  return {
    handleClick: () => dispatch(change),
  };
};

function SetTestData(data) {
  return { type: 'SetTestData', data };
}

export function GetTestData() {
  return dispatch => new Promise(((resolve) => {
    setTimeout(() => {
      resolve('TestData');
    }, 1000);
  }))
    .then((data) => {
      dispatch(SetTestData(data));
    });
}

export { TodoListAction, LikeAction };
