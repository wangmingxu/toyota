import * as React from 'react';
import API from 'utils/api';
import '../styles/test.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    API.getCity({ test: 1 }).then(({data:rst})=>{
      console.log(rst.data);
    });
  }
  render() {
    return (<div styleName="demo">如需查看demo项目，请切换分支到singleDog分支</div>);
  }
}

export default Index;