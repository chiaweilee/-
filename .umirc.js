// ref: https://umijs.org/config/
export default {
  base: '/home/',
  publicPath: '/home/',
  cssPublicPath: '/home/',
  runtimePublicPath: true,
  outputPath: 'home',
  hash: true,
  history: 'hash',
  theme: './src/theme.js',
  treeShaking: true,
  ignoreMomentLocale: true,
  alias: require('./webpack.config').resolve.alias,
  plugins: [
    'umi-plugin-mdx',
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        pwa: {
          manifestOptions: {
            srcPath: 'src/manifest.json',
          },
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
            swSrc: 'src/sw.js',
            swDest: 'sw.js',
          },
        },
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'app',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  copy: [
    {
      from: 'src/assets',
      to: 'assets',
    },
  ],
};
