import * as path from 'path';
import * as webpack from 'webpack';
const memoryfs = require('memory-fs');

const compiler = async (fixture: string): Promise<webpack.Stats> => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.toml$/,
        use: path.resolve(__dirname, 'index.ts'),
      }],
    },
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(stats.toJson().errors);

      resolve(stats);
    });
  });
};

test('Loads toml file', async () => {
  const stats = await compiler('example.test.toml');
  const output = stats.toJson().modules![0].source;

  expect(output).toMatch('export default {"bat":11,"foo":{"bar":"baz"}}');
  expect(output).toMatch('export const foo = {"bar":"baz"}');
  expect(output).toMatch('export const bat = 11');
});
