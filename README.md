## TOML Loader
![Licensed under MPL 2.0](https://img.shields.io/badge/license-MPL_2.0-green.svg)

Webpack loader for TOML files. Supports the latest TOML spec, and provides named exports.

```
yarn install @servall/toml-loader
```

```javascript
// in your loaders:
module: {
  rules: [
    {
      test: /\.toml$/,
      use: { loader: '@servall/toml-loader' },
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
