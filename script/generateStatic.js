/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');

const yaml = require('yaml');

const settings = require('../src/siteSettings');

const buildDir = path.resolve(__dirname, '../dist');
const docsDir = path.resolve(__dirname, '../docs');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function docsToJson() {
  const dirs = fs.readdirSync(docsDir);
  const jsonfeed = {};
  dirs.map(dir => {
    files = fs.readdirSync(path.join(docsDir, dir));
    let index = 1337;
    jsonfeed[dir] = [];
    jsonfeed[dir] = files.map(file => {
      const text = fs.readFileSync(path.join(docsDir, dir, file), 'utf-8');
      const settings = yaml.parse(text.split('---\n')[1]);
      index++;
      return {
        title: settings.title || file.replace('_', ' ').split('.')[0],
        id: file.split('.')[0],
        url: `./#${dir}/${file.split('.')[0]}`,
        content_html: text,
        index: settings.index || index,
      };
    });
  });
  fs.writeFileSync(`${buildDir}/jsonfeed.json`, JSON.stringify(jsonfeed));
}

gulp.task('generate', done => {
  docsToJson();
  const HTML = `
  <!DOCTYPE html>
  <html lang="en">
  <html>
  <head>
    <meta charset="UTF-8">
    <title>${settings.siteName}</title>
    <meta name="description" content="${settings.siteDescription}">
    <link rel="shortcut icon" href="./favicon.ico"/>
    <script type="module" src="./Main.js"></script>
    <script type="module" src="./script.js"></script>
    <link rel="stylesheet" href="./styles.css">
    <link rel="stylesheet" href="./theme.css">
  </head>
  <body>
    <docs-main></docs-main>
  </body>
  </html>
  `;
  const CSS = `
  docs-main {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
  `;
  fs.writeFileSync(`${buildDir}/index.html`, HTML);
  fs.writeFileSync(`${buildDir}/styles.css`, CSS);
  done();
});
