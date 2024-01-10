import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import terser from "@rollup/plugin-terser"

const extensions = ['.js', '.ts']

export default {
	input: 'lib/esm/colorconvertor.js',
	output: [
		{
			file: 'lib/bundles/bundle.esm.js',
			format: 'esm',
			sourcemap: true
		},
		{
			file: 'lib/bundles/bundle.esm.min.js',
			format: 'esm',
			plugins: [terser()],
			sourcemap: true
		},
		{
			file: 'lib/bundles/bundle.umd.min.js',
			format: 'umd',
			name: 'colorconvertor',
			plugins: [terser()],
			sourcemap: true
		}
	],
	plugins: [
		resolve({ extensions }),
		babel({ extensions, babelHelpers: 'bundled', include: ['src/**/*.ts'], exclude: ['node_modules/**']})
	]
}
