import * as React from 'react';
import serialize from 'serialize-javascript';

export default function ServerData({ data }) {
  return (
    <script
      id="server-app-state"
      type="application/json"
      dangerouslySetInnerHTML={{
        __html: serialize(data),
      }}
    />
  );
}
