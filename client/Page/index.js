import React from 'react';
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

  render() {
    return (
      <div styleName="App">
        <header styleName="App-header">
          <img src={require('@/assets/logo.svg')} styleName="App-logo" alt="logo" />
          <h1 styleName="App-title">Welcome to React</h1>
        </header>
        <p styleName="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{this.props.initialData}</p>
      </div>
    );
  }
}

export default withAsyncData()(Index);
