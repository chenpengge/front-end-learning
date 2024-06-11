// Optimize for deficiencies mentioned in component library development.

// Slow packaging
// Scheme
// if the target browser is a modern browser that supports es6,esbuild is dozens of times
// more efficient than babel as a bundler and transformer.it can also be used as  minifier,if the component library supports ems,you can use rollup-plugin-esbuild:
// To replace babel for syntex convertion
// Also has the ability to compress code which can be used replace rollup-plugin-terser.
// Also supports TS conversion which can be used instead of rollup-plugin-typescript2 and @rollup/plugin-typescript。

import esbuild, { minify } from 'rollup-plugin-esbuild';
export const esbuildOptions = {
  ...base,
  input: `${ES_DIR}/index.mjs`,
  output: [
    {
      format: 'es',
      dir: ES_DIR,
      entryFileNames: `${PACKAGE_NAME}.esm.js`,
    },
    {
      format: 'cjs',
      dir: CJS_DIR,
      entryFileNames: `${PACKAGE_NAME}.cjs.js`,
      exports: 'named',
    },
    {
      format: 'umd',
      name: GLOBAL_NAME,
      dir: CJS_DIR,
      entryFileNames: `${PACKAGE_NAME}.js`,
      exports: 'named',
      globals: {
        vue: 'Vue',
      },
    },
    {
      format: 'umd',
      name: GLOBAL_NAME,
      dir: CJS_DIR,
      entryFileNames: `${PACKAGE_NAME}.min.js`,
      exports: 'named',
      globals: {
        vue: 'Vue',
      },
      plugins: [minify()],
    },
  ],
  external: ['vue'],
  plugins: [...base.plugins, esbuild()],
};

// Results
// With the above configuration, I output a total of 4 products:
// ● es module
// ● cjs module
// ● umd
// ● umd compression
// The actul test packaging efficiency is about 18.7 seconds for the first start and 1.7 seconds  for the subsequent packaging.


// sence/tool	            babel + rollup	    esbuild + rollup
// first start	           	21.6s				18.7s
// subsequent packaging		4.5s				1.7s
// The first start is slower because rollup generates the cached files on the first build. and subsequent builds will incremetally build faster from the cached files. 
// Esbuild is 1.6x faster than babel in terms of post-build bundling, which is still quite a bit faster, but with fewer components in the current project, this isn't a huge difference,
//  but it will be more noticeable when the project is large enough.

// Components in a component library reference chunk
// Various attempts in component library development, in fact rollup also has an outport.preserveModules configuration which will use the original module name as the
//  filename and create separate chunks for all modules instead of creating as few as possible.
// If component fixed-size-listdynamic-list refers list-item, open preserveModules:

export const esbuildOptions = {
	...base,
	input: {
	  index: 'src/index.ts',
	},
	output: [
	  {
		format: 'es',
		dir: 'dist',
		entryFileNames: `[name].mjs`,
		assetFileNames: '[name][extname]',
		preserveModules: true,
	  },
	],
	external: ['vue'],
	plugins: [
	  ...base.plugins,
	  del({ targets: 'dist/*' }), // 每次 build 之前删除 dist
	  vue(),
	  esbuild(),
	  styles({
		// 遵从 assetFileNames 路径
		mode: 'extract',
		plugins: [
		  // 依据 browserlist 自动加浏览器私有前缀
		  autoprefixer(),
		  postcssPresetEnv(),
		  // // 压缩 css
		  cssnanoPlugin(),
		],
	  }),
	],
  };
  

// ● Extra _virtual directory, some plugins like @vitejs/plugin-vue generate extra "virtual" files to achieve certain results.
// ● The component library introduces function implementation on demand, but the directory structure is not ideal.
// ● Common styles are still packaged in components.
// rollup config and plugins alone can't meet the needs of our component library, we need a custom bundling process.

// Public css cannot be chunk
// In fact, if your project isn't too big, it's probably best to include all of your css.
// rollup-plugin-postcss or some similar css processing plugin can configure extract to export styles to an external file, 
// but when I import common css from multiple components, it packs the common css into each component style separately,
//  and there is no automatic module splitting. Resulting in increased code size.

// Scheme
// The common css will be imported separately in the components that need it, and the component style isolation needs to be taken into account, which can be changed from the css import scheme:
// Scheme One
// Components and styles don't interfere with each other. css isn't written in.vue files. Components don't reference public css files.
// From this idea, we should first give up some solutions In css style isolation, CSS Module, CSS In JS solutions need to reference style files can be excluded, use a private prefix class for
// style isolation, style files packaged separately can meet the requirements. Vant uses this approach.
// Plan 2
// Write a babel plugin or write your own compiler to highly customize the bundling process.
// You can avoid bundling common css with component styles by extracting css imports before processing js and writing them later. Varlet takes this scheme.
// Results
// I chose option two.
// Option 1 is more suitable for HTML In JS like JSX, Vue SFC comes with Scoped style isolation, and option 2 is more suitable. Component library compiler