import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { LikeAction } from '../Action/Index';
import { connect } from 'react-redux';

@connect(state => ({ like: state.get('Like') }), LikeAction)
class Main extends React.PureComponent {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    like: ImmutablePropTypes.map.isRequired,
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { handleClick, like } = this.props;
    const Like = like.toJS().like ? 'like' : 'don\'t like';
    return (
      <div className="App">
        <p onClick={handleClick}>
            you {Like} this;
        </p>
      </div>
    );
  }
}

export default Main; // 连接redux
