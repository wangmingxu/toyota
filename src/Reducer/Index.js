/**
 * 定义所有的Redux 在当前文件 进行导出
 * redux 捕获action 返回新的state
 */
import Immutable from 'immutable';

const TodoList = (state = Immutable.List(['hello', 'world', 'click', 'me']), action) => {
  switch (action.type) {
  case 'Add': // 添加
    return state.push(prompt('Enter some text'));
  case 'Remove': // 删除
    return state.delete(action.index);
  default:
    return state;
  }
};

const Like = (state = Immutable.fromJS({ like: false }), action) => {
  switch (action.type) {
  case 'change': // 修改
    return state.set('like', !state.get('like'));
  default:
    return state;
  }
};


export default { TodoList, Like };
