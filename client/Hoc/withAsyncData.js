import ServiceContext from '@/Context/ServiceContext';
import { ActivityIndicator } from 'antd-mobile';
// import hoistNonReactStatic from 'hoist-non-react-statics';
import * as React from 'react';

const ComponentDataStatus = {
  Pending: -1,
  Resolved: 1,
  Reject: 2,
};

export const LoadDataStrategy = {
  OnlyFirstTime: 1,
  Always: 2,
};

const withAsyncData = ({
  placeholder,
  strategy = LoadDataStrategy.Always,
} = {}) => WrappedComponent => {
  class Enhance extends React.Component {
    static contextType = ServiceContext;

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        data: __ISOMORPHIC__ ? this.props.__initialData__.shift() : null,
      };
    }

    async componentDidMount() {
      const isNeedFetchRepeated =
        WrappedComponent._dataStatus === void 0 || strategy === LoadDataStrategy.Always;
      const isNotSsrOrFirstRender = !__ISOMORPHIC__ || this.state.data === void 0;
      if (
        isNotSsrOrFirstRender &&
        WrappedComponent.getInitialProps !== void 0 &&
        isNeedFetchRepeated
      ) {
        this.setState({ loading: true });
        WrappedComponent._dataStatus = ComponentDataStatus.Pending;
        try {
          const data = await WrappedComponent.getInitialProps({ injector: this.context });
          this.setState({ data });
          WrappedComponent._dataStatus = ComponentDataStatus.Resolved;
        } catch (error) {
          WrappedComponent._dataStatus = ComponentDataStatus.Reject;
          console.log(error);
        } finally {
          this.setState({ loading: false });
        }
      }
    }

    render() {
      const { loading, data } = this.state;
      if (loading) {
        return placeholder || <ActivityIndicator toast={true} text="Loading..." />;
      }
      return <WrappedComponent {...data} {...this.props} />;
    }
  }
  require('hoist-non-react-statics')(Enhance, WrappedComponent);
  return Enhance;
};

export default withAsyncData;
