import 'babel-polyfill';
import 'normalize.css';
const fundebug = require('fundebug-javascript');

fundebug.apikey = '294a8593da2207207c592dcd7364e84e913b366ca32bd592002dfc068c568f58';
fundebug.releasestage = process.env.NODE_ENV;
console.log(process.env.NODE_ENV);

const FastClick = require('fastclick');

FastClick.attach(document.body);
