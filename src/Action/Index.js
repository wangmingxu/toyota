import axios from 'axios';

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
  return dispatch => axios.get('/oldSchool/loadNotice')
    .then((rst) => {
      dispatch(SetTestData(rst.data.data[0]));
    });
}

export { TodoListAction, LikeAction };
