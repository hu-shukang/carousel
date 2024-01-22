declare module 'csstype' {
  interface Properties {
    // Allow any CSS Custom Properties
    [index: `--${string}`]: any;

    // ...or allow any other property
    [index: string]: any;
  }
}
