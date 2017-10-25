import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LikeAction } from '../Action/Index';
import { connect } from 'react-redux';

@connect(state => ({ like: state.Like }), LikeAction)
class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { handleClick, like } = this.props;
    const Like = like.like ? 'like' : 'don\'t like';
    return (
      <div className="App">
        <p onClick={handleClick}>
            you {Like} this;
        </p>
      </div>
    );
  }
}
// function Main(props) {
//   const { handleClick, like } = props;
//   const Like = like.like ? 'like' : 'don\'t like';
//   return (
//     <div className="App">
//       <p onClick={handleClick}>
//           you {Like} this;
//         </p>
//     </div>
//   );
// }


Main.propTypes = {
  handleClick: PropTypes.func.isRequired,
  like: PropTypes.object.isRequired,
};

export default Main; // 连接redux
