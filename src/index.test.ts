import * as path from 'path';
import * as webpack from 'webpack';

// eslint-disable-next-line
const Memoryfs: new () => webpack.Compiler['outputFileSystem'] = require('memory-fs');

const compiler = async (fixture: string): Promise<webpack.Stats> => {
  const compilation = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.toml$/,
          use: path.resolve(__dirname, 'index.ts'),
        },
      ],
    },
  });

  compilation.outputFileSystem = new Memoryfs();

  return new Promise((resolve, reject) => {
    compilation.run((err, stats) => {
      if (err) reject(err);
      if (stats!.hasErrors()) reject(stats!.toJson().errors);

      resolve(stats!);
    });
  });
};

test('Loads toml file', async () => {
  const stats = await compiler('example.test.toml');
  const output = stats.toJson({ source: true }).modules![0].source;

  expect(output).toMatch('export default {"bat":11,"foo":{"bar":"baz"}}');
  expect(output).toMatch('export const foo = {"bar":"baz"}');
  expect(output).toMatch('export const bat = 11');
});
