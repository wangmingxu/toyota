import * as React from 'react';
import * as serialize from 'serialize-javascript';

export default function ServerData({ data }: any) {
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