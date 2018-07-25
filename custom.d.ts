declare var __isomorphic__: Boolean;
declare var PUBLIC_URL: string;

declare var module: NodeModule;

declare var process: any;

declare var lz: any;

declare var LizhiJSBridge: any;

interface Window{
  lz: any;
  isApp: boolean;
  isWX: boolean;
  isWeiBo: boolean;
  platform: string;
  debug: boolean;
  isPre: boolean;
  shareData: any;
  _hmt: any;
  REDUX_STATE: any;
}
interface NodeModule {
  id: string;
  hot: any
}

interface WebpackRequire {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}
interface NodeRequire extends WebpackRequire {}
declare var require: NodeRequire;

declare var wx: any;
declare var WeixinJSBridge: any;

declare module '*.less' {
  const content:any;
  export default content;
}

declare module '*.png' {
  const content:any;
  export default content;
}