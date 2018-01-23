import React from 'react';
import API from '../utils/api';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    API.getCity({ test: 1 });
  }
  render() {
    return (<div>如需查看demo项目，请切换分支到singleDog分支</div>);
  }
}
