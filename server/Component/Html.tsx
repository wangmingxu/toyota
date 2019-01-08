import * as React from 'react';
import { IAssets } from '../types';
import App, { IProps as IAppProps } from './App';
import ServerData from './ServerData';

interface IProps extends IAppProps {
  initialData: any;
  assets: IAssets;
}

class Html extends React.Component<IProps> {
  public render() {
    const { initialData, assets, ...otherProps } = this.props;
    return (
      <html {...assets.htmlAttributes}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title dangerouslySetInnerHTML={{ __html: assets.title }} />
          {/* {helmet.meta.toComponent()} */}
          {assets.inlineStyle.map((styl, i) => (
            <style dangerouslySetInnerHTML={{ __html: styl }} key={i} />
          ))}
          {assets.css.map((href, i) => (
            <link href={href} rel="stylesheet" key={i}/>
          ))}
          {assets.inlineScript.map((content, i) => (
            <script dangerouslySetInnerHTML={{ __html: content }} key={i} />
          ))}
        </head>
        <body>
          <div id="app">
            <App {...otherProps} initialData={initialData}/>
          </div>
          <ServerData data={initialData} />
          {assets.js.map((src, i) => (
            <script type="text/javascript" src={src} crossOrigin="anonymous" key={i} />
          ))}
        </body>
      </html>
    );
  }
}

export default Html;
