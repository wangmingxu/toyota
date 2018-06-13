declare var __isomorphic__: Boolean;
declare var PUBLIC_URL: string;

declare var module: NodeModule;

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