import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import { visualizer } from 'rollup-plugin-visualizer';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import pkg from './package.json';

const output = [
	{
		file: pkg.module,
		format: `es`,
	},
	{
		file: pkg.main,
		format: `cjs`,
	},
	{
		file: pkg.unpkg,
		format: `iife`,
	},
	{
		file: pkg.browser || pkg.module.replace('bundler', 'browser'),
		format: `es`,
	},
];

export default {
	input: 'src/index.ts',
	output: output.map((config) => ({
		...config,
		name: config.format === 'iife' ? 'ReactAdvancedCropper' : undefined,
		globals: {
			react: 'React',
		},
		sourcemap: true,
	})),
	plugins: [
		external(),
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
		terser({
			format: {
				comments: false,
			},
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		visualizer({
			gzipSize: true,
		}),
	],
};
