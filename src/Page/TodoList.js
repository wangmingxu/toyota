import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TodoListAction } from '../Action/Index';
import { connect } from 'react-redux';

@connect(state => ({ TodoList: state.TodoList }), TodoListAction)
class Main extends Component {
  static propTypes = {
    TodoList: PropTypes.object.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { TodoList, handleAdd, handleRemove } = this.props;
    const items = TodoList.items.map((item, i) => (
      <div key={item} onClick={() => handleRemove(i)} >
        {item}
      </div>
    ));
    return (
      <div className="App">
        <button onClick={handleAdd}>Add Item</button>
        {items}
      </div>
    );
  }
}

export default Main;
