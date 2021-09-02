const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

(async () => {
  await imagemin(['src/assets/*.{jpg,jpeg,png}'], {
    destination: 'src/assets',
    plugins: [imageminWebp({ metadata: 'all' })],
  });

  console.log('Images optimized');
})();
