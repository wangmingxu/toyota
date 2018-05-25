import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ActivityIndicator } from 'antd-mobile';

interface BundlePropType{
  load: (args:any)=>void;
  children: (args:React.ComponentType)=>JSX.Element;
}

interface BundleStateType{
  mod: React.ComponentType;
}

class Bundle extends React.Component<BundlePropType,BundleStateType> {
  static propTypes = {
    load: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      // short for "module" but that's a keyword in js, so "mod"
      mod: null,
    };
  }
  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(di:BundlePropType) {
    this.setState({
      mod: null,
    });
    // 加载完bundle-loader之后cb
    di.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod,
      });
    });
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : (<ActivityIndicator toast text="Loading..." />);
  }
}

// components load their module for initial visit
// 这里只是给this.props.child传一个方法，最后在Bundle的render里面调用
// 如果传入的就是组件的话就直接返回,兼容服务端渲染
export const createComponent = Component =>
  ((Component.displayName || Component.name)
    ? Component
    : props => (
      <Bundle load={Component}>
        {LoadedComponent => <LoadedComponent {...props} />}
      </Bundle>
    ));

export default Bundle;
