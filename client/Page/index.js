import React from 'react';
import api from 'utils/api';
import { connect } from 'react-redux';
import * as demoAction from 'Action/demo';
import '../styles/demo.less';
import PropTypes from 'prop-types';

@connect(
  state => ({ position: state.demo.position }),
  dispatch => ({ dispatch }),
)
class Index extends React.Component {
  static loadData = async (dispatch) => {
    const { data: position } = await api.getCity({ test: 1 });
    dispatch(demoAction.setPosition(position));
  }
  static propTypes = {
    position: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.constructor.loadData(this.props.dispatch);
  }
  render() {
    const { position } = this.props;
    return (<div styleName="demo">当前所在的城市为:{position}</div>);
  }
}

export default Index;
