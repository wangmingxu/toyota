import * as React from 'react';
import API from '../utils/api';
import * as CSSModule from 'react-css-modules';
// import styles from '../styles/test.less';
const styles:any = require('../styles/test.less');

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    API.getCity({ test: 1 });
  }
  render() {
    return (<div className={styles.demo}>如需查看demo项目，请切换分支到singleDog分支</div>);
  }
}

export default Index;
