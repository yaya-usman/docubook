import * as esbuild from 'esbuild-wasm'

export const unpkgPathPlugin = () => {
    return{
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
    build.onResolve({ filter: /.*/ }, async (args: any) => ({
        path: args.path,
        namespace: 'a',
      }))
  
      build.onLoad({ filter: /.*/, namespace: 'a' }, () => ({
        contents: JSON.stringify(process.env),
        loader: 'json',
      }))
    },
  }
  
  // require('esbuild').build({
  //   entryPoints: ['index.js'],
  //   bundle: true,
  //   write: false,
  //   // outfile: 'out.js',
  //   plugins: [unpkgPathPlugin()],
  // }).catch(() => process.exit(1))
}