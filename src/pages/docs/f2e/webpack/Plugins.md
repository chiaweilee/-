## Plugins

### BannerPlugin

```js
new webpack.BannerPlugin(banner);
// or
new webpack.BannerPlugin(options);
```

```js
{
  banner: string | function, // the banner as string or function, it will be wrapped in a comment
  raw: boolean, // if true, banner will not be wrapped in a comment
  entryOnly: boolean, // if true, the banner will only be added to the entry chunks
  test: string | RegExp | Array,
  include: string | RegExp | Array,
  exclude: string | RegExp | Array,
}
```

```js
// string
new webpack.BannerPlugin({
  banner: 'hello world'
});

// function
new webpack.BannerPlugin({
  banner: (yourVariable) => { return `yourVariable: ${yourVariable}`; }
});
```

### ContextReplacementPlugin

```js
new webpack.ContextReplacementPlugin(
  /moment[/\\]locale$/,
  /de|fr|hu/
);
```

### DefinePlugin

```js
new webpack.DefinePlugin({
    TWO: '1+1',
    'typeof window': JSON.stringify('object'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
})
```

### EnvironmentPlugin

```js
new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']);
```

equivalent to `DefinePlugin`

```js
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
});
```

_Variables coming from process.env are always `strings`._

### IgnorePlugin

```js
new webpack.IgnorePlugin(requestRegExp, [contextRegExp]);
```

```js
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);
```

_...which means "any require statement matching './locale' from any directories ending with 'moment' will be ignored._

### ProvidePlugin

```js
new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
});
```

```js
new webpack.ProvidePlugin({
  _map: ['lodash', 'map']
});
```
