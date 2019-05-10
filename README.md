## TOML Loader
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
