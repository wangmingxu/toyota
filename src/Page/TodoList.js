import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TodoListAction } from '../Action/Index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

@withRouter
@connect(state => ({ TodoList: state.get('TodoList') }), TodoListAction)
class Main extends React.PureComponent {
  static propTypes = {
    TodoList: ImmutablePropTypes.list.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
  render() {
    const { TodoList, handleAdd, handleRemove } = this.props;
    const items = TodoList.toJS().map((item, i) => (
      <div key={i} onClick={() => handleRemove(i)} >
        {item}
      </div>
    ));
    return (
      <div className="App">
        <button onClick={handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Main;
