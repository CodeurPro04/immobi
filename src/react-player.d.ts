declare module 'react-player' {
  import * as React from 'react';

  export interface ReactPlayerProps {
    url?: string | string[];
    playing?: boolean;
    controls?: boolean;
    muted?: boolean;
    width?: string | number;
    height?: string | number;
    className?: string;
    [key: string]: any;
  }

  export default class ReactPlayer extends React.Component<ReactPlayerProps> {}
}
