// Add ES6 import/export support to require
require = require('@std/esm')(module, { cjs: true, esm: 'js' })
require('./src/app')