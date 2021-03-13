import * as toml from '@iarna/toml';

interface Loader {
  cacheable?(): void;
  async(): (error?: Error | null, src?: string) => void;
}

// eslint-disable-next-line
const isKeyword: (k: string) => boolean = require('is-keyword-js');

export default function tomlLoader(this: Loader, source: string) {
  if (this.cacheable) this.cacheable();
  const callback = this.async();

  try {
    const parsed = toml.parse(source.toString());

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

    callback(
      null,
      `
        ${exports}
        export default ${JSON.stringify(parsed)};
      `,
    );
  } catch (err) {
    callback(err);
  }
}
