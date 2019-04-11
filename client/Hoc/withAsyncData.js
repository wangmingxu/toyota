import ServiceContext from '@/Context/ServiceContext';
import { ActivityIndicator } from 'antd-mobile';
// import hoistNonReactStatic from 'hoist-non-react-statics';
import * as React from 'react';

const withAsyncData = ({
  placeholder,
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
      if (
        WrappedComponent.getInitialProps !== void 0 &&
        !__ISOMORPHIC__ || this.state.data === void 0
      ) {
        this.setState({ loading: true });
        try {
          const data = await WrappedComponent.getInitialProps({ injector: this.context });
          this.setState({ data });
        } catch (error) {
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
