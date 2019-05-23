## TOML Loader
Webpack loader for TOML files. Supports latest TOML spec, and provides named exports.

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
