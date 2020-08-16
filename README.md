## TOML Loader
[![Licensed under MPL 2.0](https://img.shields.io/badge/license-MPL_2.0-green.svg)](https://www.mozilla.org/en-US/MPL/2.0/)
[![Build Status](https://github.com/launchcodedev/toml-loader/workflows/CI/badge.svg)](https://github.com/launchcodedev/toml-loader/actions)
[![npm](https://img.shields.io/npm/v/@lcdev/toml-loader.svg)](https://www.npmjs.com/package/@lcdev/toml-loader)

Webpack loader for TOML files. Supports the latest TOML spec, and provides named exports.

```
yarn add @lcdev/toml-loader@1

# or for npm

npm i @lcdev/toml-loader@1
```

```javascript
// in your loaders:
module: {
  rules: [
    {
      test: /\.toml$/,
      use: { loader: '@lcdev/toml-loader' },
    },
  ],
},
```

### Usage
Supports default export with all file contents, and named exports.

```typescript
import contents from './my-file.toml';
import { namedExport } from './my-other-file.toml';
```

### Alternatives
- [toml-loader](https://www.npmjs.com/package/toml-loader)
