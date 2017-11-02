import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Pagination, Cascader } from 'antd';
import { connect } from 'react-redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { GetTestData } from '../../Action/Index';

/* eslint-disable */
import style from '../../styles/App.less';

import logo from 'assets/yay.jpg';
/* eslint-disable */


const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

function onChange(value) {
  console.log(value);
}

@withCookies
@connect(state => ({ test: state.get('TestData') }), (dispatch)=>({
  dispatch
}))
class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  static loadData(dispatch){
    return dispatch(GetTestData());
  }
  componentWillMount(){
    const { cookies } = this.props;
    console.log(cookies.get('JSESSIONID'));
    console.log("componentWillMount");
  }
  componentDidMount(){
    this.constructor.loadData(this.props.dispatch);
    console.log("componentDidMount");
  }
  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps");
  }
  componentWillUpdate(){
    console.log("componentWillUpdate");
  }
  componentDidUpdate(){
    console.log("componentDidUpdate");
  }
  componentWillUnmount(){
    console.log("componentWillUnmount");
  }
  render(){
    console.log('render');
    const name = 'youcai';
    return (
      <div styleName="App">
        <h1>this is a title</h1>
        <p>{this.props.test}</p>
        <Button>button</Button>
        <br />
        <Cascader options={options}   onChange={onChange} placeholder="Please select" />
        <br />
        <img src={logo} width="200" className="App-logo" alt="logo" />
        <br />
        <br />
        <ul>
          <li><Link to="/">index</Link></li>
          <li><Link to="/list">TodoList</Link></li>
          <li><Link to="/like">like</Link></li>
          <li><Link to="/from">from</Link></li>
          <li><Link to="/comment">comment</Link></li>
          <li><Link to="/intl">intl</Link></li>
        </ul>
        <br />
        <Pagination defaultCurrent={1}  total={50} showSizeChanger />
        <br />
        <br />

    </div>
    );
  }
}

export default App;
