import * as cheerio from 'cheerio';
import * as fs from 'fs';
import { memoize } from 'lodash';
import * as path from 'path';
import { common } from '../../config/build.config';

export const loadHtml = () => {
  const { NODE_ENV } = process.env;
  const file =
    NODE_ENV === 'development'
      ? path.join(common.viewPath, 'dev/index.html')
      : path.join(__dirname, '../../views/prod/index.html');
  const content = fs.readFileSync(file);
  return content.toString();
};

export const genHtmlAssets = memoize(() => {
  const htmlContent = loadHtml();
  const $ = cheerio.load(htmlContent);
  return {
    htmlAttributes: $('html').get()[0].attribs,
    title: $('title').text(),
    inlineStyle: $('style')
      .map((index, ele) => $(ele).html())
      .get(),
    css: $('link[rel="stylesheet"]')
      .map((index, ele) => $(ele).attr('href'))
      .get(),
    inlineScript: $('script:not([src])')
      .map((index, ele) => $(ele).html())
      .get(),
    js: $('script[src]')
      .map((index, ele) => $(ele).attr('src'))
      .get(),
  };
});
