import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import { visualizer } from 'rollup-plugin-visualizer';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import pkg from './package.json';

const bundles = [
	{
		format: 'es',
		bundle: true,
		file: pkg.module,
	},
	{
		format: 'cjs',
		bundle: true,
		file: pkg.main,
	},
	{
		format: 'iife',
		bundle: false,
		file: pkg.unpkg,
	},
];

export function excludedFromBundle(dependency) {
	// Exclude all dependencies inside node_modules from the bundle, except the styles
	return /node_modules/.test(dependency) && !/\.s?css$/.test(dependency);
}

export default bundles.map(({ format, bundle, file }) => ({
	input: 'src/index.ts',
	output: {
		file,
		format,
		name: !bundle ? 'ReactAdvancedCropper' : undefined,
		globals: {
			react: 'React',
		},
		sourcemap: true,
	},
	external: bundle ? excludedFromBundle : ['react'],
	plugins: [
		scss({
			output: 'dist/style.css',
		}),
		postcss({
			plugins: [autoprefixer],
			extract: path.resolve('dist/style.css'),
		}),
		url(),
		resolve(),
		commonjs(),
		typescript({ tsconfig: './tsconfig.json' }),
		!bundle &&
			terser({
				format: {
					comments: false,
				},
				module: format === 'es',
			}),
		visualizer({
			gzipSize: true,
		}),
		!bundle &&
			replace({
				'process.env.NODE_ENV': 'production',
			}),
	],
}));
