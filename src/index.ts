import { loader } from 'webpack';
import * as toml from '@iarna/toml';

const isKeyword = require('is-keyword-js');

const loader: loader.Loader = function(source) {
  if (this.cacheable) this.cacheable();
  const callback = this.async();

  try {
    const parsed = toml.parse(source.toString('utf8'));

    const exports = Object.entries(parsed).reduce((acc, [key, val]) => {
      // we can only do a named export on names that are valid js variable names
      if (/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.exec(key) && !isKeyword(key)) {
        return `
          ${acc}
          export const ${key} = ${JSON.stringify(val)};
        `;
      }

      return acc;
    }, '');

    callback!(
      null,
      `
      ${exports}
      export default ${JSON.stringify(parsed)};
    `,
    );
  } catch (err) {
    callback!(err);
  }
};

export default loader;
