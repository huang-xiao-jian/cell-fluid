/**
 * @description - postcss options
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const flexbugs = require('postcss-flexbugs-fixes');

module.exports = {
  plugins: [flexbugs(), nested(), autoprefixer()],
};
