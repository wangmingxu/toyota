import * as React from 'react';
import api from 'utils/api';
import '../styles/test.less';
import { AuthRequestConfig } from 'utils/JWTInterceptor';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    api.getCity<AuthRequestConfig>({test: 1}, {needAuth: false}).then((res) => {
      console.log(res.data);
    });
  }
  render() {
    return (<div styleName='demo'>如需查看demo项目，请切换分支到singleDog分支</div>);
  }
}

export default Index;
