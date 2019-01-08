import React from 'react';
import AsyncRender from '@/Component/AsyncRender';
import ServiceContext from '@/Context/ServiceContext';
import withAsyncData from '@/Hoc/withAsyncData';
import '../styles/demo.less';

class Index extends React.Component {
  static contextType = ServiceContext;

  static async getInitialProps({ injector }) {
    const data = await new Promise(resolve => {
      setTimeout(() => {
        resolve('Hello World');
      }, 1000);
    });
    return { initialData: data };
  }
  
  authServ = this.context.get('authServ');

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={require('@/assets/logo.svg')} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{this.props.initialData}</p>
        <AsyncRender observable={this.authServ.getAuthStatus()}>
          {isLogin => <p>{isLogin ? '已登陆' : '未登录'}</p>}
        </AsyncRender>
      </div>
    );
  }
}

export default withAsyncData()(Index);
