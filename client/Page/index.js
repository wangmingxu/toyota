import React from 'react';
import { connect } from 'react-redux';
import { fetchPosition } from '@/Action/Demo';
import '../styles/demo.less';
import PropTypes from 'prop-types';

class Index extends React.Component {
  static getInitialProps = async dispatch => {
    await dispatch(fetchPosition());
  };
  static propTypes = {
    position: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.constructor.getInitialProps(this.props.dispatch);
  }
  render() {
    const { position } = this.props;
    return (
      <div styleName="demo">
        当前所在的城市为:
        {position}
      </div>
    );
  }
}

export default connect(state => ({ position: state.Demo.position }))(Index);
