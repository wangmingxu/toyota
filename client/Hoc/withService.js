import ServiceContext from '@/Context/ServiceContext';
import * as React from 'react';

const withService = mapFn => WrappedComponent => {
  class Enhance extends React.Component {
    contextType = ServiceContext;

    render() {
      return <WrappedComponent {...mapFn(this.context)} {...this.props} />;
    }
  }
  require('hoist-non-react-statics')(Enhance, WrappedComponent);
  return Enhance;
};

export default withService;
