import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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
    console.log(this.props);
    const { TodoList, handleAdd, handleRemove } = this.props;
    const items = TodoList.toJS().map((item, i) => (
      <CSSTransition
        key={i}
        classNames="example"
        timeout={{ enter: 2500, exit: 3000 }}
      >
        <div key={i} onClick={() => handleRemove(i)} >
          {item}
        </div>
      </CSSTransition>
    ));
    return (
      <div className="App">
        <button onClick={handleAdd}>Add Item</button>
        <TransitionGroup>
          {items}
        </TransitionGroup>
      </div>
    );
  }
}

export default Main;
