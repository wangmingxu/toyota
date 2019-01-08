import * as React from 'react';
import { renderRoutes } from 'react-router-config';

class Root extends React.PureComponent {
  render() {
    const { route, __initialData__ } = this.props;
    return (
      <div>
        <h1>Root</h1>
        {/* child routes won't render without this */}
        {renderRoutes(route.routes, { __initialData__ })}
      </div>
    );
  }
}

export default Root;
