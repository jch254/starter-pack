declare module 'reflexbox';
declare module 'react-loading';
declare module 'inline-chunk-manifest-html-webpack-plugin';
declare module 'webpack-chunk-hash';

// TODO: Remove once https://github.com/thejameskyle/react-loadable/pull/36 merged
declare module 'react-loadable' {
  import * as React from "react";

  type GenericComponent<P> = React.SFC<P> | React.ComponentClass<P>;
  type LoadedComponent<P> = GenericComponent<P>;
  type LoadingComponent = GenericComponent<{}>;

  export interface Options<P> {
    loader: () => Promise<LoadedComponent<P>>,
    LoadingComponent: LoadingComponent,
    delay?: number,
    serverSideRequirePath?: string,
    webpackRequireWeakId?: () => number,
    resolveModule?: (obj: object) => LoadedComponent<P>
  }

  export default function Loadable<P>(opts: Options<P>): GenericComponent<P>;

  export function flushServerSideRequirePaths(): string[];
  export function flushWebpackRequireWeakIds(): number[];
}